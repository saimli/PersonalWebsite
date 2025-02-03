import React from 'react'

const experience = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">EXPERIENCE</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Reynolds & Reynolds | Software Developer</h3>
        <p className="text-sm text-gray-700">April 2023 – Present</p>
        <ul className="list-disc list-inside">
          <li>Developed and maintained dealership management applications using .NET, C++, C#, and C, ensuring reliable performance on client systems.</li>
          <li>Collaborated with cross-functional teams to enhance application features, optimize software performance, and improve user experience for automotive dealerships.</li>
          <li>Engaged in debugging, testing, and troubleshooting software issues to ensure seamless deployment and functionality across client PCs.</li>
          <li>Contributed to the design and implementation of new features and updates, focusing on scalability and ease of use for end users.</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Starship Technologies | Robotics Software Developer Intern</h3>
        <p className="text-sm text-gray-700">January 2022 – May 2022</p>
        <ul className="list-disc list-inside">
          <li>Collaborated on the development, maintenance, and troubleshooting of autonomous delivery robots, applying software solutions to optimize robotic performance in real-world conditions.</li>
          <li>Streamlined operational workflows and ensured scalability within a rapidly changing environment, utilizing robotics software and real-time data monitoring.</li>
          <li>Programmed, tested, and adjusted robot behavior to maximize daily order fulfillment, integrating feedback loops based on sales metrics and robot performance.</li>
          <li>Generated reports on robot efficiency, sales data, and operational challenges to inform decision-making by an international engineering and operations team.</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Home Depot | Sales Associate</h3>
        <p className="text-sm text-gray-700">November 2016 – April 2023</p>
        <ul className="list-disc list-inside">
          <li>Drove sales for a national company, engaging with 100+ customers daily in a fast-paced environment.</li>
          <li>Collaborated with colleagues from various backgrounds to address customer feedback and develop solutions, fostering an inclusive, positive workplace culture while maintaining high service standards.</li>
          <li>Supported team members by troubleshooting and resolving technical issues with in-store devices.</li>
        </ul>
      </div>
    </div>
  )
}

export default experience