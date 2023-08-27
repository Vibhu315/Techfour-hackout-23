import React from 'react';
import './home.css'; 

function Home() {
  return (
    <div>
      <div className="container header">
        <h1 className="heading">Welcome to 3-D Model World</h1>
        <p className="paragraph">Lets play with the 3-D model</p>
      </div>
      <div className="container models">
        <div className="model">
          <div className="rotating-image">
            <img src="/b4.gif" alt="3D Model 1" className="image" />
          </div>
          <div className="model-info">
            <h2>1. Planning and Design Stage</h2>
            <p>During this stage, engineers and architects work together to create a comprehensive plan for the bridge that meets functional, safety, aesthetic, and environmental requirements.</p>
          </div>
        </div>
        <div className="model">
          <div className="rotating-image">
            <img src="/b1.gif" alt="3D Model 2" className="image" />
          </div>
          <div className="model-info">
            <h2>2. Construction Stage</h2>
            <p>Once the design is finalized, construction begins. This stage involves transforming the design into a physical structure.</p>
          </div>
        </div>
        <div className="model">
          <div className="rotating-image">
            <img src="/bb.gif" alt="3D Model 3" className="image" />
          </div>
          <div className="model-info">
            <h2>3. Completion Stage</h2>
            <p>In this final stage, the bridge is finished, inspected, and officially opened for public use.</p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2023 3-D Model World Presented By Nebula Tech, All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
