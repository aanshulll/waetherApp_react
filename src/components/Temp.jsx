import React from 'react'
import { LocateIcon } from 'lucide-react'
import { getWeatherInfo } from '../utils/weatherUtils'

function Temp({ temperature, condition, city, state, country, onChangeLocation }) {
  const { label, Icon } = getWeatherInfo(condition);

  return (
    <div className='min-h-72 min-w-80 font-[Inter] backdrop-blur-lg flex flex-col gap-5 items-center p-12 font-bold'>
      <div className="temp flex justify-between gap-12 w-fit h-fit ">
        <h1 className='text-5xl'>
          {temperature !== undefined ? Math.round(temperature) : '--'} <span>° C</span>
        </h1>
        <div className="icon flex flex-col gap-2 items-center">
          <Icon size={28} />
          <p className='text-sm font-normal'>{label}</p>
        </div>
      </div>
      <div className="location">
        <h1 className='text-3xl'>{city || 'Loading...'}</h1>
        <h3>{[state, country].filter(Boolean).join(', ') || ''}</h3>
      </div>
      <div className="changeLoc flex justify-between gap-4">
        <LocateIcon />
        <button onClick={onChangeLocation}>Change Location</button>
      </div>
    </div>
  )
}

export default Temp