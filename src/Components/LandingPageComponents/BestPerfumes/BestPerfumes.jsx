import React from 'react';
import { motion } from 'framer-motion';
import './BestPerfumes.css';
import perfume1 from "../../../assets/Ravaah.png";
import perfume2 from "../../../assets/Janan.jpg";
import perfume3 from "../../../assets/King.png";

const BestPerfumes = () => {
  const perfumes = [
    {
      id: 1,
      name: 'Ravaah',
      description: 'A sophisticated blend of amber and vanilla with woody undertones.',
      image: perfume1
    },  
    {
      id: 2,
      name: 'Janan',
      description: 'Fresh citrus notes combined with sea salt and light musk.',
      image: perfume2
    },
    {
      id: 3,
      name: 'King',
      description: 'A delicate arrangement of jasmine, rose, and lily of the valley.',
      image: perfume3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <div className="container best-perfumes">
      <motion.h2 
        className="section-title text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Signature Collection
      </motion.h2>
      
      <motion.div 
        className="row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {perfumes.map((perfume) => (
          <motion.div 
            key={perfume.id} 
            className="col-md-4 mb-4"
            variants={itemVariants}
          >
            <div className="perfume-item">
              <div className="perfume-image">
                <img src={perfume.image} alt={perfume.name} />
              </div>
              <div className="perfume-details">
                <h3>{perfume.name}</h3>
                <p>{perfume.description}</p>
                <button className="explore-btn">Explore</button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BestPerfumes;