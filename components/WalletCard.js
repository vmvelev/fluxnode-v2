import React from 'react';

const WalletCard = (props) => {
  return (
    <div className={'grid h-24 rounded-md bg-gray-900 text-white w-full'}>
      <div className='grid text-center'>
        <h1 className='text-xl mt-1 text-sky-500'>{props.label}</h1>
        <div className='flex justify-center'>
          <h1 className='text-3xl'>{props.value}</h1>
          <h1 className='text-xs text-gray-500'>{props.nextToValue}</h1>
        </div>
        <h1 className='text-xs mb-1 text-gray-600'>{props.ip}</h1>
      </div>
    </div>
  );
};

export default WalletCard;
