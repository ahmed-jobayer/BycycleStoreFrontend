import {
  Award,
  Bike,
  Cog,
  ShieldCheck,
  Smile,
  Wrench,
} from "lucide-react";

const features = [
  {
    icon: <Bike size={40} className="text-green" />,
    title: "Wide Selection of Bikes",
    description:
      "From mountain trails to city streets, we have the perfect bike for every terrain and rider.",
  },
  {
    icon: <Award size={40} className="text-green" />,
    title: "Quality Assurance",
    description:
      "Every bike is built with high-quality materials and expert craftsmanship for a smooth, safe ride.",
  },
  {
    icon: <Wrench size={40} className="text-green" />,
    title: "Expert Assembly & Service",
    description:
      "Our certified mechanics ensure your bike is assembled to perfection and offer top-notch maintenance.",
  },
  {
    icon: <ShieldCheck size={40} className="text-green" />,
    title: "Warranty and Support",
    description:
      "Enjoy peace of mind with our comprehensive warranty and dedicated customer support team.",
  },
  {
    icon: <Cog size={40} className="text-green" />,
    title: "Easy Customization",
    description:
      "Personalize your ride with a wide range of accessories and components to fit your style.",
  },
  {
    icon: <Smile size={40} className="text-green" />,
    title: "Community Focused",
    description:
      "We're passionate about cycling and building a community of riders through events and workshops.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="w-full min-h-[45vh] sm:min-h-[55vh] lg:min-h-[60vh] rounded-4xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-[32px] sm:text-[40px] lg:text-[60px] leading-[40px] sm:leading-[45px] lg:leading-[65px] font-[500] w-full bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Why Choose Us
        </h1>
        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          Discover the difference when you choose us for your cycling needs.
        </p>
      </header>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-8 border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex justify-center mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-center mb-3 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;





