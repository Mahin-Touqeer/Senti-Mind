function Part({ icon, heading, content, color = "#141A4B", children, index }) {
  return (
    <div
      className={`inline-block w-[300px] sm:w-[240px] min-h-[150px] bg-[${color}] p-4 rounded-xl mb-8 shadow`}
      data-aos="fade-up"
      data-aos-delay={index * 50}
      data-aos-duration="1000"
    >
      {icon}
      {children} <h1 className="mt-2">{heading}</h1>
      <p className="text-xs text-gray-300">{content}</p>
    </div>
  );
}

export default Part;
