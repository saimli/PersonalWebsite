'use client';
import Image from 'next/image';
import { scrollToSection } from '@/app/utils/scroll';


import { useEffect, useState } from 'react';
interface Data {
  // Define the data struct here for the db
  //_id: string;
  m: number;
  date: string;
  lc: number;
  rc: number;
  mc: number;
  ks: number;
  mm: number;
}

interface SumOfValues {
  day: string;
  lc: number;
  rc: number;
  mc: number;
  ks: number;
  mm: number;
  count: number;
}

export default function Home() {
  const [data, setData] = useState<Data[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch ('/slime-watcher');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Convert minutes since epoch to a Date object
        const formattedData = data.map((item: { m: number; }) => ({
          ...item,
          date: new Date(item.m * 60 * 1000).toISOString(), // Convert to ISO date
        }));

        setData(formattedData);

        //setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const calculateTotalsAndAverages = () => {
    const daysOfweek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const sumOfValues: SumOfValues[] = daysOfweek.map((day) => ({
      day,
      lc: 0,
      rc: 0,
      mc: 0,
      ks: 0,
      mm: 0,
      count: 0,
    }));

    const totals = {
      lc: 0,
      rc: 0,
      mc: 0,
      ks: 0,
      mm: 0,
      count: 0,
    };

    // Single pass to calculate both totals and sums for averages
    data.forEach((item) => {
      const day = new Date(item.date).getDay();
      sumOfValues[day].lc += item.lc;
      sumOfValues[day].rc += item.rc;
      sumOfValues[day].mc += item.mc;
      sumOfValues[day].ks += item.ks;
      sumOfValues[day].mm += item.mm;
      sumOfValues[day].count += 1;

      // Update totals
      totals.lc += item.lc;
      totals.rc += item.rc;
      totals.mc += item.mc;
      totals.ks += item.ks;
      totals.mm += item.mm;
      totals.count += 1;
    });

    // Calculate averages
    const averages = sumOfValues.map((sum) => ({
      ...sum,
      lc: sum.count ? Math.round(sum.lc / sum.count) : 0,
      rc: sum.count ? Math.round(sum.rc / sum.count) : 0,
      mc: sum.count ? Math.round(sum.mc / sum.count) : 0,
      ks: sum.count ? Math.round(sum.ks / sum.count) : 0,
      mm: sum.count ? Math.round(sum.mm / sum.count) : 0,
    }));

    return { totals, averages };
  };

  const { totals, averages } = calculateTotalsAndAverages();
  
  // Define your image paths here
  const imagePaths = [
    '/star1.jpg',
    '/star2.jpg',
    '/star3.jpg',
    '/star4.jpg',
  ];

  // Add this state and functions in your component
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = imagePaths.length; // Get the total number of images from the array

  const nextImage = () => {
    setCurrentImage((prev) => (prev === totalImages ? 1 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 1 ? totalImages : prev - 1));
  };

  return (
    <div>

      <section id="about" className="min-h-screen flex flex-col items-center justify-between p-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 font-raleway">Saim Ali</h1>
              <p className="text-lg sm:text-xl md:text-2xl" style={{color: 'var(--text-color-secondary)'}} >Aspiring software engineer at Reynolds & Reynolds from Houston, Texas</p>
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
                src="/bfSaim.jpg" 
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
          <p className="text-base sm:text-lg italic pb-8 justify-self-center flex" style={{color: 'var(--text-color-secondary)', opacity: 'var(--text-opacity)'}} >
          &quot;You either die a hero or live long enough to become the villain.&ldquo; -Saim Ali
          </p>
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-14">
        <div className="px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center font-raleway">PROJECTS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-center text-xl sm:text-5xl font-semibold text-[#00BFAE] py-6">Slime-Watcher</h3>
              <p className="text-sm sm:text-base text-gray-300">A Rust-based OS-level activity tracker that logs user input events in real-time.</p>
              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => scrollToSection('slimewatcher')}
                  className="bg-[#3F8E00] hover:bg-[#347400] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md w-fit text-base sm:text-lg transition-all duration-200 font-bold shadow-[0_0_15px_rgba(63,142,0,0.5)] hover:shadow-[0_0_20px_rgba(63,142,0,0.7)]"
                >What have I done TODAY? ›</button>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-center text-xl sm:text-5xl font-semibold text-[#00BFAE] py-6">Dash Depot</h3>
              <p className="text-sm sm:text-base text-gray-300">A full-stack e-commerce platform for athletic gear sales, featuring user authentication, inventory management, and secure transactions.</p>
              <div className="flex justify-center pt-8">
                <a href="https://github.com/saimli/PointOfSalesWebApp" target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#3F8E00] hover:bg-[#347400] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md w-fit text-base sm:text-lg transition-all duration-200 font-bold shadow-[0_0_15px_rgba(63,142,0,0.5)] hover:shadow-[0_0_20px_rgba(63,142,0,0.7)]">
                    View Code ›
                  </button>
                </a>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-center text-xl sm:text-5xl font-semibold text-[#00BFAE] py-6">POIMAGIC</h3>
              <p className="text-sm sm:text-base text-gray-300">A Python-based system for detecting and analyzing earthquake hotspots using machine learning.</p>
              <div className="flex justify-center pt-8">
                <a href="https://github.com/saimli/POIMAGIC-an-Early-Warning-Systems" target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#3F8E00] hover:bg-[#347400] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md w-fit text-base sm:text-lg transition-all duration-200 font-bold shadow-[0_0_15px_rgba(63,142,0,0.5)] hover:shadow-[0_0_20px_rgba(63,142,0,0.7)]">
                    View Report and Code ›
                  </button>
                </a>
              </div>
            </div>

          </div>


        </div>
      </section>


      {/* Decorative Separator 
      <div className="flex justify-center my-8 font-extrabold text-4xl">
        <span>. . .</span>
      </div>
*/}
      <section id="slimewatcher" className="min-h-screen py-14">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center font-raleway">Slime-Watcher</h2>

        <div className="flex container mx-auto px-4 py-8">
          <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex justify-around w-full'>
              <div className='text-center'>
                <div className='text-xs '>Left Clicks</div>
                <div className='font-bold text-xl'>{(totals.lc / 1000).toFixed(2)}k</div>
              </div>
              <div className='text-center'>
                <div className='text-xs'>Right Clicks</div>
                <div className='font-bold text-xl'>{(totals.rc / 1000).toFixed(2)}k</div>
              </div>
              <div className='text-center'>
                <div className='text-xs'>Middle Clicks</div>
                <div className='font-bold text-xl'>{totals.mc / 1000}k</div>
              </div>
              <div className='text-center'>
                <div className='text-xs'>Keypresses</div>
                <div className='font-bold text-xl'>{(totals.ks / 1000).toFixed(2)}k</div>
              </div>
              <div className='text-center'>
                <div className='text-xs'>Mouse Movement</div>
                <div className='font-bold text-xl'>{(totals.mm / 1000000).toFixed(2)}m feet</div>
              </div>
            </div>


            {/* TODO: Add a last 24 hour table showing activity spikes */}
            {/* <div className='text-sm mt-4'>past 24 hours</div> */}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Daily Averages</h2>

          {isLoading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {averages.length > 0 && (
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
              <table className="w-full border-collapse text-white">
                <thead className="text-[#00BFAE]">
                  <tr>
                    <th className="border px-4 py-2 text-center font-semibold">Day</th>
                    <th className="border px-4 py-2 text-center font-semibold">Left Clicks</th>
                    <th className="border px-4 py-2 text-center font-semibold">Right Clicks</th>
                    <th className="border px-4 py-2 text-center font-semibold">Middle Clicks</th>
                    <th className="border px-4 py-2 text-center font-semibold">Keypresses</th>
                    <th className="border px-4 py-2 text-center font-semibold">Mouse Movement</th>
                  </tr>
                </thead>
                <tbody>
                  {averages.map((avg) => (
                    <tr key={avg.day} className="bg-gray-800 hover:bg-[#00a58c5b] transition duration-300 ease-in-out">
                      <td className="border px-4 py-2 text-center text-[#00BFAE]">{avg.day}</td>
                      <td className="border px-4 py-2 text-center bg-gray-900 hover:bg-[#00a58c5b] transition duration-300 ease-in-out">{avg.lc}</td>
                      <td className="border px-4 py-2 text-center bg-gray-900 hover:bg-[#00a58c5b] transition duration-300 ease-in-out">{avg.rc}</td>
                      <td className="border px-4 py-2 text-center bg-gray-900 hover:bg-[#00a58c5b] transition duration-300 ease-in-out">{avg.mc}</td>
                      <td className="border px-4 py-2 text-center bg-gray-900 hover:bg-[#00a58c5b] transition duration-300 ease-in-out">{avg.ks}</td>
                      <td className="border px-4 py-2 text-center bg-gray-900 hover:bg-[#00a58c5b] transition duration-300 ease-in-out">{avg.mm} feet</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>


      {/* Decorative Separator 
      <div className="flex justify-center my-8 font-extrabold text-4xl">
        <span>. . .</span>
      </div>
*/}

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-14">
        <div className="px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center font-raleway">EXPERIENCE</h2>

          <div className="flex flex-col space-y-8">
            {/* Experience Item 1 */}
            <div className="flex flex-col md:flex-row items-center space-x-8">
            <div className="relative md:w-1/2 transition-transform transform hover:scale-105 flex items-center justify-center">
              <Image 
                src="/reyLogo.jpg" 
                alt="Reynolds & Reynolds" 
                width={500} 
                height={500} 
                className="rounded-lg shadow-lg transition-transform duration-300 object-cover w-full h-auto"
              />
            </div>
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#00BFAE]">Reynolds & Reynolds | Software Developer</h3>
                  <p className="text-sm sm:text-base text-gray-300">April 2023 - Present</p>
                </div>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-200 mt-2">
                  <li>Designed and implemented new features in C++, C#, .NET, and C, collaborating with cross-functional teams to
                  optimize performance, enhance responsiveness, and ensure scalability of dealership management applications.</li>
                  <li>Led the development and deployment of a high-performance camera application for automotive dealerships,
                  enabling 5,000+ daily barcode scans for VINs and vehicle images nationwide by utilizing C++, C#, UWP, and
                  external libraries to ensure seamless scanning and high usability across real-world diverse dealership operations.
                  </li>
                  <li>Enhanced mobile app framework to support additional devices and platforms, increasing scalability and
                  maintainability by refactoring core components using JavaScript, TypeScript, Node.js, AWS, and leveraging
                  cross-platform mobile development principles for both Android and iOS.</li>
                </ul>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="flex flex-col md:flex-row items-center space-x-8">
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#00BFAE]">Starship Technologies | Robotics Software Developer Intern</h3>
                  <p className="text-sm sm:text-base text-gray-300">January 2022 - May 2022</p>
                </div>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-200 mt-2">
                  <li>Contributed to the design, development, and optimization of autonomous delivery robots, improving their ability to
                  navigate complex environments and efficiently complete up to 500 daily deliveries on campus.</li>
                  <li>Collaborated with cross-functional teams to implement software solutions that reduced latency and enhanced robot
                  performance through real-time data monitoring and analysis.
                  </li>
                  <li>Optimized robot behavior by programming and testing autonomous navigation algorithms, achieving a 40%
                  improvement in daily order fulfillment and delivery times.</li>
                </ul>
              </div>
              <div className="relative md:w-1/2 transition-transform transform hover:scale-105 flex items-center justify-center">
                <Image 
                  src={imagePaths[currentImage - 1]} // Access the image using the current index
                  alt="Starship Technologies"
                  width={500} 
                  height={500} 
                  className="rounded-lg shadow-lg transition-transform duration-300 object-cover w-full h-auto"
                />
                <button 
                  onClick={prevImage} 
                  className=" transition-transform hover:scale-110 absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-[#00BFAE] p-2 rounded-full text-3xl"
                >
                  &lt;
                </button>
                <button 
                  onClick={nextImage} 
                  className="transition-transform hover:scale-110 absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-[#00BFAE] p-2 rounded-full text-3xl"
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* Experience Item 3 */}
            <div className="flex flex-col md:flex-row items-center space-x-8">
              <div className="relative md:w-1/2 transition-transform transform hover:scale-105 flex items-center justify-center">
                <Image 
                  src="/homeDepot.jpg" // Access the image for Home Depot
                  alt="Home Depot"
                  width={500} 
                  height={500} 
                  className="rounded-lg shadow-lg transition-transform duration-300 object-cover w-full h-auto"
                />
                {/* No carousel buttons for single image */}
              </div>
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#00BFAE]">Home Depot | Sales Associate</h3>
                  <p className="text-sm sm:text-base text-gray-300">November 2016 - April 2023</p>
                </div>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-200 mt-2">
                  <li>Engaged with 100+ customers daily in a fast-paced retail environment.</li>
                  <li>Collaborated with colleagues to address customer feedback and develop solutions.</li>
                  <li>Troubleshot and resolved technical issues with in-store devices.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Separator 
      <div className="flex justify-center my-8 font-extrabold text-4xl">
        <span className="text-gray-500">. . .</span>
      </div>
      */}

      {/* Decorative Separator 
      <div className="flex justify-center my-8 font-extrabold text-4xl">
        <span>. . .</span>
      </div>
      */}
      {/*
      <section id="garage" className="min-h-screen py-16">
      </section>
      */}

    </div>
  );
}