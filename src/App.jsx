import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Benefits from './components/Benefits/Benefits';
import EContract from './components/eContract/eContract';
import ESign from './components/eSign/eSign';
import Process from './components/Process/Process';
import WhyChoose from './components/WhyChoose/WhyChoose';
import Customers from './components/Customers/Customers';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Benefits />
      <EContract />
      <ESign />
      <Process />
      <WhyChoose />
      <Customers />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
