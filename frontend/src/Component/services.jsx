import Navbar from './Navbar';
import Footer from './Footer';

const Services = () => {
  return (
    <div className="container">
      <Navbar />
      <h1>Our Services</h1>
      <ul>
        <li>Web Development</li>
        <li>App Development</li>
        <li>UI/UX Design</li>
      </ul>
      <Footer />
    </div>
  );
};

export default Services;
