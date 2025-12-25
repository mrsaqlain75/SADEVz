import {
  FaEarthAmericas,
  FaHandHoldingHeart,
  FaRocket,
  FaCubes,
  FaUsers,
  FaRegLightbulb
} from "react-icons/fa6";

export default function WhyWeDoIt() {
  return (
    <section className="w-full font-sans bg-[#efefef] text-darkbg py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14 opacity-0 animate-[fadeInUp_0.8s_ease_forwards]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why We Do It?
          </h2>
          <p className="text-createcolor text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Skills should belong to everyone. SADEVZ exists to build digital solutions and share knowledge across the world.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {/* 1 */}
          <div className="group p-8 rounded-xl bg-white border border-createcolor/30
          transition-all duration-300 hover:border-bright hover:shadow-[0_0_18px_rgba(0,188,212,0.35)]
          opacity-0 animate-[fadeInUp_1s_ease_forwards]">
            <FaEarthAmericas className="text-bright text-4xl mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Skills Should Belong to Everyone</h3>
            <p className="text-darkbg/80 leading-relaxed">
              Technology shouldn’t be gated. We help people everywhere step confidently into the digital world.
            </p>
          </div>

          {/* 2 */}
          <div className="group p-8 rounded-xl bg-white border border-createcolor/30
          transition-all duration-300 hover:border-bright hover:shadow-[0_0_18px_rgba(0,188,212,0.35)]
          opacity-0 animate-[fadeInUp_1.1s_ease_forwards]">
            <FaRocket className="text-bright text-4xl mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Growth Comes from Building</h3>
            <p className="text-darkbg/80 leading-relaxed">
              Our courses are practical and project-based because creators learn best by building.
            </p>
          </div>

          {/* 3 */}
          <div className="group p-8 rounded-xl bg-white border border-createcolor/30
          transition-all duration-300 hover:border-bright hover:shadow-[0_0_18px_rgba(0,188,212,0.35)]
          opacity-0 animate-[fadeInUp_1.2s_ease_forwards]">
            <FaHandHoldingHeart className="text-bright text-4xl mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Local Talent, Global Doors</h3>
            <p className="text-darkbg/80 leading-relaxed">
              We strengthen foundations so learners can compete internationally with confidence.
            </p>
          </div>

          {/* 4 */}
          <div className="group p-8 rounded-xl bg-white border border-createcolor/30
          transition-all duration-300 hover:border-bright hover:shadow-[0_0_18px_rgba(0,188,212,0.35)]
          opacity-0 animate-[fadeInUp_1.3s_ease_forwards]">
            <FaCubes className="text-bright text-4xl mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Businesses Need Thoughtful Tech</h3>
            <p className="text-darkbg/80 leading-relaxed">
              We craft systems and products that help brands grow with clarity and precision.
            </p>
          </div>

          {/* 5 */}
          <div className="group p-8 rounded-xl bg-white border border-createcolor/30
          transition-all duration-300 hover:border-bright hover:shadow-[0_0_18px_rgba(0,188,212,0.35)]
          opacity-0 animate-[fadeInUp_1.4s_ease_forwards]">
            <FaUsers className="text-bright text-4xl mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Community Accelerates Growth</h3>
            <p className="text-darkbg/80 leading-relaxed">
              Learners, clients, and creators strengthen the CADF ecosystem together.
            </p>
          </div>

          {/* 6 */}
          <div className="group p-8 rounded-xl bg-white border border-createcolor/30
          transition-all duration-300 hover:border-bright hover:shadow-[0_0_18px_rgba(0,188,212,0.35)]
          opacity-0 animate-[fadeInUp_1.5s_ease_forwards]">
            <FaRegLightbulb className="text-bright text-4xl mb-4 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-xl font-semibold mb-2">Some Need Just One Chance</h3>
            <p className="text-darkbg/80 leading-relaxed">
              A single course, mentor, or project can transform a person’s entire path. We help create that spark.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
