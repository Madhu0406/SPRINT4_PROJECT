import React from 'react';
import { motion } from 'framer-motion';
import HeroSlider from '../components/Layout/HeroSlider';
import CategoryList from '../components/Category/CategoryList';
import ProductList from '../components/Product/ProductList';

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3, ease: "easeIn" } }
};

const Home = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ minHeight: "80vh" }}
  >
    <HeroSlider />
    <section>
      <h2 style={{textAlign: 'center', margin: '2rem 0 1rem 0'}}>Shop By Category</h2>
      <CategoryList />
    </section>
    <section>
      <h2 style={{textAlign: 'center', margin: '2rem 0 1rem 0'}}>Trending Products</h2>
      <ProductList />
    </section>
  </motion.div>
);

export default Home;
