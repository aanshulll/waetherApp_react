import React from 'react'
import { detailIcons } from '../utils/weatherUtils'

const { humidity: HumidityIcon, visibility: VisibilityIcon, uvIndex: UVIcon, windSpeed: WindIcon, dewPoint: DewIcon, pressure: PressureIcon } = detailIcons;

// Reusable detail row item: icon | label | value — all perfectly aligned via grid
function Item({ Icon, label, value }) {
  return (
    <div className='grid grid-cols-[20px_1fr_auto] items-center gap-3 w-full'>
      <Icon size={18} className='opacity-80' />
      <p className='text-sm text-white/70'>{label}</p>
      <p className='text-sm font-semibold text-right'>{value ?? '--'}</p>
    </div>
  );
}

function Details({ humidity, visibility, uvIndex, windSpeed, dewPoint, pressure }) {
  return (
    <div className='backdrop-blur-sm flex flex-col gap-6 px-8 py-10 w-full h-full '>

      {/* Tab header */}
      <div className="flex gap-8 w-full text-center border-b border-white/20 pb-3 justify-center text-sm">
        <span className='font-semibold text-white cursor-pointer'>Today's Forecast</span>
        <span className='text-white/50 cursor-pointer'>Hourly Forecast</span>
        <span className='text-white/50 cursor-pointer'>Daily Forecast</span>
      </div>

      {/* Two-column grid of detail items */}
      <div className='grid grid-cols-2 gap-x-10 gap-y-4 px-4'>
        <Item Icon={HumidityIcon}  label="Humidity"   value={humidity  !== undefined ? `${Math.round(humidity)}%`         : '--'} />
        <Item Icon={PressureIcon}  label="Pressure"   value={pressure  !== undefined ? `${Math.round(pressure)} hPa`      : '--'} />
        <Item Icon={VisibilityIcon} label="Visibility" value={visibility !== undefined ? `${Math.round(visibility)} km`    : '--'} />
        <Item Icon={WindIcon}      label="Wind"        value={windSpeed !== undefined ? `${Math.round(windSpeed)} km/h`    : '--'} />
        <Item Icon={UVIcon}        label="UV Index"    value={uvIndex   !== undefined ? uvIndex                            : '--'} />
        <Item Icon={DewIcon}       label="Dew Point"   value={dewPoint  !== undefined ? `${Math.round(dewPoint)}°C`        : '--'} />
      </div>

    </div>
  )
}

export default Details