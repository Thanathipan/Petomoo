import React from 'react';
import About from '../../Components/About/About';
import Hero from '../../Components/Hero/Hero';
import Benefits from '../../Components/Benefits/Benefits';
import Navbar from '../../Components/Navbar/Navbar';
import Contact from '../../Components/Contact/Contact';
import Footer from '../../Components/Footer/Footer';

const App: React.FC = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Benefits />
            <Contact />
            <Footer />

        </>
    );
};

export default App;
