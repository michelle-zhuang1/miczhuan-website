import React from 'react';
import './Projects.css';

function Projects() {
    return (
        <div className="projects-container">
            <div className="projects-header">
                <h1>Projects</h1>
                <p>A collection of my technical and creative endeavors</p>
            </div>

            <div className="project-card">
                <h2>Summer Project: Computational Sewing Patterns</h2>
                
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
            </div>

            <div className="projects-footer">
                <p>More projects coming soon...</p>
            </div>
        </div>
    );
}

export default Projects;