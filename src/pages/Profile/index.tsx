import React from 'react';
import Profile from '../../../Components/Profile/Profile';
import Navbar from '../../../Components/Navbar/Navbar';
import Waiting from '../../../Components/Waiting/Waiting';


const App: React.FC = () => {
    return (
        <>
        <div>
                    <Navbar />
                    </div>
            <Profile />
            <Waiting />


        </>
    );
};

export default App;
