import React from 'react'
import { Settings, Sunrise, Sun, Sunset } from 'lucide-react'

function Future({ morning, afternoon, evening }) {
  return (
    <div className='flex flex-col justify-around gap-8 p-12 backdrop-blur-xl w-full'>
      <div className="heading flex justify-between items-baseline">
        <h1>Today's</h1>
        <span><Settings /></span>
      </div>
      <div className="today flex gap-6 items-center justify-evenly">
        <div className="Morning flex flex-col gap-2 items-center  p-8 min-w-24">
          <Sunrise />
          <p className='text-sm'>Morning</p>
          <p className='text-xl'>{morning !== undefined ? `${Math.round(morning)} ° C` : '-- ° C'}</p>
        </div>
        <div className="Afternoon flex flex-col gap-2 items-center  p-8 min-w-24">
          <Sun />
          <p className='text-sm'>Afternoon</p>
          <p className='text-xl'>{afternoon !== undefined ? `${Math.round(afternoon)} ° C` : '-- ° C'}</p>
        </div>
        <div className="Evening flex flex-col gap-2 items-center  p-8 min-w-24">
          <Sunset />
          <p className='text-sm'>Evening</p>
          <p className='text-xl'>{evening !== undefined ? `${Math.round(evening)} ° C` : '-- ° C'}</p>
        </div>
      </div>
    </div>
  )
}

export default Future