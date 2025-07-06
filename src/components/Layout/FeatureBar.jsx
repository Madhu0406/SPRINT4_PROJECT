import React from 'react';
import { Slide } from 'react-slideshow-image';
import { FiPackage, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import 'react-slideshow-image/dist/styles.css';
import '../../styles/featurebar.css';

const features = [
  {
    icon: <FiPackage size={40} />,
    title: 'Free Shipping',
    desc: 'Enjoy free worldwide shipping and returns, with customs and duties taxes included.'
  },
  {
    icon: <FiCheckCircle size={40} />,
    title: 'Free Returns',
    desc: 'Free returns within 15 days, please make sure the items are in undamaged condition.'
  },
  {
    icon: <FiMessageCircle size={40} />,
    title: 'Support Online',
    desc: 'We support customers 24/7, send questions we will solve for you immediately.'
  }
];

const FeatureBar = () => (
  <div className="featurebar-root">
    <div className="featurebar-desktop">
      {features.map((feature, idx) => (
        <div className="featurebar-card" key={idx}>
          <div className="featurebar-icon">{feature.icon}</div>
          <div className="featurebar-title">{feature.title}</div>
          <div className="featurebar-desc">{feature.desc}</div>
        </div>
      ))}
    </div>
    <div className="featurebar-mobile">
      <Slide
        autoplay={false}
        indicators={true}
        arrows={false}
        duration={6000}
        transitionDuration={600}
      >
        {features.map((feature, idx) => (
          <div className="featurebar-card" key={idx}>
            <div className="featurebar-icon">{feature.icon}</div>
            <div className="featurebar-title">{feature.title}</div>
            <div className="featurebar-desc">{feature.desc}</div>
          </div>
        ))}
      </Slide>
    </div>
  </div>
);

export default FeatureBar;
