import './Benefits.css'
import Benefits1 from '../../Assets/istockphoto-1189191657-612x612.jpg'
import Benefits2 from '../../Assets/T7ZRvsAFDkYC.jpg'
import Benefits3 from '../../Assets/istockphoto-177839842-612x612.jpg'


const Benefits = () => {
  return (
    <section className="benefits">
    <h2>BENEFITS</h2>
    <div className="benefit-cards">
      <div className="card">
        <img src={Benefits1} alt="Professional Team" />
        <h3>Professional Team</h3>
      </div>
      <div className="card">
        <img src={Benefits2} alt="Trust with Care" />
        <h3>Trust with Care</h3>
      </div>
      <div className="card">
        <img src={Benefits3} alt="Emergency Care" />
        <h3>Emergency Care</h3>
      </div>
    </div>
  </section>
  )
}

export default Benefits