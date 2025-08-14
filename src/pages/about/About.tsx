import cycle1 from "../../assets/images/img/us1.jpg";
import cycle2 from "../../assets/images/img/us2.jpg";
import cycle3 from "../../assets/images/img/us3.jpg";
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const animateSection = (element: HTMLElement) => {
      element.classList.add("animate-fade-in-up");
      element.classList.remove("opacity-0", "translate-y-8");
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSection(entry.target as HTMLElement);
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    // Add a small delay to ensure all elements are rendered
    const timer = setTimeout(() => {
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          // Check if element is already in viewport or is the first element
          const rect = ref.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

          if (index === 0 || isInViewport) {
            // Animate immediately if first section or already in viewport
            setTimeout(() => animateSection(ref), index * 200);
          } else {
            // Otherwise, observe for intersection
            observer.observe(ref);
          }

          // Fallback: make visible if not animated within 3 seconds
          setTimeout(() => {
            if (ref.classList.contains("opacity-0")) {
              animateSection(ref);
            }
          }, 3000);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="space-y-16 text-justify bg-gradient-to-br from-offWhite to-white min-h-screen">
      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="w-full min-h-[55vh] rounded-4xl shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-lightGrey/20"
      >
        <section className="relative rounded-4xl isolate overflow-hidden bg-gradient-to-br from-green/5 to-gdarkGreen/5 px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-green),transparent)] opacity-10"></div>
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gradient-to-r from-green/10 to-transparent ring-1 shadow-xl shadow-green/20 ring-green/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <img
              src="https://avatars.githubusercontent.com/u/112149785?v=4"
              alt="CEO Image"
              className="mx-auto h-48 rounded-full border-4 border-green/20 shadow-lg"
            />
            <figure className="mt-10">
              <blockquote className="text-center text-xl/8 font-semibold text-darkGrey sm:text-2xl/9">
                <p className="relative">
                  <span className="text-green text-6xl absolute -top-4 -left-4 opacity-20">
                    "
                  </span>
                  Being a modern bike shop with traditional values of great,
                  friendly service and a commitment to the local community, we
                  make a point of carrying a huge range of affordable kids and
                  family bikes, in a wide selection of colours.
                  <span className="text-green text-6xl absolute -bottom-8 -right-4 opacity-20">
                    "
                  </span>
                </p>
              </blockquote>
              <figcaption className="mt-10">
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-gdarkGreen text-lg">
                    Jobayer Ahmed
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green"></div>
                  <div className="text-green font-medium">CEO of Bicycle</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>

      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="w-full min-h-[55vh] rounded-4xl shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-lightGrey/20"
      >
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6 bg-gradient-to-r from-white to-green/5 rounded-4xl">
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <div className="inline-block bg-green/10 px-4 py-2 rounded-full mb-4">
              <span className="text-green font-semibold text-sm">
                Our Story
              </span>
            </div>
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500] text-gdarkGreen">
              History!
            </h1>
            <p className="text-[16px] mt-2 text-darkGrey leading-relaxed">
              BicycleB is the very first premium bicycle brand manufactured in
              Bangladesh. The brand is owned by Meghna, the number 1 premium
              bike manufacturer in South Asia. BicycleB started its journey back
              in 2014 to provide affordable premium bikes for cycling
              enthusiasts, while maintaining all European ISO standards that
              Meghna learnt from the experiences in exporting bikes to Europe.
              The brand started small, with selling only few hundred units per
              month back in 2014
            </p>
          </div>

          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle1}
              alt="Historical bicycle image"
              className="w-full h-full rounded-4xl shadow-lg border-2 border-green/20"
            />
          </div>
        </header>
      </div>

      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="w-full min-h-[55vh] rounded-4xl shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-lightGrey/20"
      >
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6 bg-gradient-to-l from-white to-gdarkGreen/5 rounded-4xl">
          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle2}
              alt="Market position bicycle"
              className="w-full h-full rounded-4xl shadow-lg border-2 border-gdarkGreen/20"
            />
          </div>
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <div className="inline-block bg-gdarkGreen/10 px-4 py-2 rounded-full mb-4">
              <span className="text-gdarkGreen font-semibold text-sm">
                Market Leadership
              </span>
            </div>
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500] text-green">
              Market Position!
            </h1>
            <p className="text-[16px] mt-2 text-darkGrey leading-relaxed">
              Currently, BicycleB is the most well known bicycle brand in
              Bangladesh, and one of the few bicycle brands catering to the
              premium bicycle segment in Bangladesh with over 80% market share.
              BicycleB has reached the global market starting with India in
              2020, currently expanding distribution networks in India and
              surrounding countries in the region.
            </p>
          </div>
        </header>
      </div>

      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="w-full min-h-[55vh] rounded-4xl shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-lightGrey/20"
      >
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6 bg-gradient-to-r from-white to-green/5 rounded-4xl">
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <div className="inline-block bg-green/10 px-4 py-2 rounded-full mb-4">
              <span className="text-green font-semibold text-sm">
                Innovation
              </span>
            </div>
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500] text-gdarkGreen">
              BicycleB Technologies!
            </h1>
            <p className="text-[16px] mt-2 text-darkGrey leading-relaxed">
              A premium bicycle component brand manufactured by Meghna. It is
              the perfect mixture of innovation, technology and design to
              provide superior quality, and durability.
            </p>
          </div>

          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle3}
              alt="Technology bicycle"
              className="w-full h-full rounded-4xl shadow-lg border-2 border-green/20"
            />
          </div>
        </header>
      </div>

      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="w-full min-h-[55vh] rounded-4xl shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-lightGrey/20"
      >
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6 bg-gradient-to-l from-white to-gdarkGreen/5 rounded-4xl">
          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle2}
              alt="Global reach bicycle"
              className="w-full h-full rounded-4xl shadow-lg border-2 border-gdarkGreen/20"
            />
          </div>
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <div className="inline-block bg-gdarkGreen/10 px-4 py-2 rounded-full mb-4">
              <span className="text-gdarkGreen font-semibold text-sm">
                Global Expansion
              </span>
            </div>
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500] text-green">
              Global Reach!
            </h1>
            <p className="text-[16px] mt-2 text-darkGrey leading-relaxed">
              Currently, BicycleB is the most well known bicycle brand in
              Bangladesh, and one of the few bicycle brands catering to the
              premium bicycle segment in Bangladesh with over 80% market share.
              BicycleB has reached the global market starting with India in
              2020, currently expanding distribution networks in India and
              surrounding countries in the region.
            </p>
          </div>
        </header>
      </div>

      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="w-full min-h-[55vh] rounded-4xl shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-lightGrey/20"
      >
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6 bg-gradient-to-r from-white to-green/5 rounded-4xl">
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <div className="inline-block bg-green/10 px-4 py-2 rounded-full mb-4">
              <span className="text-green font-semibold text-sm">
                Our People
              </span>
            </div>
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500] text-gdarkGreen">
              OUR TEAM!
            </h1>
            <p className="text-[16px] mt-2 text-darkGrey leading-relaxed">
              Our staff are active, passionate bike riders and racers, who offer
              professional sales help and bike fitting advice. Based around the
              Mornington Peninsula, you'll find us riding the local trails and
              roads. Keep an eye on our to join us on our regular Shop Rides!
              Our bike range caters for everyone – pro riders, downhill and
              enduro adrenalin junkies, rail trail and bike path adventure
              seekers, and families looking to enjoy the weekend bike ride
              around the neighborhood bike paths
            </p>
          </div>

          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle3}
              alt="Team bicycle"
              className="w-full h-full rounded-4xl shadow-lg border-2 border-green/20"
            />
          </div>
        </header>
      </div>

      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="w-full min-h-[55vh] rounded-4xl shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white border border-lightGrey/20"
      >
        {/* header */}
        <header className="flex h-full lg:flex-row flex-col gap-[50px] lg:gap-0 justify-center items-center lg:mt-3 py-6 bg-gradient-to-l from-white to-gdarkGreen/5 rounded-4xl">
          {/* image */}
          <div className="w-full lg:w-[50%] object-cover p-10">
            <img
              src={cycle2}
              alt="Services bicycle"
              className="w-full h-full rounded-4xl shadow-lg border-2 border-gdarkGreen/20"
            />
          </div>
          <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
            <div className="inline-block bg-gdarkGreen/10 px-4 py-2 rounded-full mb-4">
              <span className="text-gdarkGreen font-semibold text-sm">
                What We Offer
              </span>
            </div>
            <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500] text-green">
              OUR SERVICES!
            </h1>
            <p className="text-[16px] mt-2 text-darkGrey leading-relaxed">
              From sales, to bike service, repairs, and expert advice, the team
              at The Bicycle Company are here across three locations for all
              your cycling needs. If you've got any questions, feedback, or want
              to get in touch with us, use the contact or chat buttons below to
              reach out!
            </p>
          </div>
        </header>
      </div>
    </div>
  );
};

export default About;
