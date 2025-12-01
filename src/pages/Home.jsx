import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Benefits from '../components/Benefits/Benefits';
import EContract from '../components/eContract/eContract';
import ESign from '../components/eSign/eSign';
import Process from '../components/Process/Process';
import WhyChoose from '../components/WhyChoose/WhyChoose';
import Customers from '../components/Customers/Customers';

import Footer from '../components/Footer/Footer';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.sectionId) {
      const section = document.getElementById(location.state.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      navigate('.', { replace: true, state: null });
    }
  }, [location, navigate]);

  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <EContract />
      <ESign />
      <Process />
      <WhyChoose />
      <Customers />   
      <Footer />
    </>
  );
}

export default Home;

