import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: '/images/slider1.png',
    caption: 'Soft Comfort Bold Looks',
    subcaption: 'MODERN EVERYDAY LOOKS'
  },
  {
    url: '/images/slider2.png',
    caption: 'New Arrivals',
    subcaption: 'SUMMER COLLECTION'
  },
  {
    url: '/images/slider3.png',
    caption: 'Sale Up To 50% Off',
    subcaption: 'LIMITED TIME OFFER'
  }
];

const HeroSlider = () => {
  const navigate = useNavigate();

  const handleShopCollection = () => {
    navigate(`/category/all`);
  };

  return (
    <div className="hero-slider">
      <Slide
        autoplay={true}
        duration={4000}
        transitionDuration={800}
        arrows={true}
        infinite={true}
      >
        {slideImages.map((slide, idx) => (
          <div className="each-slide" key={idx}>
            <div className="slider-image-wrapper">
              <img src={slide.url} alt={slide.caption} className="slider-image" />
              <div className="hero-text">
                <div className="hero-subcaption">{slide.subcaption}</div>
                <div className="hero-caption">{slide.caption}</div>
                <button className="hero-btn" onClick={handleShopCollection}>
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default HeroSlider;
