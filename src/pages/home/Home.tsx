import Testimonial from "@/components/home/Testimonial";
import Banner from "../../components/home/Banner";
import Hero from "../../components/home/Hero";
import ResponsiveNavbar from "../../components/home/ResponsiveNavbar";
import FeaturedBicycles from "./FeaturedBicycles";
import ShopByCategory from "./ShopByCatwgory";
import WhyChooseUse from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="">
      <ResponsiveNavbar />
      <div className="container mx-auto min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 px-2 ">
        <div className="min-h-[30vh] sm:min-h-[40vh] my-6 sm:my-8 flex flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-16">
          <Hero />
          <Banner />
          <FeaturedBicycles />
          <ShopByCategory />
          <WhyChooseUse/>
          <Testimonial />
          <WhyChooseUse />
        </div>
      </div>
    </div>
  );
};

export default Home;
