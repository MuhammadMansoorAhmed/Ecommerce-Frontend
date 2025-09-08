import React from 'react';
import { motion } from 'framer-motion';
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      review: 'The Midnight Elegance perfume has become my signature scent. I receive compliments everywhere I go!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      review: 'Ocean Breeze is perfect for daily wear. Fresh, long-lasting, and not overpowering.',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      review: 'Floral Symphony is absolutely divine! The scent evolves beautifully throughout the day.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="container reviews-container">
      <motion.h2 
        className="section-title text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What Our Customers Say
      </motion.h2>
      
      <motion.div 
        className="row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {reviews.map((review) => (
          <motion.div 
            key={review.id} 
            className="col-lg-4 col-md-6 mb-4"
            variants={itemVariants}
          >
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-image">
                  <img src={review.image} alt={review.name} />
                </div>
                <div className="reviewer-info">
                  <h4>{review.name}</h4>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="review-content">
                <p>"{review.review}"</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Reviews;