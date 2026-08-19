import '../App.css';

const Header = () => (
    <header className="header">
      <div className="header-inner">
        <div className="header-copy">
          <p className="eyebrow">Software Engineer</p>
          <h1>Hi, I&rsquo;m Michelle Zhuang.</h1>
          <p className="header-lede">
            A recent Swarthmore College graduate in Engineering and Computer Science,
            building software at the intersection of infrastructure and craft.
          </p>
          <div className="header-actions">
            <a href="/projects" className="outlined-action">View my work →</a>
          </div>
          <div className="social-links">
            <a href="https://github.com/michelle-zhuang1" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/michelle-zhuang" aria-label="LinkedIn"><i className="fa fa-linkedin"></i></a>
            <a href="mailto:mzhuang5@gmail.com" aria-label="Email"><i className="far fa-envelope"></i></a>
            <a
              href="https://miczhuan-website.s3.us-east-2.amazonaws.com/MZhuangResume_FT.pdf"
              className="arrow-link resume-link"
            >
              Resume
            </a>
          </div>
        </div>
        <div className="header-image">
          <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/me.jpeg" alt="Michelle Zhuang" />
        </div>
      </div>
    </header>
  );

export default Header;
