import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import WalletIcon from './nodeIcons/wallet-sky.png';
import ComputerIcon from './nodeIcons/computer-sky.png';
import SearchIcon from './nodeIcons/search-sky.png';
import StreamIcon from './nodeIcons/stream-sky.png';
import WordpressIcon from './nodeIcons/wordpress-sky.png';
import StorageIcon from './nodeIcons/storage-sky.png';
import RenewableIcon from './nodeIcons/renewable-sky.png';
import MotherboardIcon from './nodeIcons/motherboard-sky.png';
import UnpackingIcon from './nodeIcons/unpacking-sky.png';
import BlockchainIcon from './nodeIcons/blockchain-sky.png';
import Card from '@/components/Card';
import CircularCard from '@/components/CircularCard';
import SearchHome from '@/components/SearchHome';

const axios = setupCache(Axios);

async function getData() {
  const fluxCurreny = axios.get('https://explorer.runonflux.io/api/currency')
  const nodeCount = axios.get('https://api.runonflux.io/daemon/getzelnodecount')
  const benchVersion = axios.get('https://fluxnode.app.runonflux.io/api/v1/bench-version')
  const daemonInfo = axios.get('https://api.runonflux.io/daemon/getinfo')
  const richestAddressList = axios.get('https://explorer.runonflux.io/api/statistics/richest-addresses-list')
  const fluxStats = axios.get('https://stats.runonflux.io/fluxinfo?projection=apps.runningapps.Image')
  const benchmarkStats = axios.get('https://stats.runonflux.io/fluxinfo?projection=benchmark')
  const deterministicNodes = axios.get('https://api.runonflux.io/daemon/viewdeterministiczelnodelist')
  const wordpressCount = axios.get('https://jetpackbridge.runonflux.io/api/v1/wordpress.php?action=COUNT')
  const resources = axios.get('https://stats.runonflux.io/fluxinfo?projection=apps.resources')

  const [
    fluxCurrenyResponse,
    nodeCountResponse,
    benchVersionResponse,
    daemonInfoResponse,
    richestAddressListResponse,
    fluxStatsResponse,
    benchmarkStatsResponse,
    deterministicNodesResponse,
    wordpressCountResponse,
    resourcesResponse
  ] = await Promise.all(
    [
      fluxCurreny,
      nodeCount,
      benchVersion,
      daemonInfo,
      richestAddressList,
      fluxStats,
      benchmarkStats,
      deterministicNodes,
      wordpressCount,
      resources
    ]
  );

  return {
    fluxCurreny: fluxCurrenyResponse.data,
    nodeCount: nodeCountResponse.data,
    benchVersion: benchVersionResponse.data,
    daemonInfo: daemonInfoResponse.data,
    richestAddressList: richestAddressListResponse.data,
    fluxStats: fluxStatsResponse.data,
    benchmarkStats: benchmarkStatsResponse.data,
    deterministicNodes: deterministicNodesResponse.data,
    wordpressCount: wordpressCountResponse.data,
    resources: resourcesResponse.data
  };
}

function getUniquePaymentAddresses(nodes) {
  const uniquePaymentAddresses = new Set();
  nodes.forEach((item) => {
    uniquePaymentAddresses.add(item.payment_address);
  });
  const uniqueAddresses = Array.from(uniquePaymentAddresses).length;
  return uniqueAddresses;
}

function getRunningApps(stats) {
  let totalRunning = 0;
  let streamrCount = 0;
  let presearchCount = 0;
  let watchtowerCount = 0;

  for (const stat of stats) {
    totalRunning += stat.apps.runningapps.length;
    for (const image of stat.apps.runningapps) {
      if (image.Image === "presearch/node:latest") {
        presearchCount++;
      }
      if (image.Image === "streamr/broker-node:latest") {
        streamrCount++;
      }
      if (image.Image === "containrrr/watchtower:latest") {
        watchtowerCount++;
      }
    }
  }
  const finalTotalRunning = totalRunning - watchtowerCount;
  return {
    presearch: presearchCount,
    streamr: streamrCount,
    total: finalTotalRunning,
  }
}

function getFractusCount(nodes) {
  const thunderCount = nodes.filter((data) => data.benchmark.bench.thunder).length;
  return thunderCount;
}

function getNodeCount(nodes) {
  const cumulusCount = nodes.data["cumulus-enabled"];
  const nimbusCount = nodes.data["nimbus-enabled"];
  const stratusCount = nodes.data["stratus-enabled"];
  return {
    cumulus: cumulusCount,
    nimbus: nimbusCount,
    stratus: stratusCount,
    fractus: 0,
  }
}

function getEmptyNodes(nodes) {
  const emptyNodes = nodes.filter((data) => data.apps.resources.appsRamLocked === 0).length;
  return emptyNodes;
}

function getUtilizedResources(nodes) {
  const utilizedCPU = nodes.reduce((acc, data) => acc + data.apps.resources.appsCpusLocked, 0)
  const utilizedRAM = nodes.reduce((acc, data) => acc + data.apps.resources.appsRamLocked, 0) / 1000;
  const utilizedStorage = nodes.reduce((acc, data) => acc + data.apps.resources.appsHddLocked, 0);
  return {
    utilizedCPU,
    utilizedRAM,
    utilizedStorage,
  }
}

function getAllResources(nodes) {
  let cores = 0;
  let ram = 0;
  let storage = 0;
  for (const node of nodes) {
    cores += node.benchmark.bench.cores;
    ram += node.benchmark.bench.ram;
    storage += node.benchmark.bench.ssd;
  }
  return {
    cores,
    ram,
    storage,
  };
}

export default async function Home() {
  const data = await getData();
  const uniqueAddresses = getUniquePaymentAddresses(data.deterministicNodes.data);
  const runningApps = getRunningApps(data.fluxStats.data);
  const wordpressCount = data.wordpressCount;
  const nodesCount = getNodeCount(data.nodeCount);
  const fractusCount = getFractusCount(data.benchmarkStats.data);
  const allNodesCount = (nodesCount.cumulus + nodesCount.nimbus + nodesCount.stratus);
  const emptyNodes = getEmptyNodes(data.resources.data);
  const utilizedNodes = allNodesCount - emptyNodes;
  const utilizedNodesPercentage = ((utilizedNodes / allNodesCount) * 100).toFixed(2);
  const utilizedResources = getUtilizedResources(data.resources.data);
  const allResources = getAllResources(data.benchmarkStats.data);
  const utilizedCores = utilizedResources.utilizedCPU;
  const utilizedCoresPercentage = ((utilizedCores / allResources.cores) * 100).toFixed(2);
  const utilizedRAM = utilizedResources.utilizedRAM;
  const utilizedRAMPercentage = ((utilizedRAM / allResources.ram) * 100).toFixed(2);
  const utilizedStorage = utilizedResources.utilizedStorage;
  const utilizedStoragePercentage = ((utilizedStorage / allResources.storage) * 100).toFixed(2);
  const currentHeight = data.daemonInfo.data.blocks
  return (
    <>
      <SearchHome />
      <div className='py-7'>
        <div className='grid lg:grid-rows-2 mx-10'>
          <div className="grid gap-2 sm:mt-2 lg:mt-4 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-2 justify-items-center">
            <Card
              icon={WalletIcon}
              alt="Wallet icon"
              width={50}
              height={50}
              label='Unique Wallets'
              value={uniqueAddresses}
            />
            <Card
              icon={ComputerIcon}
              alt="Computer icon"
              width={50}
              height={50}
              label='Utilized Instances'
              value={runningApps.total}
            />
            <Card
              icon={SearchIcon}
              alt="Search icon"
              width={50}
              height={50}
              label='Presearch Running Apps'
              value={runningApps.presearch}
            />
            <Card
              icon={StreamIcon}
              alt="Stream icon"
              width={50}
              height={50}
              label='Streamr Running Apps'
              value={runningApps.streamr}
            />
            <Card
              icon={WordpressIcon}
              alt="Wordpress icon"
              width={50}
              height={50}
              label='Wordpress Instances'
              value={wordpressCount}
            />
          </div >
          <div className="grid gap-2 sm:mt-2 lg:mt-4 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-2 justify-items-center">
            <Card
              icon={StorageIcon}
              alt="Storage icon"
              width={50}
              height={50}
              label='Fractus'
              value={fractusCount}
            />
            <Card
              icon={RenewableIcon}
              alt="Renewable icon"
              width={50}
              height={50}
              label='Cumulus Nodes'
              value={nodesCount.cumulus}
            />
            <Card
              icon={MotherboardIcon}
              alt="Motherboard icon"
              width={50}
              height={50}
              label='Nimbus Nodes'
              value={nodesCount.nimbus}
            />
            <Card
              icon={UnpackingIcon}
              alt="Unpacking icon"
              width={50}
              height={50}
              label='Stratus Nodes'
              value={nodesCount.stratus}
            />
            <Card
              icon={BlockchainIcon}
              alt="Blockchain icon"
              width={50}
              height={50}
              label='Current Block Height'
              value={currentHeight}
            />
          </div>
          <div className="grid gap-2 sm:mt-2 lg:mt-4 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-2 justify-items-center">
            <CircularCard
              label='Node Utilisation'
              value={utilizedNodesPercentage}
            />
            <CircularCard
              label='CPU Utilisation'
              value={utilizedCoresPercentage}
            />
            <CircularCard
              label='RAM Utilisation'
              value={utilizedRAMPercentage}
            />
            <CircularCard
              label='Storage Utilisation'
              value={utilizedStoragePercentage}
            />
          </div>
        </div>
      </div >
    </>
  )
}