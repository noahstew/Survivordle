'use client';

import { useState } from 'react';
import { useReturnees } from '@/contexts/ReturneeContext';

interface Returnee {
  name: string;
  age: number;
  seasons: string;
  days_lasted: number;
  votes_against: number;
  img_url: string;
}

export default function SearchReturnee() {
  const { returnees, loading } = useReturnees();
  const [searchTerm, setSearchTerm] = useState('');

  // Debug: log first returnee to see data structure
  if (returnees.length > 0) {
    console.log('Sample returnee data:', returnees[0]);
  }

  const filteredReturnees =
    searchTerm.length >= 1
      ? returnees.filter((returnee) => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          const nameMatch = returnee.name
            .toLowerCase()
            .includes(lowerSearchTerm);
          const seasonMatch = returnee.seasons
            ?.toLowerCase()
            .includes(lowerSearchTerm);

          console.log(
            `Checking ${returnee.name}: seasons="${returnee.seasons}", match=${seasonMatch}`,
          );

          return nameMatch || seasonMatch;
        })
      : [];

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Search returnees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      />

      {searchTerm.length >= 1 && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredReturnees.length === 0 ? (
            <div className="1 text-gray-500">No results found</div>
          ) : (
            <ul>
              {filteredReturnees.map((returnee, index) => (
                <li
                  key={`${returnee.name}-${index}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={returnee.img_url}
                    alt={returnee.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{returnee.name}</p>
                    <p className="text-sm text-gray-600">{returnee.seasons}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
