import './About.css';
import Image from 'next/image';
import Aboutimg from '../../public/images/pexels-charlesdeluvio-1851164.jpg';

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="text-content">
        <h2>Prioritizing your pet companion</h2>
        <p>
          At PetComp, our priority goal is to ensure that your pets receive the best care possible. We provide a wide range of medical services and treatments tailored to the needs of your furry friends.
        </p>
        <p>
          Our team of experienced veterinarians and support staff are passionate about animals and committed to delivering the highest standards of care at all stages of their lives.
        </p>
      </div>
      <div className="image-content">
        <Image src={Aboutimg} alt="Cat" priority />
      </div>
    </section>
  );
};

export default About;
