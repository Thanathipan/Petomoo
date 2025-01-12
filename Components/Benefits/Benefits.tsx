import './Benefits.css';
import Image from 'next/image';
import Benefits1 from '../../public/images/Benefits1.jpg';
import Benefits2 from '../../public/images/Benefits2..jpg'; // Corrected typo in the filename.
import Benefits3 from '../../public/images/Benefits3.jpg';

const Benefits: React.FC = () => {
  return (
    <section className="benefits">
      <h2>BENEFITS</h2>
      <div className="benefit-cards">
        <div className="card">
          <Image src={Benefits1} alt="Professional Team" priority />
          <h3>Professional Team</h3>
        </div>
        <div className="card">
          <Image src={Benefits2} alt="Trust with Care" priority />
          <h3>Trust with Care</h3>
        </div>
        <div className="card">
          <Image src={Benefits3} alt="Emergency Care" priority />
          <h3>Emergency Care</h3>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
