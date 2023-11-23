import BigNumber from 'bignumber.js';
import Card from '@/components/Card';
import WalletIcon from '../../nodeIcons/wallet-sky.png';
import DollarIcon from '../../nodeIcons/dollar-sky.png';
import OtherWalletIcon from '../../nodeIcons/other-wallet-sky.png';
import CountDownTimer from '@/components/CountdownTimer';
import WalletCard from '@/components/WalletCard';
import { Duration } from 'luxon';

export const revalidate = 600;

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url}, status: ${response.status}`);
  }
  return response.json();
}

async function getData(wallet) {
  const urls = [
    `https://explorer.runonflux.io/api/addr/${wallet}?noTxList=1`,
    'https://explorer.runonflux.io/api/currency',
    `https://api.runonflux.io/daemon/viewdeterministiczelnodelist?filter=${wallet}`
  ];

  const [
    walletInfoResponse,
    fluxCurrenyResponse,
    nodesResponse
  ] = await Promise.all(urls.map(fetchData));

  return {
    walletInfo: walletInfoResponse,
    fluxCurreny: fluxCurrenyResponse.data,
    nodes: nodesResponse.data
  }
}

async function getBestUptimeNodeAndMostHosted(nodes) {
  const fetchPromises = nodes.map(node => {
    let url = `https://fluxnode.app.runonflux.io/api/v1/node-single/${node.ip}`;
    if (!node.ip.includes(":")) {
      url = `https://fluxnode.app.runonflux.io/api/v1/node-single/${node.ip}:16127`;
    }
    return fetch(url);
  });

  const responses = await Promise.all(fetchPromises);
  const jsonPromises = responses.map(response => response.json());
  const data = await Promise.all(jsonPromises);

  let res = {
    bestUptime: {
      uptimeSeconds: 0,
      node: null
    },
    mostHosted: {
      apps: 0,
      node: null
    }
  };

  data.forEach((nodeData, index) => {
    if (nodeData.node.results.uptime.data > res.bestUptime.uptimeSeconds) {
      res.bestUptime.uptimeSeconds = nodeData.node.results.uptime.data;
      res.bestUptime.node = nodes[index];
    }
    const apps = nodeData.node.results.apps.data.length;
    if (apps > res.mostHosted.apps) {
      res.mostHosted.apps = apps;
      res.mostHosted.node = nodes[index];
    }
  });

  return res;
}

async function getNextPayout(nodes) {
  const nextPayoutResponse = {
    nextPayout: 0,
    node: null
  }
  for (const node of nodes) {
    const currentRank = node.rank;
    const nextPayout = currentRank * 2;
    if (nextPayout < nextPayoutResponse.nextPayout || nextPayoutResponse.nextPayout === 0) {
      nextPayoutResponse.nextPayout = nextPayout;
      nextPayoutResponse.node = node;
    }
  }
  return nextPayoutResponse;
}

export default async function Wallet({ params }) {
  const data = await getData(params.id);
  const fluxPrice = data.fluxCurreny.rate;
  const walletBalance = data.walletInfo.balance;
  const walletBalanceUSD = new BigNumber(walletBalance).multipliedBy(new BigNumber(fluxPrice)).toFixed(2);
  const bestUptimeAndMostHosted = await getBestUptimeNodeAndMostHosted(data.nodes);
  const uptimeDuration = Duration.fromMillis(bestUptimeAndMostHosted.bestUptime.uptimeSeconds * 1000).shiftTo('days', 'hours', 'minutes', 'seconds');
  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };
  const uptimeInDays = `${padWithZero(uptimeDuration.days)}:${padWithZero(uptimeDuration.hours)}:${padWithZero(uptimeDuration.minutes)}:${padWithZero(uptimeDuration.seconds)}`;
  const nextPayout = await getNextPayout(data.nodes);
  return (
    <>
      <div className='my-5 grid justify-items-center'>
        <div className="grid w-2/3 gap-4 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 justify-items-center">
          <Card
            icon={DollarIcon}
            alt="Dollar icon"
            label="Flux Price"
            value={fluxPrice.toFixed(2)}
          />
          <Card
            icon={WalletIcon}
            alt="Wallet icon"
            label="Flux Amount"
            value={walletBalance.toFixed(2)}
          />
          <Card
            icon={OtherWalletIcon}
            alt="Other wallet icon"
            label="Wallet USD"
            value={walletBalanceUSD}
          />
        </div>
      </div >
      <div className='grid justify-items-center'>
        <div className='grid w-4/5 grid-cols-3 gap-4 justify-items-center'>
          <CountDownTimer
            nextPayoutDate={nextPayout.nextPayout}
            ip={nextPayout.node.ip}
          />
          <WalletCard
            label="Best Uptime"
            value={uptimeInDays}
            ip={bestUptimeAndMostHosted.bestUptime.node.ip}
          />
          <WalletCard
            label="Most Hosted Node"
            value={bestUptimeAndMostHosted.mostHosted.apps}
            nextToValue="apps"
            ip={bestUptimeAndMostHosted.mostHosted.node.ip}
          />
        </div>
      </div>
      <div className='mt-3 grid grid-cols-3 justify-items-center'>
        <div className='grid grid-cols-6 w-full bg-gray-900 py-2 rounded-md'>
          <h1 className='col-span-4 text-center text-sky-500 text-xl'>Estimated Earnings</h1>
          <button className='text-white hover:bg-sky-500 rounded-md border border-sky-500 mx-2'>
            Daily
          </button>
          <button className='text-white hover:bg-sky-500 rounded-md border border-sky-500 mx-2'>
            USD
          </button>
        </div>
      </div>
    </>
  );
}