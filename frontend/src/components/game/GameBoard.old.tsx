'use client';

import { useState } from 'react';
import GuessRow, { GuessResult, Returnee } from './GuessRow';

interface GameBoardProps {
  guesses: GuessResult[];
  returnees: Returnee[];
  onGuess: (returnee: Returnee) => void;
  onGiveUp: () => void;
  gameWon: boolean;
  loading: boolean;
}

export default function GameBoard({
  guesses,
  returnees,
  onGuess,
  onGiveUp,
  gameWon,
  loading,
}: GameBoardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReturnee, setSelectedReturnee] = useState<Returnee | null>(
    null,
  );

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
          return nameMatch || seasonMatch;
        })
      : [];

  const handleSelectReturnee = (returnee: Returnee) => {
    setSelectedReturnee(returnee);
    setSearchTerm('');
  };

  const handleGuess = () => {
    if (selectedReturnee && !gameWon) {
      onGuess(selectedReturnee);
      setSelectedReturnee(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Guesses Display */}
      <div className="mb-6">
        {guesses.length > 0 ? (
          <div className="space-y-2">
            {guesses.map((result, index) => (
              <GuessRow key={index} result={result} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Make your first guess!
          </div>
        )}
      </div>

      {/* Input Area */}
      {!gameWon && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search for a returnee:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type a name or season..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />

              {searchTerm.length >= 1 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredReturnees.length === 0 ? (
                    <div className="px-4 py-2 text-gray-500">
                      No results found
                    </div>
                  ) : (
                    <ul>
                      {filteredReturnees.map((returnee, index) => (
                        <li
                          key={`${returnee.name}-${index}`}
                          onClick={() => handleSelectReturnee(returnee)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                        >
                          <img
                            src={returnee.img_url}
                            alt={returnee.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{returnee.name}</p>
                            <p className="text-xs text-gray-600">
                              {returnee.seasons}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Selected Returnee Display */}
          {selectedReturnee && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
              <img
                src={selectedReturnee.img_url}
                alt={selectedReturnee.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{selectedReturnee.name}</p>
                <p className="text-sm text-gray-600">
                  {selectedReturnee.seasons}
                </p>
              </div>
              <button
                onClick={() => setSelectedReturnee(null)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleGuess}
              disabled={!selectedReturnee || gameWon}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Guess
            </button>
            <button
              onClick={onGiveUp}
              disabled={gameWon}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Give Up
            </button>
          </div>
        </div>
      )}

      {/* Game Won Message */}
      {gameWon && (
        <div className="text-center text-green-600 font-bold text-xl mt-4">
          🎉 You won! Click "Play Again" in the modal.
        </div>
      )}
    </div>
  );
}
