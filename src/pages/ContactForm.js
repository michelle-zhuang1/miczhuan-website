import { useState } from 'react';
import styles from "./ContactForm.css";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    
    const [status, setStatus] = useState(null); // Success/Error message

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
      
            const result = await response.json();
            if (response.ok) {
              setStatus("Message sent successfully!");
              setFormData({ name: "", email: "", message: "" }); // Clear form
            } else {
              setStatus("Failed to send message.");
            }
          } catch (error) {
            setStatus("Error sending message.");
          }
        };
    
    return (
        <div className="contact-form">
            <div className="social-links">
                <p>Find me on my socials: 
                    <a href="https://github.com/michelle-zhuang1"><i class="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/michelle-zhuang"><i class="fa fa-linkedin in"></i></a>
                    <a href="mailto: mzhuang5@gmail.com"><i class="far fa-envelope"></i></a>
                </p>
            </div>
            <h2>Or Contact Me Here:</h2>
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
                <button type="submit">Submit</button>

            </form> 
        {status && <p className={styles.status}>{status}</p>}
        </div> 
    );
}

export default ContactForm;