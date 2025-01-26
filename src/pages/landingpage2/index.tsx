import React from 'react';
import About from '../../../Components/About/About';
import Hero from '../../../Components/Hero/Hero';
import Benefits from '../../../Components/Benefits/Benefits';
import Navbar2 from '../../../Components/Navbar2/Navbar2.module';
import Contact from '../../../Components/Contact/Contact';
import Footer from '../../../Components/Footer/Footer';

const App: React.FC = () => {
    return (
        <>
            <Navbar2 />
            <Hero />
            <About />
            <Benefits />
            <Contact />
            <Footer />

        </>
    );
};

export default App;
