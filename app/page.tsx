"use client";
import Image from "next/image";
import { scrollToSection } from '@/app/utils/scroll';

export default function Home() {
  return (
    <div>


      <section id="about" className="min-h-screen flex flex-col items-center justify-between p-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 font-raleway">Saim Ali</h1>
              <p className="text-[#9C9C9C] text-lg sm:text-xl md:text-2xl">Aspiring software engineer at Reynolds & Reynolds from Houston, Texas</p>
            </div>
          
            <div className="pt-8">
              <button 
                onClick={() => scrollToSection('slimewatcher')}
                className="bg-[#3F8E00] hover:bg-[#347400] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md w-fit text-base sm:text-lg transition-all duration-200 font-bold shadow-[0_0_15px_rgba(63,142,0,0.5)] hover:shadow-[0_0_20px_rgba(63,142,0,0.7)]"
              >What have I done TODAY? ›</button>
            </div>
          </div>

          {/* About content */}
          <div className="flex w-[625px] h-[625px] items-center justify-center">
            <div className="relative w-auto h-auto">
              <Image 
                src="/bitchSaim-modified.png" 
                alt="Saim Ali" 
                width={300} 
                height={300}
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Quote at bottom */}
        <div className="w-full mt-auto pt-8">
          <p className="text-white opacity-30 text-base sm:text-lg italic pb-8 justify-self-center flex">
            "You either die a hero or live long enough to become the villain." -Saim Ali
          </p>
        </div>
      </section>

      <section id="slimewatcher" className="min-h-screen">

      </section>


      {/* Experience Section */}
      <section id="experience" className="min-h-screen">
        <div className="pt-14 px-8 p-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 font-raleway">EXPERIENCE</h2>

          <div className="mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Reynolds & Reynolds | Software Developer</h3>
            <p className="text-xs sm:text-sm text-gray-700">April 2023 - Present</p>
            <ul className="list-disc list-inside text-sm sm:text-base">
              <li>Developed and maintained dealership management applications using .NET, C++, C#, and C, ensuring reliable performance on client systems.</li>
              <li>Collaborated with cross-functional teams to enhance application features, optimize software performance, and improve user experience for automotive dealerships.</li>
              <li>Engaged in debugging, testing, and troubleshooting software issues to ensure seamless deployment and functionality across client PCs.</li>
              <li>Contributed to the design and implementation of new features and updates, focusing on scalability and ease of use for end users.</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Starship Technologies | Robotics Software Developer Intern</h3>
            <p className="text-xs sm:text-sm text-gray-700">January 2022 - May 2022</p>
            <ul className="list-disc list-inside text-sm sm:text-base">
              <li>Collaborated on the development, maintenance, and troubleshooting of autonomous delivery robots, applying software solutions to optimize robotic performance in real-world conditions.</li>
              <li>Streamlined operational workflows and ensured scalability within a rapidly changing environment, utilizing robotics software and real-time data monitoring.</li>
              <li>Programmed, tested, and adjusted robot behavior to maximize daily order fulfillment, integrating feedback loops based on sales metrics and robot performance.</li>
              <li>Generated reports on robot efficiency, sales data, and operational challenges to inform decision-making by an international engineering and operations team.</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Home Depot | Sales Associate</h3>
            <p className="text-xs sm:text-sm text-gray-700">November 2016 - April 2023</p>
            <ul className="list-disc list-inside text-sm sm:text-base">
              <li>Drove sales for a national company, engaging with 100+ customers daily in a fast-paced environment.</li>
              <li>Collaborated with colleagues from various backgrounds to address customer feedback and develop solutions, fostering an inclusive, positive workplace culture while maintaining high service standards.</li>
              <li>Supported team members by troubleshooting and resolving technical issues with in-store devices.</li>
            </ul>
          </div>
        </div>
      </section>


      {/*
      <section id="garage" className="min-h-screen py-16">
      </section>
      */}

    </div>
  );
}
