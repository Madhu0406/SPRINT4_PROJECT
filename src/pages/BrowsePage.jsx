import React from 'react';
import { motion } from 'framer-motion';
import CategoryList from '../components/Category/CategoryList';

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3, ease: "easeIn" } }
};

const BrowsePage = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ minHeight: "80vh" }}
  >
    <section className="browse-hero animated-fade-in-down" style={{
      background: 'linear-gradient(90deg, #f8b6b6 0%, #fff 100%)',
      padding: '2rem 0 1rem 0',
      textAlign: 'center'
    }}>
      <h1 style={{fontSize: '2.2rem', color: '#222'}}>Browse Categories</h1>
      <p style={{fontSize: '1.1rem', color: '#444'}}>Explore our wide range of categories</p>
    </section>
    <CategoryList />
  </motion.div>
);

export default BrowsePage;
