const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://wa.me/250796287433" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Louange. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
