// import React, { useEffect } from 'react';
// import * as THREE from 'three';

// function ThreeJSBridge() {
//     useEffect(() => {
//     // Initialize scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Create a bridge-like structure
//     const bridge = new THREE.Object3D();

//     // Create bridge pillars
//     const pillarGeometry = new THREE.BoxGeometry(0.5, 3, 0.5);
//     const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
//     const pillar1 = new THREE.Mesh(pillarGeometry, pillarMaterial);
//     pillar1.position.set(-2, 1.5, 0);
//     bridge.add(pillar1);

//     const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
//     pillar2.position.set(2, 1.5, 0);
//     bridge.add(pillar2);

//     // Create bridge deck
//     const deckGeometry = new THREE.BoxGeometry(5, 0.2, 1);
//     const deckMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const deck = new THREE.Mesh(deckGeometry, deckMaterial);
//     deck.position.set(0, 2.5, 0);
//     bridge.add(deck);

//     scene.add(bridge);

//     // Position the camera
//     camera.position.z = 8;

//     // Render loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Rotate the bridge
//       bridge.rotation.y += 0.005;

//       renderer.render(scene, camera);
//     };
//     animate();
//   }, []);

//   return <canvas id="canvas"></canvas>;
// }

// export default ThreeJSBridge;



import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';


function ThreeJSBridge() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(3);
  const [length, setLength] = useState(1);
  const [pillarSpacing, setPillarSpacing] = useState(1.5); // Default pillar spacing
  const [isAnimating, setIsAnimating] = useState(true);
  // const [savedRotation, setSavedRotation] = useState(0);
  const [scene, setScene] = useState(new THREE.Scene());
 
  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const numPillars = Math.floor(width / pillarSpacing) + 1;

    // Create a bridge-like structure
    const bridge = new THREE.Group();

    // Create bridge pillars
    const pillarGeometry = new THREE.BoxGeometry(0.5, height, 0.5);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    for (let i = 0; i < numPillars; i++) {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(positionX - (width / 2) + (i * pillarSpacing), positionY + height / 2, positionZ);
      bridge.add(pillar);
    }

    // Create bridge deck
    const deckGeometry = new THREE.BoxGeometry(width, 0.2, length);
    const deckMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const deck = new THREE.Mesh(deckGeometry, deckMaterial);
    deck.position.set(positionX, positionY + height, positionZ);
    bridge.add(deck);

    scene.add(bridge);

    // Position the camera
    camera.position.z = 8;
    setScene(scene);
    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
    
      if (isAnimating) {
        bridge.rotation.y += 0.009;
      }
    
      renderer.render(scene, camera);
    };
    
    
  
    animate();
  }, [positionX, positionY, positionZ, width, height, length, pillarSpacing,isAnimating]);
  
  const sidebarStyles = {
    position: 'fixed',
    top: 75,
    left: isSidebarExpanded ? 0 : '-250px',
    zIndex: 1,
    width: '250px',
    padding: '20px',
    background: 'linear-gradient(to bottom, #3498db, #8E44AD)',
    color: 'white',
    transition: 'left 0.3s ease-in-out',
    overflowY: 'auto',
    height: '100vh',
  };
  const exportModel = () => {
    const exporter = new GLTFExporter();
  
    exporter.parse(scene, (gltf) => {
      const blob = new Blob([gltf], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'bridge_model.gltf';
      link.click();
    });
  };
  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      <div
        id="sidebar"
        style={sidebarStyles}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}>
          <label htmlFor="positionX">Position X:</label>
          <input
            type="number"
            id="positionX"
            placeholder="Enter X position"
            value={positionX}
            onChange={(e) => setPositionX(parseFloat(e.target.value))}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}>
        <label htmlFor="positionY" style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>Position Y:</label>
        <input
          type="number"
          id="positionY"
          placeholder="Enter Y position"
          value={positionY}
          onChange={(e) => setPositionY(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}>
        <label htmlFor="positionZ" style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>Position Z:</label>
        <input
          type="number"
          id="positionZ"
          placeholder="Enter Z position"
          value={positionZ}
          onChange={(e) => setPositionZ(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}>
        <label htmlFor="width" style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }} >Width:</label>
        <input
          type="number"
          id="width"
          placeholder="Enter width"
          value={width}
          onChange={(e) => setWidth(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}>
        <label htmlFor="height" style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>Height:</label>
        <input
          type="number"
          id="height"
          placeholder="Enter height"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '19px' }}>
        <label htmlFor="length" style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>Length:</label>
        <input
          type="number"
          id="length"
          placeholder="Enter length"
          value={length}
          onChange={(e) => setLength(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label htmlFor="pillarSpacing">Pillar Spacing:</label>
        <input
          type="number"
          id="pillarSpacing"
          placeholder="Enter pillar spacing"
          value={pillarSpacing}
          onChange={(e) => setPillarSpacing(parseFloat(e.target.value))}
        />
      </div>
      <button style={{  padding: '8px 20px',
      marginBottom:'5px',
      marginTop:'5px',  
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
            transition: 'background-color 0.3s ease-in-out',}} onClick={() => setIsAnimating(!isAnimating)}>
          {isAnimating ? 'Pause Animation' : 'Resume Animation'}
        </button>
        {/* <button onClick={isAnimating ? saveAndStopAnimation : resumeAnimation}>
          {isAnimating ? 'Stop Animation' : 'Resume Animation'}
        </button> */}
        <button  style={{padding: '8px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out',}} onClick={exportModel}>Export Model</button>
        
      </div>
      <canvas id="canvas" style={{ flex: '1' }}></canvas>
    </div>
  );
}

export default ThreeJSBridge;
