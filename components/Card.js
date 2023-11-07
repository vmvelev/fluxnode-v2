import Image from 'next/image';
import React from 'react';

const Card = (props) => {
  return (
    <div className={`grid h-20 rounded-md bg-${props.bgColor} text-${props.textColor} w-full`}>
      <div className='flex items-center justify-around'>
        <div className="mx-3">
          <Image
            src={props.icon}
            alt={props.alt}
            width={props.width} // Set the image width as needed
            height={props.height} // Set the image height as needed
          />
        </div>
        <div className='flex flex-col text-center mr-10'>
          <h1 className='text-3xl'>{props.value}</h1>
          <h1 className='text-xs'>{props.label}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
