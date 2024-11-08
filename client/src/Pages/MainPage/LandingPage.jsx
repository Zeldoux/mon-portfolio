import React, { useState, useEffect } from 'react';
import '../../style/landingPage.css';
import LogoSVG from '../../Assets/LogoSVG';

const LandingPage = ({ onEnter }) => {
    const [fadeOut, setFadeOut] = useState(false);

    const handleLogoClick = () => {
        setFadeOut(true);
    };

    useEffect(() => {
        if (fadeOut) {
            setTimeout(() => {
                onEnter();
            }, 1000);
        }
    }, [fadeOut, onEnter]);

    return (
        <div className={`landing-page ${fadeOut ? 'fade-out' : ''}`}>
            <h1>Bienvenue sur le Portfolio de Yoann Sousa</h1>
            <div className="logo-container" onClick={handleLogoClick}>
                <LogoSVG className="landing-logo" />
            </div>
        </div>
    );
};

export default LandingPage;