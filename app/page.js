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

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url}, status: ${response.status}`);
  }
  return response.json();
}

async function getData() {
  try {
    const urls = [
      'https://explorer.runonflux.io/api/currency',
      'https://api.runonflux.io/daemon/getzelnodecount',
      'https://fluxnode.app.runonflux.io/api/v1/bench-version',
      'https://api.runonflux.io/daemon/getinfo',
      'https://explorer.runonflux.io/api/statistics/richest-addresses-list',
      'https://stats.runonflux.io/fluxinfo?projection=apps.runningapps.Image',
      'https://stats.runonflux.io/fluxinfo?projection=benchmark',
      'https://api.runonflux.io/daemon/viewdeterministiczelnodelist',
      'https://jetpackbridge.runonflux.io/api/v1/wordpress.php?action=COUNT',
      'https://stats.runonflux.io/fluxinfo?projection=apps.resources'
    ];

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
    ] = await Promise.all(urls.map(fetchData))
    return {
      fluxCurreny: fluxCurrenyResponse.data,
      nodeCount: nodeCountResponse,
      benchVersion: benchVersionResponse.data,
      daemonInfo: daemonInfoResponse.data,
      richestAddressList: richestAddressListResponse.data,
      fluxStats: fluxStatsResponse.data,
      benchmarkStats: benchmarkStatsResponse.data,
      deterministicNodes: deterministicNodesResponse.data,
      wordpressCount: wordpressCountResponse,
      resources: resourcesResponse
    };
  } catch (error) {
    console.log(error);
    // Consider handling the error more explicitly here
  }
}


function getUniquePaymentAddresses(nodes) {
  try {
    const uniquePaymentAddresses = new Set();
    nodes.forEach((item) => {
      uniquePaymentAddresses.add(item.payment_address);
    });
    const uniqueAddresses = Array.from(uniquePaymentAddresses).length;
    return uniqueAddresses;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

function getRunningApps(stats) {
  let totalRunning = 0;
  let streamrCount = 0;
  let presearchCount = 0;
  let watchtowerCount = 0;
  try {
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
  } catch (error) {
    console.log(error);
    return {
      presearch: 0,
      streamr: 0,
      total: 0,
    }
  }
}

function getFractusCount(nodes) {
  try {
    const thunderCount = nodes.filter((data) => data.benchmark.bench.thunder).length;
    return thunderCount;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

function getNodeCount(nodes) {
  try {
    const cumulusCount = nodes.data["cumulus-enabled"];
    const nimbusCount = nodes.data["nimbus-enabled"];
    const stratusCount = nodes.data["stratus-enabled"];
    return {
      cumulus: cumulusCount,
      nimbus: nimbusCount,
      stratus: stratusCount,
      fractus: 0,
    }
  } catch (error) {
    console.log(error);
    return {
      cumulus: 0,
      nimbus: 0,
      stratus: 0,
      fractus: 0,
    }
  }
}

function getEmptyNodes(nodes) {
  try {
    const emptyNodes = nodes.filter((data) => data.apps.resources.appsRamLocked === 0).length;
    return emptyNodes;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

function getUtilizedResources(nodes) {
  try {
    const utilizedCPU = nodes.data.reduce((acc, data) => acc + data.apps.resources.appsCpusLocked, 0)
    const utilizedRAM = nodes.data.reduce((acc, data) => acc + data.apps.resources.appsRamLocked, 0) / 1000;
    const utilizedStorage = nodes.data.reduce((acc, data) => acc + data.apps.resources.appsHddLocked, 0);
    return {
      utilizedCPU,
      utilizedRAM,
      utilizedStorage,
    }
  } catch (error) {
    console.log(error);
    return {
      utilizedCPU: 0,
      utilizedRAM: 0,
      utilizedStorage: 0,
    }
  }
}

function getAllResources(nodes) {
  let cores = 0;
  let ram = 0;
  let storage = 0;
  try {
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
  } catch (error) {
    console.log(error);
    return {
      cores: 0,
      ram: 0,
      storage: 0,
    }
  }
}

export default async function Home() {
  const data = await getData();
  const uniqueAddresses = getUniquePaymentAddresses(data.deterministicNodes);
  const runningApps = getRunningApps(data.fluxStats);
  const wordpressCount = data.wordpressCount;
  const nodesCount = getNodeCount(data.nodeCount);
  const fractusCount = getFractusCount(data.benchmarkStats);
  const allNodesCount = (nodesCount.cumulus + nodesCount.nimbus + nodesCount.stratus);
  const emptyNodes = getEmptyNodes(data.resources.data);
  const utilizedNodes = allNodesCount - emptyNodes;
  const utilizedNodesPercentage = ((utilizedNodes / allNodesCount) * 100).toFixed(2);
  const utilizedResources = getUtilizedResources(data.resources);
  const allResources = getAllResources(data.benchmarkStats);
  const utilizedCores = utilizedResources.utilizedCPU;
  const utilizedCoresPercentage = ((utilizedCores / allResources.cores) * 100).toFixed(2);
  const utilizedRAM = utilizedResources.utilizedRAM;
  const utilizedRAMPercentage = ((utilizedRAM / allResources.ram) * 100).toFixed(2);
  const utilizedStorage = utilizedResources.utilizedStorage;
  const utilizedStoragePercentage = ((utilizedStorage / allResources.storage) * 100).toFixed(2);
  let currentHeight = 0;
  try {
    currentHeight = data.daemonInfo.blocks
  } catch (error) {
    console.log(error);
    currentHeight = 0;
  }
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