import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import { useLenis } from './hooks/useLenis.js';

function App() {
  useLenis();

  return (
    <div className='dark'>
      <div className='bg-slate-950 text-white font-display antialiased selection:bg-primary selection:text-white overflow-x-hidden min-h-screen'>
        <div className='relative flex h-auto min-h-screen w-full flex-col group/design-root'>
          <Header />
          {/* add pt-16 (or tweak if needed) */}
          <main className='layout-container flex flex-col items-center w-full pt-16'>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
