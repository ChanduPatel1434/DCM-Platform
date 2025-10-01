import Footer from "./Footer";
import AboutUsSection from "./Sections/AboutSection";
import HeroSection from "./Sections/HeroSection";
import PromoSection from "./Sections/PromoSection";
import ManpowerSection from "./Sections/ManPowerSection";
import ConsultingCTA from "./Sections/CallToActionSection";
import TeamSection from "./TeamSection";
import ProductsSection from "./Sections/ProductSection";
import BlogSection from "./Sections/blog";
import CommentsSection from "./Sections/comment";
import ProductsShowcase from "./Sections/ProductSection";
import ServicesSection from "./Sections/Servicesection";

const Homepage = () => {
  return <>
    <div className="main">
      <HeroSection />
      {/* <PromoSection /> */}
      <BlogSection/>
      <CommentsSection/>
      <ServicesSection/>
      <ProductsShowcase/>
      
      <AboutUsSection />

      <ManpowerSection  backgroundImage={'img/cta-bg.svg'}/>
      <TeamSection/>
      <ConsultingCTA />
    </div>
    <Footer />
  </>
}

export default Homepage;