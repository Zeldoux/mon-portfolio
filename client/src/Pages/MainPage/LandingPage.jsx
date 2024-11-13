import React, { useState, useEffect } from 'react';
import '../../style/landingPage.css';
import LogoSVG from '../../Assets/LogoSVG';
import TypingEffect from '../../components/TypingEffect';

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
        <article className={`landing-page ${fadeOut ? 'fade-out' : ''}`}>
            
                <h1> <TypingEffect
                    phrases={[
                        "Bienvenue sur le Portfolio de Yoann Sousa",
                        "Développeur web",
                        "Passionné de programmation",
                    ]}
                        typingSpeed={80}  // typing speed
                        deleteSpeed={50}   // delete speed
                        pause={500}       // pause between sentence
                        />
                </h1>
            <section className="logo-container" onClick={handleLogoClick}>
                <LogoSVG className="landing-logo" />
            </section>
            
        </article>
    );
};

export default LandingPage;