import React, { useState, useEffect } from 'react'

function Time() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = dateTime.toLocaleDateString([], {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className='backdrop-blur-2xl h-45 p-12 flex flex-col text-right font-semibold justify-center'>
      <h1 className='text-3xl uppercase'>{formattedTime}</h1>
      <h4 className='text-white/80'>{formattedDate}</h4>
    </div>
  )
}

export default Time