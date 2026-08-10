import {
  FaLeaf,
  FaHeart,
  FaAward,
  FaTruck,
  FaShieldAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

import "../styles/AboutUs.css";



export default function AboutUs() {
  const values = [
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      text: "We partner with local organic farms committed to sustainable and eco-friendly practices.",
    },
    {
      icon: <FaHeart />,
      title: "Quality First",
      text: "Every product is carefully selected and inspected to ensure you receive only the best.",
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      text: "We strive for excellence in everything we do, from sourcing to delivery.",
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      text: "Quick and reliable delivery service to bring fresh groceries right to your doorstep.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trust & Safety",
      text: "Your trust is paramount. We ensure safe handling and secure transactions.",
    },
    {
      icon: <FaUsers />,
      title: "Community",
      text: "Building a community of health-conscious individuals who care about what they eat.",
    },
  ];

  const benefits = [
    {
      title: "100% Organic & Fresh",
      text: "All our products are certified organic and delivered fresh from the farm.",
    },
    {
      title: "Support Local Farmers",
      text: "Every purchase directly supports local farmers and sustainable agriculture.",
    },
    {
      title: "Convenient & Reliable",
      text: "Shop from home and get fresh groceries delivered to your doorstep on time.",
    },
    {
      title: "Competitive Pricing",
      text: "Get the best value for premium organic products without compromising quality.",
    },
  ];

  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="container about-hero-content">
          <h1>About FreshCart</h1>
          <p>
            Your trusted partner for fresh, organic groceries delivered straight
            to your door
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story section">
        <div className="container about-story-grid">
          <div className="about-story-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2018, FreshCart began with a simple mission: to make
              fresh, organic, and locally-sourced groceries accessible to
              everyone. We noticed a growing disconnect between consumers and
              the sources of their food, and we wanted to bridge that gap.
            </p>
            <p>
              What started as a small operation partnering with just 5 local
              farmers has grown into a thriving community of over 500 farmers
              and 50,000 satisfied customers. But our core values remain the
              same — quality, sustainability, and community.
            </p>
            <p>
              Today, FreshCart is proud to be the leading online grocery
              platform for organic and sustainable produce, serving communities
              across the country while supporting local farmers and sustainable
              agriculture.
            </p>
          </div>

          <div className="about-story-image">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
              alt="Fresh produce in a vehicle"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="container stats-grid">
          <div className="stat-card">
            <h3>50,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-card">
            <h3>500+</h3>
            <p>Local Farmers</p>
          </div>
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Products</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Organic</p>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="mission-vision section">
        <div className="container mission-grid">
          <div className="info-card">
            <h2>Our Mission</h2>
            <p>
              To revolutionize the way people shop for groceries by providing
              easy access to fresh, organic, and sustainably-sourced products
              while supporting local farmers and promoting healthy living. We
              believe everyone deserves access to quality food that nourishes
              both body and community.
            </p>
          </div>

          <div className="info-card">
            <h2>Our Vision</h2>
            <p>
              To create a world where sustainable, organic food is the norm, not
              the exception. We envision communities where local farmers thrive,
              families eat healthier, and the environment is protected for
              future generations through conscious food choices.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="core-values section">
        <div className="container">
          <div className="section-heading center">
            <h2>Our Core Values</h2>
            <p>
              These principles guide everything we do and shape our commitment
              to you, our farmers, and our planet
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose section">
        <div className="container why-grid">
          <div className="why-image">
            <img
              src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80"
              alt="Fresh cabbage farm"
            />
          </div>

          <div className="why-content">
            <h2>Why Choose FreshCart?</h2>

            <div className="benefits-list">
              {benefits.map((item, index) => (
                <div className="benefit-item" key={index}>
                  <div className="benefit-icon">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container cta-content">
          <h2>Join the FreshCart Family Today</h2>
          <p>
            Experience the difference of truly fresh, organic groceries
          </p>
          <div className="cta-buttons">
            <button className="btn-primary">Start Shopping</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>
    </main>
  );
}