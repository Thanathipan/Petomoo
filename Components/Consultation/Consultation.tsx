import "./Consultation.css"; // Link to your CSS file
import Image from "next/image"; // Use Next.js Image component for optimized image handling
import image1 from "../../public/images/AdobeStock_994072575_Preview.jpeg";
import image2 from "../../public/images/02_3464BethelDr_574_FrontView_HiRes_450x250.jpg";

const Booking: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Visit us for expert pet care</h1>
          <p>Where compassion meets excellence!</p>
          <a href="/bookingvisit" className="btn primary">
            Book Visit
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Providing best services for your pets</h2>
        <div className="services-wrapper">
          <p>
            At Pawcare, our in-clinic consultations offer comprehensive care to
            ensure your pet's health and well-being. Our experienced
            veterinarians go through physical examinations, use advanced
            diagnostic tools, and create personalized treatments tailored to
            your pet’s unique needs.
          </p>
          {/* Replace img with Next.js Image */}
          <Image src={image1} alt="Providing best services for pets" priority />
        </div>
      </section>

      {/* Clinic Locations Section */}
      <section className="locations">
        <div className="locations-header">
          <h2>Clinic Locations</h2>
          <a href="#">See all</a>
        </div>
        <div className="location-card">
          {/* Replace img with Next.js Image */}
          <Image src={image2} alt="Vavuniya Clinic" priority />
          <div className="card-content">
            <h3>Vavuniya</h3>
            <p>
              Located at the Vavuniya near to the railway station, our clinic at
              123 Pet Care Lane offers a warm and welcoming environment for you
              and your pets. We’ve designed our space to be a comfortable and
              stress-free atmosphere. Drop by today to find dedicated care right
              in the heart of the community.
            </p>
            <a href="bookingvisit1" className="btn primary">
              Book Visit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
