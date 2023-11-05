// import Axios from 'axios';
// import { setupCache } from 'axios-cache-interceptor';

// const axios = setupCache(Axios);

// async function getData() {
//   const fluxCurreny = axios.get('https://explorer.runonflux.io/api/currency')
//   const nodeCount = axios.get('https://api.runonflux.io/daemon/getzelnodecount')
//   const benchVersion = axios.get('https://fluxnode.app.runonflux.io/api/v1/bench-version')
//   const daemonInfo = axios.get('https://api.runonflux.io/daemon/getinfo')
//   const richestAddressList = axios.get('https://explorer.runonflux.io/api/statistics/richest-addresses-list')
//   const fluxStats = axios.get('https://stats.runonflux.io/fluxinfo?projection=apps.runningapps.Image')
//   const deterministicNodes = axios.get('https://api.runonflux.io/daemon/viewdeterministiczelnodelist')
//   const wordpressCount = axios.get('https://jetpackbridge.runonflux.io/api/v1/wordpress.php?action=COUNT')
//   const resources = axios.get('https://stats.runonflux.io/fluxinfo?projection=apps.resources')

//   const [
//     fluxCurrenyResponse,
//     nodeCountResponse,
//     benchVersionResponse,
//     daemonInfoResponse,
//     richestAddressListResponse,
//     fluxStatsResponse,
//     deterministicNodesResponse,
//     wordpressCountResponse,
//     resourcesResponse
//   ] = await Promise.all(
//     [
//       fluxCurreny,
//       nodeCount,
//       benchVersion,
//       daemonInfo,
//       richestAddressList,
//       fluxStats,
//       deterministicNodes,
//       wordpressCount,
//       resources
//     ]
//   );

//   return {
//     fluxCurreny: fluxCurrenyResponse.data,
//     nodeCount: nodeCountResponse.data,
//     benchVersion: benchVersionResponse.data,
//     daemonInfo: daemonInfoResponse.data,
//     richestAddressList: richestAddressListResponse.data,
//     fluxStats: fluxStatsResponse.data,
//     deterministicNodes: deterministicNodesResponse.data,
//     wordpressCount: wordpressCountResponse.data,
//     resources: resourcesResponse.data
//   };
// }

// function getUniquePaymentAddresses(nodes) {
//   const uniquePaymentAddresses = new Set();
//   nodes.forEach((item) => {
//     uniquePaymentAddresses.add(item.payment_address);
//   });
//   const uniqueAddresses = Array.from(uniquePaymentAddresses).length;
//   return uniqueAddresses;
// }

// function getRunningApps(stats) {
//   let totalRunning = 0;
//   let streamrCount = 0;
//   let presearchCount = 0;
//   let watchtowerCount = 0;

//   for (const stat of stats) {
//     totalRunning += stat.apps.runningapps.length;
//     for (const image of stat.apps.runningapps) {
//       if (image.Image === "presearch/node:latest") {
//         presearchCount++;
//       }
//       if (image.Image === "streamr/broker-node:latest") {
//         streamrCount++;
//       }
//       if (image.Image === "containrrr/watchtower:latest") {
//         watchtowerCount++;
//       }
//     }
//   }
//   const finalTotalRunning = totalRunning - watchtowerCount;
//   return {
//     presearch: presearchCount,
//     streamr: streamrCount,
//     total: finalTotalRunning,
//   }
// }

// function getNodeCount(nodes) {
//   const cumulusCount = nodes.data["cumulus-enabled"];
//   const nimbusCount = nodes.data["nimbus-enabled"];
//   const stratusCount = nodes.data["stratus-enabled"];
//   return {
//     cumulus: cumulusCount,
//     nimbus: nimbusCount,
//     stratus: stratusCount,
//   }
// }

// function getEmptyNodes(nodes) {
//   const emptyNodes = nodes.filter((data) => data.apps.resources.appsRamLocked === 0).length;
//   return emptyNodes;
// }

// function getUtilizedResources(nodes) {
//   const utilizedCPU = nodes.reduce((acc, data) => acc + data.apps.resources.appsCpusLocked, 0)
//   const utilizedRAM = nodes.reduce((acc, data) => acc + data.apps.resources.appsRamLocked, 0) / 1000000;
//   const utilizedStorage = nodes.reduce((acc, data) => acc + data.apps.resources.appsHddLocked, 0) / 1000;
//   return {
//     utilizedCPU,
//     utilizedRAM,
//     utilizedStorage,
//   }
// }

// export default async function Test() {
//   const data = await getData();
//   const uniqueAddresses = getUniquePaymentAddresses(data.deterministicNodes.data);
//   const runningApps = getRunningApps(data.fluxStats.data);
//   const wordpressCount = data.wordpressCount;
//   const nodesCount = getNodeCount(data.nodeCount);
//   const allNodesCount = (nodesCount.cumulus + nodesCount.nimbus + nodesCount.stratus);
//   const emptyNodes = getEmptyNodes(data.resources.data);
//   const utilizedNodes = allNodesCount - emptyNodes;
//   const utilizedNodesPercentage = (utilizedNodes / allNodesCount) * 100;
//   const utilizedResources = getUtilizedResources(data.resources.data);
//   const currentHeight = data.daemonInfo.data.blocks
//   return (
//     <div>
//       <h1>Unique addresses - {uniqueAddresses}</h1>
//       <h1>Presearch nodes - {runningApps.presearch}</h1>
//       <h1>Streamr nodes - {runningApps.streamr}</h1>
//       <h1>Total running - {runningApps.total}</h1>
//       <h1>Wordpress - {wordpressCount}</h1>
//       <h1>Cumulus nodes - {nodesCount.cumulus}</h1>
//       <h1>Nimbus nodes - {nodesCount.nimbus}</h1>
//       <h1>Stratus nodes - {nodesCount.stratus}</h1>
//       <h1>Utilized nodes {utilizedNodes}</h1>
//       <h1>Percentage utilized nodes - {utilizedNodesPercentage}</h1>
//       <h1>Utilized CPUs - {utilizedResources.utilizedCPU}</h1>
//       <h1>Utilizied RAM - {utilizedResources.utilizedRAM} TB</h1>
//       <h1>Utilized Storage - {utilizedResources.utilizedStorage} TB</h1>
//       <h1>Current block height - {currentHeight}</h1>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
    </div>
  )
}