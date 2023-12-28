'use client';

import { useMemo, useState } from 'react';
import EarningsCard from './EarningsCard';

const EarningColumn = ({ availableNodes, dailyTotal, monthlyTotal, fluxPrice, tierRewards }) => {
  const [currencyMode, setCurrencyMode] = useState('USD');
  const [dailyMode, setDailyMode] = useState("Daily");

  const toggleCurrencyMode = () => {
    setCurrencyMode(currencyMode === 'USD' ? 'FLUX' : 'USD');
  };

  const toggleDailyMode = () => {
    setDailyMode(dailyMode === 'Daily' ? 'Monthly' : 'Daily');
  };

  const nodeCounts = useMemo(() => {
    return availableNodes.reduce((acc, node) => {
      const tier = node.tier.toLowerCase();
      acc[tier] = (acc[tier] || 0) + 1;
      return acc;
    }, {});
  }, [availableNodes]);

  const renderEarningsCards = () => {
    const earningsInCurrentCurrency = (earnings) => {
      if (currencyMode === 'FLUX') {
        return (parseFloat(earnings) / parseFloat(fluxPrice)).toFixed(2);
      }
      return parseFloat(earnings).toFixed(2);
    };

    return Object.entries(nodeCounts).map(([tier, count]) => {
      const tierEarnings = tierRewards[tier];
      const earnings = dailyMode === 'Daily' ? tierEarnings.daily : tierEarnings.monthly;

      let bgColor, iconClass;
      switch (tier) {
        case 'cumulus':
          bgColor = 'bg-blue-600';
          iconClass = 'fas fa-bolt';
          break;
        case 'nimbus':
          bgColor = 'bg-yellow-600';
          iconClass = 'fas fa-cloud';
          break;
        case 'stratus':
          bgColor = 'bg-red-600';
          iconClass = 'fas fa-fire';
          break;
        default:
          bgColor = 'bg-gray-600';
          iconClass = 'fas fa-question';
      }

      return (
        <EarningsCard
          key={tier}
          iconClass={iconClass}
          bgColor={bgColor}
          nodeType={tier.charAt(0).toUpperCase() + tier.slice(1)}
          earnings={earningsInCurrentCurrency(earnings)}
          nodeCount={count.toString()}
          currencyMode={currencyMode}
        />
      );
    });
  };

  return (
    <div className='space-y-2 bg-gray-900 p-5 rounded-md'>
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
      {renderEarningsCards()}
    </div>
  );
};

export default EarningColumn;
