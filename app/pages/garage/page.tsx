import React from 'react'
import Image from 'next/image'

const garage = () => {
  return (
    <div className="p-4 ">
        <h2 className="text-4xl font-bold mb-2">My Garage</h2>
            <h3 className="p-4">2015 Subru BRZ Series.Blue</h3>
            <Image src="/car.jpg" alt="2015 Subaru BRZ Series.Blue" width={500} height={500}/>
    </div>
  )
}

export default garage
