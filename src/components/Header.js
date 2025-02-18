import '../App.css';

const Header = () => (
    <header className="header">
      <h1>Hello!</h1>
      <p>Hi, I’m Michelle Zhuang, a recent graduate with a double major in Engineering and Computer Science from Swarthmore College. I’ve worked as a Software Engineer at Cisco and interned at Oracle, where I built data pipelines, automated workflows, and collaborated with cross-functional teams to drive efficiency. </p>
      <div className="social-links">
        <p id="line">--------------------------------------</p>
        <p>
          Find me on: 
          <a href="https://github.com/michelle-zhuang1"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/michelle-zhuang"><i class="fa fa-linkedin in"></i></a>
          <a href="mailto: mzhuang5@gmail.com"><i class="far fa-envelope"></i></a>
        </p>
      </div>
    </header>
  );

export default Header;