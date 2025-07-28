/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Bike, Mountain, Zap, Car, Truck, Waves } from "lucide-react";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/features/filterSlice/filterSlice";

// Define bike categories with icons and descriptions
const bikeCategories = [
  {
    id: "mountain",
    name: "Mountain",
    description: "Built for off-road adventures and rugged terrain",
    icon: Mountain,
    gradient: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "road",
    name: "Road",
    description: "Lightweight bikes designed for speed and efficiency",
    icon: Bike,
    gradient: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Perfect blend of comfort and performance",
    icon: Car,
    gradient: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "gravel",
    name: "Gravel",
    description: "Compact bikes for stunts and trick riding",
    icon: Truck,
    gradient: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: "electric",
    name: "Electric",
    description: "Eco-friendly bikes with electric assistance",
    icon: Zap,
    gradient: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    id: "fat-bikes",
    name: "Fat Bikes",
    description: "Wide tires for sand, snow, and rough terrain",
    icon: Waves,
    gradient: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50",
    iconColor: "text-gray-600",
  },
];

const ShopByCategory = () => {
  // navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFilterChange = (key: string, category: string, name: string) => {
    dispatch(setFilter({ [key]: category }));
    toast.success(`Browsing ${name} bikes!`);
    navigate("/AllBicycles");
  };



  return (
    <div className="w-full min-h-[45vh] sm:min-h-[55vh] lg:min-h-[60vh] rounded-4xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16">
      {/* header */}
      <header className="flex h-full flex-col gap-12 lg:gap-0 lg:flex-row justify-center items-center lg:mt-3">
        <div className="px-6 sm:px-8 mt-8 lg:mt-0 w-full space-y-6">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[60px] leading-[40px] sm:leading-[45px] lg:leading-[65px] font-[500] w-full text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Shop By Category
          </h1>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the perfect bike for your riding style and adventure
          </p>
        </div>
      </header>

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 mt-12">
        {bikeCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              onClick={() => handleFilterChange("type", category?.id, category?.name)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Card content */}
              <div
                className={`${category.bgColor} p-8 h-full border border-gray-200 group-hover:border-transparent transition-all duration-300`}
              >
                {/* Icon container */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`p-4 rounded-full ${category.bgColor} border-2 border-current ${category.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent size={32} className="stroke-2" />
                  </div>
                </div>

                {/* Category name */}
                <h3 className="text-2xl font-bold text-center mb-3 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  {category.name}
                </h3>

                {/* Category description */}
                <p className="text-gray-600 text-center leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {category.description}
                </p>

                {/* Hover effect arrow */}
                <div
                  
                  className="flex justify-center mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${category.gradient} text-white text-sm font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300`}
                  >
                    Explore Now →
                  </div>
                </div>
              </div>

              {/* Subtle border animation */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                style={{ padding: "2px" }}
              >
                <div className="w-full h-full rounded-2xl bg-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByCategory;



