import React from 'react';
import CustomNavbar from '../components/Navbar';
import SkillCarousel from '../components/Carousel';
import './Home.css';
import checkAuth from '../components/checkAuth';

const Home = () => {
  return (
    <div>
      <CustomNavbar />
      <SkillCarousel />
      <div className="home-content">
        <div className="home-container">
          <h2 className="section-title">Welcome to the Skill Exchange</h2>
          <div className="card-row">
            <div className="custom-card">
              <h5 className="card-title">Add Your Skills</h5>
              <p className="card-text">Share your skills and help others grow.</p>
              <a href="/skills" className="custom-btn">Add Skill</a>
            </div>
            <div className="custom-card">
              <h5 className="card-title">View Other Skills</h5>
              <p className="card-text">Explore the skills shared by others and learn.</p>
              <a href="/allskills" className="custom-btn">View Skills</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(Home);
