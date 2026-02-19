'use client';

import React, { useState } from 'react';
import GuessRow, { GuessResult, Returnee } from './GuessRow';

interface GameBoardProps {
  guesses: GuessResult[];
  returnees: Returnee[];
  onGuess: (returnee: Returnee) => void;
  onGiveUp: () => void;
  onPlayAgain: () => void;
  gameWon: boolean;
  loading: boolean;
}

export default function GameBoard({
  guesses,
  returnees,
  onGuess,
  onGiveUp,
  onPlayAgain,
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
    <div className="w-full max-w-6xl mx-auto">
      {/* Play Again Button */}
      {gameWon && (
        <div className="text-center mb-6">
          <button
            onClick={onPlayAgain}
            className="bg-survivor-green hover:bg-survivor-green-dark text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-lg text-lg"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Input Area - Now First */}
      {!gameWon && (
        <div
          className="p-4 md:p-6 rounded-lg shadow-xl border-3 mb-6"
          style={{
            background: 'linear-gradient(to bottom, #f4e4c1 0%, #e8d4a8 100%)',
            border: '3px solid #8B7355',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          <h2
            className="text-center font-survivant text-3xl md:text-4xl mb-6 text-gray-800"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
          >
            Cast Your Vote
          </h2>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a name or season..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border-2 border-survivor-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-survivor-green focus:border-transparent"
                disabled={loading}
              />

              {searchTerm.length >= 1 && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-survivor-sand rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
                          className="flex items-center gap-3 px-4 py-2 hover:bg-survivor-sand-light cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors"
                        >
                          <img
                            src={returnee.img_url}
                            alt={returnee.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {returnee.name}
                            </p>
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
            <div className="mb-4 p-3 bg-white border-2 border-survivor-sand rounded-lg flex items-center gap-3 shadow-sm">
              <img
                src={selectedReturnee.img_url}
                alt={selectedReturnee.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {selectedReturnee.name}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedReturnee.seasons}
                </p>
              </div>
              <button
                onClick={() => setSelectedReturnee(null)}
                className="text-survivor-orange hover:text-red-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 flex-col md:flex-row">
            <button
              onClick={handleGuess}
              disabled={!selectedReturnee || gameWon}
              className="flex-1 bg-survivor-green hover:bg-survivor-green-dark disabled:bg-survivor-green disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              Guess
            </button>
            <button
              onClick={onGiveUp}
              disabled={gameWon}
              className="bg-survivor-orange hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md md:w-auto"
            >
              Give Up
            </button>
          </div>
        </div>
      )}

      {/* Guesses Display - Now Below Input */}
      <div
        className="mb-6 rounded-lg shadow-xl p-4 md:p-8 min-h-[200px]"
        style={{
          background: 'linear-gradient(to bottom, #f4e4c1 0%, #e8d4a8 100%)',
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.05" /%3E%3C/svg%3E")',
          border: '3px solid #8B7355',
          boxShadow:
            '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
      >
        <h2
          className="text-center font-survivant text-3xl md:text-4xl mb-6 text-gray-800"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
        >
          Voted Out
        </h2>
        {guesses.length > 0 ? (
          <div className="space-y-3">
            {[...guesses].reverse().map((result, index) => (
              <React.Fragment key={guesses.length - 1 - index}>
                <GuessRow result={result} />
                {gameWon && index === 0 && guesses.length > 1 && (
                  <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 h-[2px] bg-survivor-orange"></div>
                    <span className="text-survivor-orange font-semibold text-sm">
                      Previous Guesses
                    </span>
                    <div className="flex-1 h-[2px] bg-survivor-orange"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p className="text-xl font-semibold">No guesses yet</p>
            <p className="text-sm mt-2">Cast your vote above to start!</p>
          </div>
        )}
      </div>
    </div>
  );
}
