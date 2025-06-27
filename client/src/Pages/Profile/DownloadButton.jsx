import React, { useState } from "react";
import { FiDownload, FiLoader, FiFileText, FiFile } from "react-icons/fi";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Link,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#3498db",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  meta: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 5,
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "justify",
  },
  heading1: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#2c3e50",
  },
  heading2: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#2c3e50",
  },
  heading3: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    color: "#2c3e50",
  },
  listItem: {
    fontSize: 11,
    marginBottom: 4,
    marginLeft: 15,
  },
  blockquote: {
    fontSize: 11,
    fontStyle: "italic",
    marginLeft: 20,
    marginBottom: 12,
    color: "#555555",
    borderLeftWidth: 3,
    borderLeftColor: "#3498db",
    paddingLeft: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  code: {
    fontFamily: "Courier",
    fontSize: 10,
    backgroundColor: "#f4f4f4",
    padding: 2,
  },
});

// Function to parse markdown and create PDF components
const parseMarkdownToPDFComponents = (markdown) => {
  const lines = markdown.split("\n");
  const components = [];
  let currentParagraph = "";
  let listItems = [];
  let inList = false;

  const flushParagraph = () => {
    if (currentParagraph.trim()) {
      components.push(
        <Text key={components.length} style={styles.paragraph}>
          {parseInlineMarkdown(currentParagraph.trim())}
        </Text>
      );
      currentParagraph = "";
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      listItems.forEach((item, index) => {
        components.push(
          <Text key={`${components.length}-${index}`} style={styles.listItem}>
            • {parseInlineMarkdown(item)}
          </Text>
        );
      });
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      if (inList) {
        flushList();
      } else {
        flushParagraph();
      }
      return;
    }

    // Headers
    if (trimmedLine.startsWith("### ")) {
      flushParagraph();
      flushList();
      components.push(
        <Text key={components.length} style={styles.heading3}>
          {trimmedLine.replace("### ", "")}
        </Text>
      );
    } else if (trimmedLine.startsWith("## ")) {
      flushParagraph();
      flushList();
      components.push(
        <Text key={components.length} style={styles.heading2}>
          {trimmedLine.replace("## ", "")}
        </Text>
      );
    } else if (trimmedLine.startsWith("# ")) {
      flushParagraph();
      flushList();
      components.push(
        <Text key={components.length} style={styles.heading1}>
          {trimmedLine.replace("# ", "")}
        </Text>
      );
    }
    // Blockquotes
    else if (trimmedLine.startsWith("> ")) {
      flushParagraph();
      flushList();
      components.push(
        <Text key={components.length} style={styles.blockquote}>
          {parseInlineMarkdown(trimmedLine.replace("> ", ""))}
        </Text>
      );
    }
    // List items
    else if (trimmedLine.startsWith("* ") || trimmedLine.startsWith("- ")) {
      flushParagraph();
      inList = true;
      listItems.push(trimmedLine.replace(/^[*-] /, ""));
    }
    // Regular paragraphs
    else {
      if (inList) {
        flushList();
      }
      currentParagraph += (currentParagraph ? " " : "") + trimmedLine;
    }
  });

  // Flush remaining content
  flushParagraph();
  flushList();

  return components;
};

// Function to parse inline markdown (bold, italic, etc.)
const parseInlineMarkdown = (text) => {
  // This is a simplified version - for complex formatting, you'd need a more sophisticated parser
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers for now
    .replace(/\*(.*?)\*/g, "$1") // Remove italic markers for now
    .replace(/`(.*?)`/g, "$1"); // Remove code markers for now
};

// PDF Document Component
const ArticlePDF = ({ article }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{article.search.query}</Text>
        <Text style={styles.meta}>
          Platform:{" "}
          {article.search.platform.charAt(0).toUpperCase() +
            article.search.platform.slice(1)}
        </Text>
        <Text style={styles.meta}>
          Created: {new Date(article.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.content}>
        {parseMarkdownToPDFComponents(article.content)}
      </View>
    </Page>
  </Document>
);

const DownloadButton = ({ article }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Enhanced markdown to HTML converter for Word export
  const markdownToHtml = (markdown) => {
    return markdown
      .replace(
        /^### (.*$)/gim,
        '<h3 style="font-size: 16px; font-weight: bold; margin: 16px 0 8px 0; color: #2c3e50;">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 style="font-size: 18px; font-weight: bold; margin: 20px 0 10px 0; color: #2c3e50;">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 style="font-size: 22px; font-weight: bold; margin: 24px 0 12px 0; color: #2c3e50;">$1</h1>'
      )
      .replace(
        /^\> (.*$)/gim,
        '<blockquote style="border-left: 4px solid #3498db; padding-left: 16px; margin: 16px 0; background: #f8f9fa; font-style: italic;">$1</blockquote>'
      )
      .replace(
        /\*\*(.*?)\*\*/gim,
        '<strong style="font-weight: bold;">$1</strong>'
      )
      .replace(/\*(.*?)\*/gim, '<em style="font-style: italic;">$1</em>')
      .replace(
        /`(.*?)`/gim,
        '<code style="background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>'
      )
      .replace(
        /\[([^\]]*)\]\(([^\)]*)\)/gim,
        '<a href="$2" style="color: #3498db; text-decoration: underline;">$1</a>'
      )
      .replace(
        /!\[([^\]]*)\]\(([^\)]*)\)/gim,
        '<img alt="$1" src="$2" style="max-width: 100%; height: auto; margin: 12px 0;" />'
      )
      .replace(/^\* (.*$)/gim, '<li style="margin: 4px 0;">$1</li>')
      .replace(/^\- (.*$)/gim, '<li style="margin: 4px 0;">$1</li>')
      .replace(/\n\n/gim, '</p><p style="margin: 12px 0; line-height: 1.6;">')
      .replace(/\n/gim, "<br />");
  };

  const downloadAsPDF = async () => {
    setIsDownloading(true);
    try {
      const blob = await pdf(<ArticlePDF article={article} />).toBlob();
      const fileName = `${article.search.query.replace(
        /[^a-z0-9]/gi,
        "_"
      )}_${Date.now()}.pdf`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsDownloading(false);
      setShowOptions(false);
    }
  };

  const downloadAsWord = async () => {
    setIsDownloading(true);
    try {
      const htmlContent = markdownToHtml(article.content);

      const wordContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${article.search.query}</title>
            <style>
              body { 
                font-family: 'Times New Roman', serif; 
                line-height: 1.6; 
                margin: 40px;
                color: #333;
                font-size: 12pt;
              }
              h1, h2, h3 { color: #2c3e50; page-break-after: avoid; }
              blockquote { 
                border-left: 4px solid #3498db; 
                padding-left: 20px; 
                margin: 20px 0;
                background: #f8f9fa;
                page-break-inside: avoid;
              }
              .header {
                border-bottom: 2px solid #3498db;
                padding-bottom: 20px;
                margin-bottom: 30px;
                page-break-after: avoid;
              }
              .meta {
                color: #7f8c8d;
                font-size: 10pt;
                margin-bottom: 10px;
              }
              ul, ol { margin: 12px 0; padding-left: 24px; }
              li { margin: 4px 0; }
              p { margin: 12px 0; text-align: justify; }
              code { 
                background: #f4f4f4; 
                padding: 2px 4px; 
                border-radius: 3px; 
                font-family: 'Courier New', monospace; 
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${article.search.query}</h1>
              <div class="meta">Platform: ${
                article.search.platform.charAt(0).toUpperCase() +
                article.search.platform.slice(1)
              }</div>
              <div class="meta">Created: ${new Date(
                article.createdAt
              ).toLocaleDateString()}</div>
            </div>
            <div class="content">
              <p style="margin: 12px 0; line-height: 1.6;">${htmlContent}</p>
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([wordContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const fileName = `${article.search.query.replace(
        /[^a-z0-9]/gi,
        "_"
      )}_${Date.now()}.doc`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Error generating Word document. Please try again.");
    } finally {
      setIsDownloading(false);
      setShowOptions(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isDownloading}
        className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-stone-200 relative cursor-pointer"
        aria-label="Download options"
      >
        {isDownloading ? (
          <FiLoader className="w-5 h-5 animate-spin" />
        ) : (
          <FiDownload className="w-5 h-5" />
        )}
      </button>

      {/* Download Options Dropdown */}
      {showOptions && !isDownloading && (
        <div className="absolute right-0 top-full mt-2 bg-gray-800/95 backdrop-blur-lg rounded-lg border border-white/10 shadow-lg z-[100] min-w-[202px]">
          <div className="p-2">
            <button
              onClick={downloadAsPDF}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-300 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <FiFileText className="w-4 h-4 text-red-400" />
              Download as PDF
            </button>
            <button
              onClick={downloadAsWord}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-300 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <FiFile className="w-4 h-4 text-blue-400" />
              Download as Word
            </button>
          </div>
        </div>
      )}

      {/* Mobile-friendly backdrop */}
      {showOptions && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};

export default DownloadButton;
