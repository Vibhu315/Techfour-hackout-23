import React, { useEffect } from 'react';
import * as THREE from 'three';

function ThreeJSBridge(e) {
    
  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a bridge-like structure
    const bridge = new THREE.Object3D();

    // Create bridge pillars
    const pillarGeometry = new THREE.BoxGeometry(0.5, 3, 0.5);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const pillar1 = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar1.position.set(-2, 1.5, 0);
    bridge.add(pillar1);

    const pillar2 = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar2.position.set(2, 1.5, 0);
    bridge.add(pillar2);

    // Create bridge deck
    const deckGeometry = new THREE.BoxGeometry(5, 0.2, 1);
    const deckMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const deck = new THREE.Mesh(deckGeometry, deckMaterial);
    deck.position.set(0, 2.5, 0);
    bridge.add(deck);

    scene.add(bridge);

    // Position the camera
    camera.position.z = 8;

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the bridge
      bridge.rotation.y += 0.005;

      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <canvas id="canvas"></canvas>;
}

export default ThreeJSBridge;
