
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { states } from '../assets/states';
import { Search } from 'lucide-react';

interface StateSelectorProps {
  onStateSelect: (stateId: string) => void;
  selectedState: string | null;
}

const StateSelector: React.FC<StateSelectorProps> = ({ onStateSelect, selectedState }) => {
  const { translate } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-1">
        {translate("Select Your State")}
      </label>
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder={translate("Search states...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
        {filteredStates.map((state) => (
          <button
            key={state.id}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              selectedState === state.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            onClick={() => onStateSelect(state.id)}
          >
            {state.name}
          </button>
        ))}
      </div>
      
      {filteredStates.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          {translate("No states found matching your search")}
        </div>
      )}
    </div>
  );
};

export default StateSelector;
