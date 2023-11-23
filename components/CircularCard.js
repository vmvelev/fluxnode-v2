'use client';

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularCard = (props) => {
  return (
    <div className={`grid h-20 rounded-md bg-gray-900 text-$white w-full`}>
      <div className='grid grid-cols-2 items-center'>
        <div className="grid justify-center">
          <CircularProgressbar
            value={props.value}
            text={`${props.value}%`}
            className='h-[50px] w-[50px]'
          />
        </div>
        <div className='grid text-center'>
          <h1 className='text-3xl'>{props.value}%</h1>
          <h1 className='text-xs'>{props.label}</h1>
        </div>
      </div>
    </div>
  )
}

export default CircularCard;