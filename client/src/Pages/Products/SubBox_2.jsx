function Part({ icon, heading, content, color = "#141A4B", index }) {
  return (
    <div
      className={`inline-block w-[330px] min-h-[150px] bg-[${color}] p-4 rounded-xl mb-8 shadow`}
      // style={{ boxShadow: "0px 3px 8px #8F37FF" }}
      data-aos-delay={index * 50}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {icon} <h1 className="mt-2">{heading}</h1>
      <p className="text-xs text-gray-300">{content}</p>
    </div>
  );
}

export default Part;
