'use client';

import { useState } from 'react';
import EarningsCard from './EarningsCard';

const EarningColumn = ({ availableNodes }) => {
  const [currencyMode, setCurrencyMode] = useState('USD');
  const [dailyMode, setDailyMode] = useState("Daily");

  const toggleCurrencyMode = () => {
    setCurrencyMode(currencyMode === 'USD' ? 'FLUX' : 'USD');
  };

  const toggleDailyMode = () => {
    setDailyMode(dailyMode === 'Daily' ? 'Monthly' : 'Daily');
  };

  console.log(availableNodes);

  return (
    <div className='space-y-2'>
      <h1 className='col-span-4 text-center text-sky-500 text-xl'>Estimated Earnings</h1>
      <div className="mb-2 flex items-center justify-center w-full gap-5">
        <button
          className='border-b-2 border-sky-500 px-2 text-white hover:border-white'
          onClick={toggleDailyMode}
        >
          {dailyMode}
        </button>
        <button
          onClick={toggleCurrencyMode}
          className={'border-b-2 px-2 text-white border-sky-500 hover:border-white'}>
          {currencyMode}
        </button>
      </div>
      <EarningsCard
        iconClass="fas fa-bolt"
        bgColor="bg-blue-600"
        nodeType="Cumulus"
        earnings="0.89"
        nodeCount="3"
        currencyMode={currencyMode}
      />
      <EarningsCard
        iconClass="fas fa-cloud"
        bgColor="bg-yellow-600"
        nodeType="Nimbus"
        earnings="0"
        nodeCount="0"
        currencyMode={currencyMode}
      />
    </div>
  );
};

export default EarningColumn;
