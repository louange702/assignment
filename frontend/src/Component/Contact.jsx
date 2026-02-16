import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please reach out with any questions.</p>
        
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Email</h3>
            <p>louangeineza9@gmail.com</p>
          </div>
          <div className="contact-card">
            <h3>Phone</h3>
            <p>0796287433</p>
          </div>
          <div className="contact-card">
            <h3>Address</h3>
            <p>Rwanda Ngoma Kibungo</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Your Message" rows="5" style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }} required></textarea>
            </div>
            <button type="submit" className="login-btn">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
