const EarningsCard = ({ iconClass, bgColor, nodeType, earnings, nodeCount, assetCount, currencyMode }) => {
  return (
    <div className="grid grid-cols-2">
      {/* <div className="flex items-center w-full"> */}
      <div className="flex items-center justify-start">
        <div className={`rounded-full ${bgColor} p-2 text-white`}>
          <i className={iconClass}></i>
        </div>
        <div className="mx-2">{nodeType}</div>
      </div>
      <div className="grid text-center justify-center">
        <div>{earnings} {currencyMode}</div>
        {nodeCount && <div className="text-sm text-gray-400">Node Count: {nodeCount}</div>}
        {assetCount && <div className="text-sm text-gray-400">Asset Count: {assetCount}</div>}
      </div>
      {/* </div> */}
    </div>
  );
};

export default EarningsCard;