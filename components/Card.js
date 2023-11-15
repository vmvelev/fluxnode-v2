import Image from 'next/image';
import React from 'react';

const Card = (props) => {
  return (
    <div className={'grid h-20 rounded-md bg-gray-900 text-white w-full'}>
      <div className='grid grid-cols-2 items-center'>
        <div className="grid justify-center">
          <Image
            src={props.icon}
            alt={props.alt}
            width={props.width} // Set the image width as needed
            height={props.height} // Set the image height as needed
          />
        </div>
        <div className='grid text-center'>
          <h1 className='text-3xl'>{props.value}</h1>
          <h1 className='text-xs'>{props.label}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
