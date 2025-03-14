import React from 'react';

const trendingData = [
  { id: 1, title: 'Parties' },
  { id: 2, title: 'Navratra' },
  { id: 3, title: 'Diwali function' },
  { id: 4, title: 'New year eve' },
  { id: 5, title: 'aarohan' },
  { id: 6, title: 'lakshya' },
];

const TrendingData = () => {
  const handleItemClick = (item) => {
    alert(`You clicked on ${item.title}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Trending Searches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendingData.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#7b2b41] text-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center h-24"
            onClick={() => handleItemClick(item)}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingData;
