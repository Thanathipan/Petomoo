import React from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import Clinic from '../../../Components/Clinic/clinic';
import Footer from '../../../Components/Footer/Footer';

const clinic: React.FC = () => {
    return (
        <>
            <Navbar />
            <Clinic />
            <Footer />
        </>
    );
};

export default clinic;
