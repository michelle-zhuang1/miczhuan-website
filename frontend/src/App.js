import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { Home, About } from './pages';
// import { Header, NavBar, Footer } from './components';

import Home from './pages/Home';
import About from './pages/About';
import ContactForm from './pages/ContactForm';
import Projects from './pages/Projects';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
