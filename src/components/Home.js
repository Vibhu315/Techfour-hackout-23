import React from 'react';
// import image from "/public"
function Home() {
  const containerStyle = {
    backgroundColor: '#E6F7FF',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
   
  };

  const headingStyle = {
    color: '#FFFFFF',
    fontSize: '2.5rem',
    marginBottom: '15px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const paragraphStyle = {
    color: '#333333',
    fontSize: '1.2rem',
    lineHeight: '1.6',
  };

  return (
    <div className="home" style={containerStyle}>
      <h1 style={headingStyle}>Welcome to ReactApp</h1>
      <p style={paragraphStyle}>This is the home page content. It's a place to start your journey with React.</p>
      
    </div>
  );
}

export default Home;

