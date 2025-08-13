import { useState } from "react";
import YouTube from "react-youtube"; // Make sure to install this package
import { 
  Droplets, 
  Link as LinkIcon, 
  Gauge, 
  Disc, 
  Settings, 
  CheckCircle, 
  PlayCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const BicycleMaintenanceTips = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const maintenanceTips = {
    cleaning: {
      title: "Cleaning",
      icon: Droplets,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      tips: [
        "Wash your bike with mild soap and water to remove dirt and grime",
        "Avoid high-pressure water to prevent bearing damage",
        "Dry and lubricate the chain after cleaning",
      ],
    },
    chain: {
      title: "Chain Care",
      icon: LinkIcon,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      tips: [
        "Lubricate regularly with bike-specific chain lube (wet/dry depending on conditions)",
        "Wipe off excess lube to prevent dirt buildup",
        "Replace the chain if stretched (use a chain checker tool)",
      ],
    },
    tires: {
      title: "Tire Maintenance",
      icon: Gauge,
      color: "from-green to-gdarkGreen",
      bgColor: "bg-green/10",
      iconBg: "bg-green/20",
      tips: [
        "Check tire pressure weekly with a pressure gauge",
        "Inspect tires for cuts, wear, or embedded debris",
        "Rotate tires occasionally for even wear",
      ],
    },
    brakes: {
      title: "Brakes",
      icon: Disc,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      tips: [
        "Ensure brake pads are aligned and not worn out",
        "Test brakes before every ride - replace pads if thin or squeaking",
        "Adjust cable tension if brakes feel loose",
      ],
    },
    gears: {
      title: "Gears",
      icon: Settings,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      tips: [
        "Clean and lubricate derailleur and cassette",
        "Check cable tension if gears skip or hesitate",
        "Consider professional tune-up for complex issues",
      ],
    },
  };

  const quickChecks = [
    "Air: Check tire pressure",
    "Brakes: Test functionality",
    "Chain: Check lubrication and wear",
    "Drive train: Inspect gears and shifting",
    "Fasteners: Ensure all bolts are tight",
  ];

  // YouTube video options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-offWhite via-white to-green/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green to-gdarkGreen rounded-full mb-6">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gdarkGreen to-green bg-clip-text text-transparent mb-4">
            Bicycle Maintenance Guide
          </h1>
          <p className="text-xl text-darkGrey/70 max-w-2xl mx-auto">
            Master the art of bike care with our comprehensive maintenance tips and tutorials
          </p>
        </div>

        {/* Maintenance Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {Object.entries(maintenanceTips).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <div
                key={key}
                className={`group relative overflow-hidden rounded-3xl ${category.bgColor} border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2`}
                onClick={() =>
                  setActiveCategory(activeCategory === key ? null : key)
                }
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Card Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${category.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-gdarkGreen" />
                  </div>
                  
                  {/* Title */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gdarkGreen group-hover:text-green transition-colors duration-300">
                      {category.title}
                    </h3>
                    {activeCategory === key ? (
                      <ChevronUp className="w-5 h-5 text-gdarkGreen" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gdarkGreen" />
                    )}
                  </div>
                  
                  {/* Tips */}
                  {activeCategory === key && (
                    <div className="animate-in slide-in-from-top duration-300">
                      <ul className="space-y-3">
                        {category.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
                            <span className="text-darkGrey/90 leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-green/20 transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Quick Check Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-lightGrey/30 p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green/20 rounded-2xl">
              <CheckCircle className="w-6 h-6 text-green" />
            </div>
            <h2 className="text-3xl font-bold text-gdarkGreen">
              Pre-Ride ABC Quick Check
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickChecks.map((check, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-green/5 rounded-2xl hover:bg-green/10 transition-colors duration-300">
                <div className="w-8 h-8 bg-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-darkGrey font-medium">{check}</span>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-lightGrey/30 p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-2xl">
              <PlayCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-3xl font-bold text-gdarkGreen">
              Video Tutorial
            </h3>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <YouTube
              videoId="Iuy7wwMm6HY"
              opts={{...opts, height: "450"}}
              className="w-full"
            />
          </div>
        </div>

        {/* Pro Tip */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green to-gdarkGreen rounded-3xl opacity-10" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-green/20 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green to-gdarkGreen rounded-full mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gdarkGreen mb-2">Pro Tip</h4>
            <p className="text-lg text-darkGrey/80">
              Even with regular maintenance, get a professional tune-up annually to keep your bike in peak condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BicycleMaintenanceTips;
