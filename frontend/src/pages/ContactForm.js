import { useState } from 'react';
import "./ContactForm.css";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    
    const [status, setStatus] = useState({ message: "", type: "" }); // Success/Error message
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ message: "", type: "" });
        
        try {
            const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";
            console.log("API URL being used:", apiUrl);
            console.log("Full endpoint:", `${apiUrl}/contact`);
            console.log("Environment variables:", process.env);
            
            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"  
                },
                body: JSON.stringify(formData)
            });
    
            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);
            
            const result = await response.json();
            console.log("Result:", result);
            
            if (response.ok && result.success) {
                setStatus({ message: "Message sent successfully! Thank you for reaching out.", type: "success" });
                setFormData({ name: "", email: "", message: "" }); // Clear form
            } else {
                setStatus({ message: result.error || "Failed to send message. Please try again.", type: "error" });
            }
        } catch (error) {
            console.error("Detailed error submitting form:", error);
            console.error("Error type:", error.name);
            console.error("Error message:", error.message);
            setStatus({ message: `Network error: ${error.message}. Please check your connection and try again.`, type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    
    return (
        <div className="contact-page">
            <div className="contact-page-inner">
            <div className="section-label">
                <span>Contact</span>
                <a href="/" className="arrow-link">Back home →</a>
            </div>
            <div className="contact-form">
                <h1>Let&rsquo;s talk</h1>
                <p className="contact-lede">
                    Have a role, project, or question in mind? Send me a message and I&rsquo;ll get back to you soon.
                </p>
                <div className="social-links">
                    <a href="https://github.com/michelle-zhuang1" aria-label="GitHub"><i className="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/michelle-zhuang" aria-label="LinkedIn"><i className="fa fa-linkedin"></i></a>
                    <a href="mailto:mzhuang5@gmail.com" aria-label="Email"><i className="far fa-envelope"></i></a>
                </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
                </button>

            </form> 
            {status.message && (
                <div className={`status-message ${status.type}`}>
                    {status.message}
                </div>
            )}
            </div>
            </div>
        </div>
    );
}

export default ContactForm;