import React from 'react';
import { motion } from 'framer-motion';
import './PerfumeCard.css';

const PerfumeCard = ({ imageSrc, name, description }) => {
  return (
    <motion.div 
      className="perfume-card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="perfume-card-image">
        <img src={imageSrc} alt={name} />
      </div>
      <div className="perfume-card-content">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default PerfumeCard;