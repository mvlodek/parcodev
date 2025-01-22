import React, { useState } from 'react';


const TSPDashboard = () => {
  const [selectedFund, setSelectedFund] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [activeView, setActiveView] = useState('tsp');
  
  const tspFunds = [
    {
      id: 'c-fund',
      name: 'C Fund',
      value: 70000,
      color: '#0671AD',
      textColor: 'text-white',
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years'
    },
    {
      id: 'g-fund',
      name: 'G Fund',
      value: 85000,
      color: '#495057',
      textColor: 'text-white',
      riskLevel: 3,
      examples: ['Government Securities', 'Treasury Bonds', 'Federal Notes'],
      description: 'Low risk government securities, provides stable but modest returns'
    },
    {
      id: 'i-fund',
      name: 'I Fund',
      value: 54000,
      color: '#ADC5E3',
      textColor: 'text-white',
      riskLevel: 8,
      examples: ['International Stocks', 'Global Markets', 'Foreign Companies'],
      description: 'International exposure, affected by global market conditions and currency exchange rates'
    },
    {
      id: 'y-fund',
      name: 'Y Fund',
      value: 45000,
      color: '#344767',
      textColor: 'text-white',
      riskLevel: 7,
      examples: ['Lifecycle Funds', 'Target Date', 'Balanced Portfolio'],
      description: 'Lifecycle fund that automatically adjusts risk over time'
    },
    {
      id: 's-fund',
      name: 'S Fund',
      value: 62000,
      color: '#262627',
      textColor: 'text-white',
      riskLevel: 9,
      examples: ['Small Cap Stocks', 'Mid Cap Stocks', 'Growth Companies'],
      description: 'Small and medium-sized U.S. companies, higher growth potential with higher risk'
    },
    {
      id: 'f-fund',
      name: 'F Fund',
      value: 48000,
      color: '#21B8FD',
      textColor: 'text-white',
      riskLevel: 5,
      examples: ['Corporate Bonds', 'Municipal Bonds', 'Fixed Income'],
      description: 'Fixed income investments, moderate risk with steady returns'
    }
  ];

  const lookThroughFunds = [
    {
      id: 'c-fund',
      name: 'C Fund',
      value: 70000,
      color: '#0671AD',
      textColor: 'text-white',
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years'
    },
    {
      id: 'g-fund',
      name: 'G Fund',
      value: 85000,
      color: '#495057',
      textColor: 'text-white',
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years'
    },
    {
      id: 'i-fund',
      name: 'I Fund',
      value: 54000,
      color: '#ADC5E3',
      textColor: 'text-white',
      riskLevel: 10,
      examples: ['Apple', 'Google', 'Microsoft', 'Meta', 'Tesla'],
      description: 'Very volatile, will reap the most rewards from good years and the worst losses of bad years'
    }
  ];

  const funds = activeView === 'tsp' ? tspFunds : lookThroughFunds;
  const totalValue = funds.reduce((sum, fund) => sum + fund.value, 0);

  // Calculate SVG donut chart parameters
  const size = 300; // Increased from 250
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Calculate start and end angles for each section
  let currentAngle = 0;
  const sections = funds.map(fund => {
    const percentage = fund.value / totalValue;
    const angle = 2 * Math.PI * percentage;
    const section = {
      ...fund,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      percentage
    };
    currentAngle += angle;
    return section;
  });

  // Function to create SVG arc path
  const createArc = (startAngle, endAngle) => {
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-8">
      {/* Header */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 p-2">
          <button
            onClick={() => setActiveView('tsp')}
            className={`px-5 py-4 rounded-lg transition-colors ${
              activeView === 'tsp'
                ? 'bg-blue-50 text-gray-700'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg font-semibold">TSP Holdings</span>
          </button>
          <button
            onClick={() => setActiveView('lookthrough')}
            className={`px-5 py-4 rounded-full transition-colors ${
              activeView === 'lookthrough'
                ? 'bg-blue-50 text-gray-700'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg font-semibold">Look Through Holdings</span>
          </button>
        </div>
        
        {/* Donut Chart - Increased container size */}
        <div className="relative w-80 h-80">
          <svg width={size} height={size} className="transform -rotate-90">
            {sections.map((section, index) => (
              <path
                key={section.id}
                d={createArc(section.startAngle, section.endAngle)}
                stroke={section.color}
                strokeWidth={strokeWidth}
                fill="none"
                className="transition-all duration-200"
                style={{
                  strokeWidth: hoveredSection === section.id ? strokeWidth + 5 : strokeWidth
                }}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              />
            ))}
          </svg>
          {/* Center Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-lg font-semibold text-gray-600 mb-2">
              {hoveredSection 
                ? funds.find(f => f.id === hoveredSection)?.name 
                : 'TSP Total'}
            </div>
            <div className="text-3xl font-semibold text-gray-700">
              ${(hoveredSection 
                ? funds.find(f => f.id === hoveredSection)?.value 
                : totalValue).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Funds List */}
      <div className="w-full">
        <div className="px-10 flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-gray-400">Items</span>
          <span className="text-lg font-semibold text-gray-400">Total Value</span>
        </div>
        
        <div className="border-t border-gray-200">
          {funds.map((fund) => (
            <div key={fund.id} className="border-b border-gray-200">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedFund(selectedFund === fund.id ? null : fund.id)}
              >
                <div 
                  className={`px-3 py-2 rounded-lg text-white`}
                  style={{ backgroundColor: fund.color }}
                >
                  {fund.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">${fund.value.toLocaleString()}</span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg 
                      className={`w-4 h-4 transform transition-transform ${selectedFund === fund.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details */}
              {selectedFund === fund.id && (
                <div className="p-4 mx-5 mb-4 border rounded-lg bg-gray-50">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Level</span>
                      <span className="text-gray-600">{fund.riskLevel}</span>
                    </div>
                    <div className="border-t border-gray-100" />
                    <div className="flex justify-between">
                      <span className="text-gray-400">Examples</span>
                      <span className="text-gray-600">{fund.examples.join(', ')}</span>
                    </div>
                    <div className="border-t border-gray-100" />
                    <div className="flex justify-between">
                      <span className="text-gray-400">Description</span>
                      <span className="text-gray-600">{fund.description}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TSPDashboard;