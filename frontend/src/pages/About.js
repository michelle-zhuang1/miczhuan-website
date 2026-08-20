import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-intro">
                <div className="about-intro-inner">
                    <div className="section-label">
                        <span>About</span>
                        <a href="/projects" className="arrow-link">See my projects →</a>
                    </div>
                    <h1>A little more about me</h1>
                </div>
            </section>
            <section className="about-body">
                <div className="about-body-inner">
                    <div className="about-paragraphs">
                        <p>
                            Hi! I&rsquo;m Michelle Zhuang. I&rsquo;m a former software engineer at Cisco on the
                            Capital IT team, supporting the financial payment solutions for leasing and loans of
                            Cisco hardware and software products. Utilizing Agile methods, I collaborate cross
                            functionally with Finance, Operations, and Accounting teams to deliver key business
                            requirements. Built and deployed automated workflows using UiPath to improve test
                            automation and efficiency by 10%. Developed and implemented PL/SQL packages to fetch
                            contract details for data ingestion and integration with InfoLease.
                        </p>
                        <p>
                            I graduated from Swarthmore College with a double major in Computer Science and Computer
                            Engineering. At Swarthmore, I previously served as the President of Women in Computer
                            Science club (WiCS) on campus, building a community to empower other women with a
                            passion for technology. My passion for community building doesn&rsquo;t stop there
                            &mdash; I was also a Resident Assistant, managing administrative duties, such as
                            budgeting, and fostering a community among a cohort of ethnically diverse undergraduate
                            students.
                        </p>
                        <p>
                            I&rsquo;m currently a Master&rsquo;s student in AI/ML for Engineering at the University of Washington, 
                            channeling that same drive for learning into a focused transition toward backend and AI-agentic engineering. 
                        </p>
                        <p>
                            I have a strong technical foundation and a passion for creative problem-solving. I pride
                            myself on being a strong communicator and adaptable team player, navigating complex
                            projects with resilience and an open-minded approach. I&rsquo;m currently looking for
                            backend and AI-focused software engineering roles where I can grow, contribute to impactful projects,
                            and continue learning cutting-edge technologies.
                        </p>
                    </div>
                    <a
                        href="https://miczhuan-website.s3.us-east-2.amazonaws.com/MZhuangResume_FT.pdf"
                        className="outlined-action"
                    >
                        View my resume →
                    </a>
                </div>
            </section>
        </div>
    )
};

export default About;
