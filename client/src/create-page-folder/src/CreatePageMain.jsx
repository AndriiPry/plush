import "./createPageMain.scss";
import Contact from "./components/contact/Contact";
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";

const CreatePageMain = () => {
  return (
    <div>
     
        <Hero />


        <Parallax type="services" />


        <Services />


        <Parallax type="portfolio" />

      <Portfolio />

        <Contact />

      {/* Framer Motion Crash Course */}
      {/* <Test/>
    <Test/> */}
    </div>
  );
};

export default CreatePageMain;
