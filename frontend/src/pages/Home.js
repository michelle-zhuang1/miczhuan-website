import './Home.css';
import Header from '../components/Header';

function Home() {
    return (
        <div className="Ugh"> 
            <Header />
            <div className="home">
                <img src = "https://miczhuan-website.s3.us-east-2.amazonaws.com/me.jpeg" />
                <h1>Who am I?</h1>
                <p>Hi, I’m Michelle Zhuang, a recent graduate with a double major in Engineering and Computer Science from Swarthmore College. I’ve worked as a Software Engineer at Cisco and interned at Oracle, where I built data pipelines, automated workflows, and collaborated with cross-functional teams to drive efficiency. I have a strong technical foundation and a passion for creative problem-solving. I pride myself on being a strong communicator and adaptable team player, navigating complex projects with resilience and an open-minded approach. I’m currently looking for [junior] software engineering roles where I can grow, contribute to impactful projects, and continue learning cutting-edge technologies.</p>
                <p>Welcome to my personal website, where I'm proud to showcase my work, passions, and projects!</p>
                <a href="https://miczhuan-website.s3.us-east-2.amazonaws.com/MZhuangResume1.pdf" class="resume">Here's my Resume!</a>
            </div>
        </div>
    )
};

export default Home;
