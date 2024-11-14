import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
                   <Navbar />
                   <div className="container mt-5">
      {/* Hero Section */}
      <div className="jumbotron bg-success text-white text-center p-5 mb-5 rounded">
        <h1 className="display-4">About Us</h1>
        <p className="lead">We are committed to excellence and delivering outstanding results.</p>
      </div>

      {/* Mission Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Our Mission</h2>
        <p className="text-center">
          Our mission is to empower individuals and organizations by providing high-quality products and
          services that meet the evolving needs of our customers. We believe in innovation, dedication, and
          integrity as the foundation of everything we do.
        </p>
      </section>

      {/* Values Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Our Values</h2>
        <div className="row">
          {/* Value Cards */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-award-fill fs-1 text-primary mb-3"></i>
                <h5 className="card-title text-success">Quality</h5>
                <p className="card-text">
                  We prioritize quality in all our offerings to ensure the best experience for our customers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-heart-fill fs-1 text-danger mb-3"></i>
                <h5 className="card-title text-success ">Integrity</h5>
                <p className="card-text">
                  Integrity is at the core of our business, guiding every decision we make.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-people-fill fs-1 text-success mb-3"></i>
                <h5 className="card-title text-success">Customer-Centric</h5>
                <p className="card-text">
                  Our customers' needs drive our actions, and we work tirelessly to meet their expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      
    </div>
    </div>
    
  );
};

export default About;
