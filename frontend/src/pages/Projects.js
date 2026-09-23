import React, { useState } from 'react';
import './Projects.css';
import SewingThread from '../components/SewingThread';
import swolematesToday from '../assets/swolemates/swolemates-desktop-today.jpg';
import swolematesNutrition from '../assets/swolemates/swolemates-desktop-nutrition.jpg';
import swolematesPlan from '../assets/swolemates/swolemates-desktop-plan.jpg';
import swolematesPhoneToday from '../assets/swolemates/swolemates-mobile-today.png';
import swolematesPhoneNutrition from '../assets/swolemates/swolemates-mobile-nutrition.png';
import swolematesPhonePlan from '../assets/swolemates/swolemates-mobile-plan.png';

function SewingPatternsProject() {
    return (
        <>
            <div className="project-section">
                <h3>Background</h3>
                <p>
                    This project explores the intersection of clothing, craft, and technology.
                    Working with Professor Ganapati, I focused on sustainability and textile waste reduction
                    through computational approaches to sewing and upcycling.
                </p>
                <p>
                    The project emphasizes how technology can be used to transform existing garments
                    into new pieces, reducing waste while creating innovative designs.
                </p>
                <div className="image-gallery">
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/corduroyBefore.jpeg" alt="Corduroy pants before transformation" />
                        <p className="image-caption">Before: Corduroy pants</p>
                    </div>
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/corduroyAfter.jpg" alt="Corduroy pants transformed into dress" />
                        <p className="image-caption">After: Transformed into dress</p>
                    </div>
                </div>
            </div>

            <div className="project-section">
                <h3>Results</h3>
                <p>
                    Through this project, I successfully demonstrated various transformation techniques
                    including upcycling corduroy pants into dresses and reimagining shirt designs.
                    The work incorporated both traditional crafting methods and modern computational tools.
                </p>

                <div className="image-gallery">
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/OGshirt.jpeg" alt="Original shirt before transformation" />
                        <p className="image-caption">Original shirt</p>
                    </div>
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/gatheredDress1.jpeg" alt="Gathered dress transformation 1" />
                        <p className="image-caption">Gathered dress transformation</p>
                    </div>
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/gatheredDress2.jpeg" alt="Gathered dress transformation 2" />
                        <p className="image-caption">Gathered dress detail</p>
                    </div>
                </div>

                <div className="image-gallery single-image">
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/halterSetCode.jpg" alt="Code implementation for halter set" />
                        <p className="image-caption">Technical implementation code</p>
                    </div>
                </div>

                <div className="image-gallery single-image">
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/laserCutter.jpeg" alt="Laser cutter equipment used for pattern creation" />
                        <p className="image-caption">Laser cutter for precision pattern creation</p>
                    </div>
                </div>

                <div className="image-gallery">
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/OGbuttonUp.jpeg" alt="Original button-up shirt before transformation" />
                        <p className="image-caption">Original button-up shirt</p>
                    </div>
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/halterSet1.jpeg" alt="Halter set transformation 1" />
                        <p className="image-caption">Halter set transformation</p>
                    </div>
                    <div className="image-container">
                        <img src="https://miczhuan-website.s3.us-east-2.amazonaws.com/halterSet2.jpg" alt="Halter set transformation 2" />
                        <p className="image-caption">Halter set final result</p>
                    </div>
                </div>

                <div className="results-grid">
                    <div className="result-item">
                        <h4>Before & After Transformations</h4>
                        <p>Documented the complete transformation process of various garments</p>
                    </div>
                    <div className="result-item">
                        <h4>Technical Implementation</h4>
                        <p>Utilized code and laser cutting technology for precision pattern creation</p>
                    </div>
                    <div className="result-item">
                        <h4>Sustainability Impact</h4>
                        <p>Demonstrated practical approaches to reducing textile waste through upcycling</p>
                    </div>
                </div>
            </div>
        </>
    );
}

function SwolematesProject() {
    return (
        <>
            <div className="project-section">
                <h3>Background</h3>
                <p>
                    Swolemates is a full-stack fitness and nutrition tracker built with FastAPI,
                    PostgreSQL/SQLAlchemy, and React. The goal was to let a web client and an AI
                    agent drive the same application without duplicating business logic between
                    them.
                </p>
                <p>
                    Instead of bolting an assistant onto a finished app, the backend was designed
                    around a dual-transport service layer: HTTP requests from the web client and
                    tool calls from the agent both land in the same services, behind the same
                    authorization rules.
                </p>

                <div className="image-gallery single-image">
                    <div className="image-container">
                        <img src={swolematesToday} alt="Swolemates Today view showing calories and workouts left, progress rings, a month calendar, and the week's planned workouts" />
                        <p className="image-caption">Today: what's left to eat and lift, and where the week stands</p>
                    </div>
                </div>
            </div>

            <div className="project-section">
                <h3>Results</h3>
                <p>
                    The MCP server exposes 30+ tools covering workout logging, reusable templates,
                    and nutrition lookup, so an AI agent can operate the app end to end. Both
                    transports are secured with WorkOS AuthKit, and the whole system is deployed on
                    Railway and in daily use.
                </p>

                <div className="image-gallery">
                    <div className="image-container">
                        <img src={swolematesNutrition} alt="Swolemates Nutrition view with macro progress bars, the day's food log, a food search, and saved meals" />
                        <p className="image-caption">Nutrition: macro targets, the day's log, and reusable saved meals</p>
                    </div>
                    <div className="image-container">
                        <img src={swolematesPlan} alt="Swolemates Plan view showing a weekly lifting pattern, the next seven days generated from it, and saved workout templates" />
                        <p className="image-caption">Plan: one weekly pattern generates the next seven days</p>
                    </div>
                </div>

                <div className="image-gallery phone-shots">
                    <div className="image-container">
                        <img src={swolematesPhoneToday} alt="Swolemates Today view on a phone screen" />
                        <p className="image-caption">Today</p>
                    </div>
                    <div className="image-container">
                        <img src={swolematesPhoneNutrition} alt="Swolemates Nutrition view on a phone screen" />
                        <p className="image-caption">Nutrition</p>
                    </div>
                    <div className="image-container">
                        <img src={swolematesPhonePlan} alt="Swolemates Plan view on a phone screen" />
                        <p className="image-caption">Plan</p>
                    </div>
                </div>
                <p className="image-caption">The same three views on mobile, where most logging actually happens.</p>

                <div className="results-grid">
                    <div className="result-item">
                        <h4>Dual-Transport Backend</h4>
                        <p>One FastAPI service layer shared by the web client and the AI agent, with a single authorization path</p>
                    </div>
                    <div className="result-item">
                        <h4>MCP Tool Surface</h4>
                        <p>30+ tools for workout logging, templates, and nutrition lookup, secured with WorkOS AuthKit</p>
                    </div>
                    <div className="result-item">
                        <h4>Production Debugging</h4>
                        <p>Diagnosed and fixed a database race condition causing duplicate writes and a staging/production token-refresh bug</p>
                    </div>
                </div>
            </div>
        </>
    );
}

const PROJECTS = [
    {
        id: 'sewing-patterns',
        title: 'Summer Project: Computational Sewing Patterns',
        Body: SewingPatternsProject,
    },
    {
        id: 'swolemates',
        title: 'Swolemates: Fitness & Nutrition Tracker',
        Body: SwolematesProject,
    },
];

function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = PROJECTS[activeIndex];

    return (
        <div className="projects-container">
            <section className="projects-intro">
                <div className="projects-intro-inner">
                    <div className="section-label">
                        <span>Projects</span>
                        <a href="/contact" className="arrow-link">Get in touch →</a>
                    </div>
                    <div className="projects-header">
                        <h1>Selected work</h1>
                        <p>A collection of my technical and creative endeavors</p>
                    </div>
                </div>
            </section>

            <section className="projects-body">
            <div className="projects-body-inner">
            {active.id === 'sewing-patterns' && <SewingThread />}

            <div className="project-tabs">
                {PROJECTS.map((p, i) => (
                    <button
                        key={p.id}
                        type="button"
                        className={`project-tab ${i === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                    >
                        {p.title}
                    </button>
                ))}
            </div>

            <div className="project-card">
                <h2>{active.title}</h2>
                <active.Body />
            </div>
            </div>
            </section>
        </div>
    );
}

export default Projects;
