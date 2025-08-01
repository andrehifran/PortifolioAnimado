const SocialLinks = () => {
  return (
    <div className="flex gap-4 mt-8 justify-center">
      <a
        href="https://github.com/andrehifran"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/andrehifran"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition"
      >
        LinkedIn
      </a>
      <a
        href="mailto:andrehifran@gmail.com"
        className="text-white border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition"
      >
        Email
      </a>
    </div>
  );
};

export default SocialLinks;
