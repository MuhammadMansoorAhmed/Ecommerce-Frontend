import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./BrandDescription.css";

const BrandDescription = () => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8 },
    }),
  };

  return (
    <div className="brand-description">
      <motion.h1
        className="brand-title"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Ravaah Perfumes
      </motion.h1>

      <motion.p
        className="brand-tagline"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Discover the essence of luxury
      </motion.p>

      <motion.div
        className="brand-description-text"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <p>
          Ravaah brings you exquisite fragrances crafted with the finest
          ingredients from around the world. Our perfumes are designed to evoke
          emotions and create lasting impressions.
        </p>
      </motion.div>

      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <Link to="/shop" className="shop-now-btn">
          Shop Now
        </Link>
      </motion.div>
    </div>
  );
};

export default BrandDescription;
