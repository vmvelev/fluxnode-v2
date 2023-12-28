import BigNumber from 'bignumber.js';
import Card from '@/components/Card';
import WalletIcon from '../../nodeIcons/wallet-sky.png';
import DollarIcon from '../../nodeIcons/dollar-sky.png';
import OtherWalletIcon from '../../nodeIcons/other-wallet-sky.png';
import CountDownTimer from '@/components/CountdownTimer';
import WalletCard from '@/components/WalletCard';
import { Duration } from 'luxon';
import EarningColumn from '@/components/EarningColumn';

const FLUX_API_BASE = 'https://api.runonflux.io';
const EXPLORER_API_BASE = 'https://explorer.runonflux.io/api';
const NODE_API_BASE = 'https://fluxnode.app.runonflux.io/api/v1';
export const revalidate = 600;

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url}, status: ${response.status}`);
  }
  return response.json();
}

async function getData(wallet) {
  const urls = [
    `${FLUX_API_BASE}/daemon/getzelnodecount`,
    `${EXPLORER_API_BASE}/addr/${wallet}?noTxList=1`,
    `${EXPLORER_API_BASE}/currency`,
    `${FLUX_API_BASE}/daemon/viewdeterministiczelnodelist?filter=${wallet}`
  ];

  const responses = await Promise.all(urls.map(fetchJSON));
  const [allNodesResponse, walletInfoResponse, fluxCurrenyResponse, nodesResponse] = responses;

  return {
    allNodesCount: allNodesResponse.data,
    walletInfo: walletInfoResponse,
    fluxCurreny: fluxCurrenyResponse.data,
    nodes: nodesResponse.data
  };
}

async function getBestUptimeNodeAndMostHosted(nodes) {
  const data = await Promise.all(nodes.map(async node => {
    const url = `${NODE_API_BASE}/node-single/${node.ip.includes(":") ? node.ip : `${node.ip}:16127`}`;
    return fetchJSON(url);
  }));

  let bestUptime = { uptimeSeconds: 0, node: null };
  let mostHosted = { apps: 0, node: null };

  data.forEach((nodeData, index) => {
    const uptime = nodeData.node.results.uptime.data;
    const apps = nodeData.node.results.apps.data.length;

    if (uptime > bestUptime.uptimeSeconds) {
      bestUptime = { uptimeSeconds: uptime, node: nodes[index] };
    }
    if (apps > mostHosted.apps) {
      mostHosted = { apps, node: nodes[index] };
    }
  });

  return { bestUptime, mostHosted };
}

async function getNextPayout(nodes) {
  const nextPayout = nodes.reduce((acc, node) => {
    const payout = node.rank * 2;
    return payout < acc.nextPayout || acc.nextPayout === 0 ? { nextPayout: payout, node } : acc;
  }, { nextPayout: 0, node: null });

  return nextPayout;
}

function calculateRewards(nodes, allNodes) {
  const blockReward = 37.5;
  let totalRewards = { dailyTotal: 0, monthlyTotal: 0 };
  let tierRewards = { cumulus: { daily: 0, monthly: 0 }, nimbus: { daily: 0, monthly: 0 }, stratus: { daily: 0, monthly: 0 } };

  const rewardCalculation = (tierEnabled, tierPercentage) => {
    const cycleDurationDays = (allNodes[tierEnabled] * 2) / 60 / 24;
    const rewardPerCycle = blockReward * tierPercentage;
    const dailyReward = rewardPerCycle / cycleDurationDays;
    return dailyReward * 30; // Monthly reward
  };

  nodes.forEach(node => {
    let monthlyReward = 0;
    if (node.tier === 'CUMULUS') monthlyReward = rewardCalculation('cumulus-enabled', 0.075);
    else if (node.tier === 'NIMBUS') monthlyReward = rewardCalculation('nimbus-enabled', 0.125);
    else if (node.tier === 'STRATUS') monthlyReward = rewardCalculation('stratus-enabled', 0.3);

    const dailyReward = monthlyReward / 30;
    totalRewards.dailyTotal += dailyReward;
    totalRewards.monthlyTotal += monthlyReward;

    const tierKey = node.tier.toLowerCase();
    tierRewards[tierKey].daily += dailyReward;
    tierRewards[tierKey].monthly += monthlyReward;
  });

  return { totalRewards, tierRewards };
}

export default async function Wallet({ params }) {
  const data = await getData(params.id);
  const { totalRewards, tierRewards } = calculateRewards(data.nodes, data.allNodesCount);
  const fluxPrice = data.fluxCurreny.rate;
  const walletBalance = new BigNumber(data.walletInfo.balance);
  const walletBalanceUSD = walletBalance.multipliedBy(new BigNumber(fluxPrice)).toFixed(2);

  const bestUptimeAndMostHosted = await getBestUptimeNodeAndMostHosted(data.nodes);
  const uptimeDuration = Duration.fromMillis(bestUptimeAndMostHosted.bestUptime.uptimeSeconds * 1000).shiftTo('days', 'hours', 'minutes', 'seconds');
  const formatDurationPart = (value) => value < 10 ? `0${value}` : value.toString();
  const days = formatDurationPart(uptimeDuration.days);
  const hours = formatDurationPart(uptimeDuration.hours);
  const minutes = formatDurationPart(uptimeDuration.minutes);
  const seconds = formatDurationPart(uptimeDuration.seconds);
  const uptimeInDays = `${days}:${hours}:${minutes}:${seconds}`;

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
            ip={bestUptimeAndMostHosted.mostHosted?.node?.ip}
          />
        </div>
      </div>
      <div className='mt-5 grid justify-items-center'>
        <div className='grid w-4/5 grid-cols-3 gap-4 justify-items-center'>
          <EarningColumn
            availableNodes={data.nodes}
            dailyTotal={totalRewards.dailyTotal}
            monthlyTotal={totalRewards.monthlyTotal}
            tierRewards={tierRewards}
            fluxPrice={fluxPrice}
          />
        </div>
      </div>
    </>
  );
}