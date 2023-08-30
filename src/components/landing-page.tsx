import React from 'react';
import './home.css';
import logo from "../assets/logo-large.png"; // @Ishmael Replace with  logo image path
//import vote1.webp from 'src/assets/vote1.webp'; // @Ishmael replace with images then delete comments
import Image2 from './images/image2.jpg';
import Image3 from './images/image3.jpg';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          <img src="src/assets/logo.png" alt="Logo" className="logo-img" />
        </div>
      </nav>
      <div className="content">
        <div className="login-form">
          {/* Your login/signin form that we had created */}
        </div>
        <div className="image-container">
          <img src={Image1} alt="Image 1" className="hover-image" />
          <img src={Image2} alt="Image 2" className="hover-image" />
          <img src={Image3} alt="Image 3" className="hover-image" />
        </div>
      </div>
    </div>
  );
};

export default App;
