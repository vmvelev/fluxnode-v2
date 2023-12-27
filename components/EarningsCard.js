const EarningsCard = ({ iconClass, bgColor, nodeType, earnings, nodeCount, currencyMode }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div className={`rounded-full ${bgColor} p-2 text-white`}>
          <i className={iconClass}></i>
        </div>
        <div className="mx-4">{nodeType}</div>
      </div>
      <div>
        <div>{earnings} {currencyMode}</div>
        <div className="text-sm text-gray-400">Node Count: {nodeCount}</div>
      </div>
    </div>
  );
};

export default EarningsCard;