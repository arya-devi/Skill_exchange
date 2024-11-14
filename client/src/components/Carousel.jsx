import React from 'react';
import { Carousel } from 'react-bootstrap';

const SkillCarousel = () => {
  const images = [
    'https://www.pngplay.com/wp-content/uploads/9/Learning-Transparent-Images.png',
    'https://www.pngplay.com/wp-content/uploads/9/Learning-Transparent-Free-PNG.png',
    'https://www.pngplay.com/wp-content/uploads/9/Learning-Transparent-Background.png',
    'https://www.pngplay.com/wp-content/uploads/9/Learning-Transparent-PNG.png',
    'https://www.pngplay.com/wp-content/uploads/9/Making-A-Speech-PNG-Photos.png',
    'https://www.pngplay.com/wp-content/uploads/9/Learning-Transparent-File.png',
    'https://www.pngplay.com/wp-content/uploads/9/Learning-PNG-HD-Quality.png',
    'https://www.pngplay.com/wp-content/uploads/9/Learning-Background-PNG-Image.png'
  ];

  return (
    <Carousel
      interval={3000}
      fade
      indicators={false}
      controls
      style={{
        backgroundColor: '#1A1A19',
        color: '#FFF',
        textAlign: 'center',
        padding: '40px 0',
      }}
    >
      {images.map((image, index) => (
        <Carousel.Item key={index} style={{ transition: 'opacity 0.5s ease-in-out' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '20%',
                maxHeight: '500px',
                objectFit: 'cover',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            />
            
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SkillCarousel;
