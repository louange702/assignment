import Navbar from './Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="about-content">
        <h1>About Us</h1>
        
        <section className="about-section">
          <h2>Our History</h2>
          <p>
            Garden Technical Secondary School was founded with a vision to bridge the gap between academic theory and practical technical skills. Over the years, we have grown into a premier institution known for excellence in both general education and technical training.
          </p>
        </section>

        <div className="about-grid">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>To provide high-quality technical and academic education that empowers students to innovate, excel, and lead in a rapidly changing global economy.</p>
          </div>
          <div className="about-card">
            <h3>Our Vision</h3>
            <p>To be a center of excellence in technical education, fostering a community of disciplined, skilled, and visionary future leaders.</p>
          </div>
          <div className="about-card">
            <h3>Our Values</h3>
            <p>Discipline, Innovation, Integrity, and Hard Work are the pillars that guide our students and staff every day.</p>
          </div>
        </div>

        <section className="about-section highlight">
          <h2>Why Choose Us?</h2>
          <p>
            At Garden tss, we provide a supportive learning environment where students gain hands-on experience in various technical fields while maintaining a strong academic foundation. Our graduates are well-prepared for both university entry and immediate career opportunities.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
