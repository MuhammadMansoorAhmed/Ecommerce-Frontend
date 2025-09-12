import React from 'react';
import { motion } from 'framer-motion';
import NavbarComponent from '../../Components/Navbar/NavbarComponent';
import HomeFooter from '../../Components/HomeComponent/HomeFooter/HomeFooter';
import PerfumeCard from '../../Components/LandingPageComponents/PerfumeCard/PerfumeCard';
import BrandDescription from '../../Components/LandingPageComponents/BrandDescription/BrandDescription';
import BestPerfumes from '../../Components/LandingPageComponents/BestPerfumes/BestPerfumes';
import Reviews from '../../Components/LandingPageComponents/Reviews/Reviews';
import perfume1 from "../../assets/Hero1.png";
import perfume2 from "../../assets/Hero2.png";
import './LandingPage.css';
import NavBar from '../../Components/Navbar/NavBar';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <NavBar />
      
      {/* Hero Section with Brand Description and Perfume Cards */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <motion.div 
              className="col-md-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BrandDescription />
            </motion.div>
            
            <div className="col-md-6 position-relative perfume-cards-container">
              <motion.div 
                className="perfume-card-left"
                initial={{ opacity: 0, rotate: -30, y: 50 }}
                animate={{ opacity: 1, rotate: -20, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <PerfumeCard 
                  imageSrc={perfume1}
                  name="Signature Scent" 
                  description="Our flagship fragrance" 
                />
              </motion.div>
              
              <motion.div 
                className="perfume-card-right"
                initial={{ opacity: 0, rotate: 30, y: 50 }}
                animate={{ opacity: 1, rotate: 20, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <PerfumeCard 
                  imageSrc={perfume2} 
                  name="Evening Elegance" 
                  description="Perfect for special occasions" 
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Perfumes Section */}
      <motion.section 
        className="best-perfumes-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <BestPerfumes />
      </motion.section>
      
      {/* Reviews Section */}
      <motion.section 
        className="reviews-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Reviews />
      </motion.section>
      
      <HomeFooter />
    </div>
  );
};

export default LandingPage;