'use client';

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

const CountDownTimer = (props) => {
  const [countdown, setCountdown] = useState('');
  const nextPayoutDate = props.nextPayoutDate;

  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  useEffect(() => {
    const futureDateTime = DateTime.now().plus({ minutes: nextPayoutDate });
    const updateCountdown = () => {
      const now = DateTime.now();
      const diff = futureDateTime.diff(now, ['days', 'hours', 'minutes', 'seconds']);
      if (diff.toMillis() > 0) {
        const formattedCountdown = `${padWithZero(diff.days)}:${padWithZero(diff.hours)}:${padWithZero(diff.minutes)}:${padWithZero(parseInt(diff.seconds))}`;
        setCountdown(formattedCountdown);
      } else {
        setCountdown('00:00:00:00');
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [nextPayoutDate]);
  return (
    <div className='grid h-24 rounded-md bg-gray-900 text-white w-full'>
      <div className='grid text-center'>
        <h1 className='text-xl mt-1 text-sky-500'>Next Payout</h1>
        <h1 className='text-3xl'>{countdown}</h1>
        <h1 className='text-xs mb-1 text-gray-600'>{props.ip}</h1>
      </div>
    </div>
  );
}

export default CountDownTimer;