import Footer from "./Footer";
import AboutUsSection from "./Sections/AboutSection";
import HeroSection from "./Sections/HeroSection";
import PromoSection from "./Sections/PromoSection";
import ManpowerSection from "./Sections/ManPowerSection";
import ConsultingCTA from "./Sections/CallToActionSection";

const Homepage = () => {
  return <>
    <div className="main">
      <HeroSection />
      <PromoSection />
      <AboutUsSection />
      <ManpowerSection  backgroundImage={'img/cta-bg.svg'}/>
      <ConsultingCTA />
    </div>
    <Footer />
  </>
}

export default Homepage;