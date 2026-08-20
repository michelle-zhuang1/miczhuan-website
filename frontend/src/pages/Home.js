import './Home.css';
import Header from '../components/Header';

function Home() {
    return (
        <div className="home-page">
            <Header />
            <section className="home-intro">
                <div className="home-intro-inner">
                    <div className="section-label">
                        <span>Who I am</span>
                        <a href="/contact" className="arrow-link">Get in touch →</a>
                    </div>
                    <div className="home-intro-body">
                        <p>
                            I&rsquo;ve worked as a Software Engineer at Cisco and interned at Oracle, where I built data
                            pipelines, automated workflows, and collaborated with cross-functional teams to drive
                            efficiency. I&rsquo;m currently a Master&rsquo;s student in AI/ML for Engineering at the University of Washington, 
                            and I've been channeling that focus into backend and AI-agentic engineering,
                            building a full-stack fitness and nutrition tracker powered by LLM agent framework.
                        </p>   
                        <p>
                            I have a strong technical foundation and a passion for creative problem-solving,
                            and I pride myself on being a strong communicator and adaptable team player, navigating
                            complex projects with resilience and an open-minded approach.
                        </p>
                        <p>
                            I&rsquo;m currently looking for backend and AI-focused software engineering roles where I can grow,
                            contribute to impactful projects, and continue learning cutting-edge technologies. Welcome to
                            my personal website, where I&rsquo;m proud to showcase my work, passions, and projects!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Home;
