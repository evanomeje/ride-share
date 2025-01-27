const Bio = () => (
  <div className="bio">
    <div className="bio-left">
      <img
        width="85px"
        height="80px"
        className="ml-4 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 border-2 border-slate-200 hover:scale-105 hover:border-blue-500 transition-transform duration-300 ease-in-out"
        src={require('../assets/images/bio.jpg')}
        alt="profile"
      />
    </div>
    <div className="bio-right">
      <div className="text-center">
        <p className="font-semibold text-slate-800">Evan Omeje</p>
        <div className="text-zinc-600 mt-1">
          <a
            href="https://github.com/evanomeje"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github hover:text-zinc-700" />
          </a>
          <a
            href="https://www.linkedin.com/in/evan-omeje-7a2880231/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin ml-2 hover:text-zinc-700" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Bio;