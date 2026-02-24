'use client';

import { useState } from 'react';
import ReturneeGame from '@/components/game/ReturneeGame';
import { IoClose, IoInformationCircle } from 'react-icons/io5';

export default function Home() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="relative">
      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-survivor-sand max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative p-8">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 text-3xl hover:text-survivor-orange transition-colors"
            >
              <IoClose />
            </button>

            <div className="text-lg flex flex-col items-center justify-center">
              <div className="px-4 py-2 rounded-lg shadow-md text-3xl md:text-4xl font-bold text-black border-4 border-survivor-orange bg-white text-center mb-6">
                Welcome to{' '}
                <span className="text-survivor-orange">Survivordle</span>
              </div>

              <div className="w-full mx-auto">
                <h2 className="text-2xl md:text-3xl pb-4 font-bold">
                  How to Play:
                </h2>
                <p className="text-base md:text-lg">
                  <span className="bg-survivor-orange p-1 rounded-lg text-base md:text-lg font-bold">
                    GOAL:
                  </span>{' '}
                  Try and guess the mystery Survivor returnee!
                </p>
                <div className="border-black border-b-2 my-4"></div>

                <p className="text-base md:text-lg">
                  Choose a Survivor returnee (anyone who has played 2 or more
                  times including S50) and select guess. You'll get hints
                  comparing your guess to the mystery player:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2 text-base md:text-lg">
                  <li>
                    <span className="bg-survivor-green p-1 rounded-lg font-bold">
                      Green
                    </span>{' '}
                    - Correct match!
                  </li>
                  <li>
                    <span className="bg-white p-1 rounded-lg font-bold">
                      <span className="text-survivor-orange">↑</span> Up Arrow
                    </span>{' '}
                    - Mystery player's value is higher
                  </li>
                  <li>
                    <span className="bg-white p-1 rounded-lg font-bold">
                      <span className="text-survivor-blue">↓</span> Down Arrow
                    </span>{' '}
                    - Mystery player's value is lower
                  </li>
                </ul>

                <div className="border-black border-b-2 my-4"></div>

                <h3 className="text-xl md:text-2xl pb-2 font-bold">
                  Attributes:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-base md:text-lg">
                  <li>
                    <strong>Last Season:</strong> Most recent season they played
                  </li>
                  <li>
                    <strong>Age:</strong> Their age during their most recent
                    season
                  </li>
                  <li>
                    <strong>Days Lasted:</strong> Total days across all seasons
                    (including Edge of Extinction)
                  </li>
                  <li>
                    <strong>Votes Against:</strong> Total votes received across
                    all seasons
                  </li>
                </ul>

                <div className="border-black border-b-2 my-4"></div>

                <p className="text-base md:text-lg text-center font-semibold">
                  Good luck and may the odds be ever in your favor! 🔥
                </p>

                <button
                  onClick={() => setShowInstructions(false)}
                  className="w-full mt-6 bg-survivor-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all text-lg"
                >
                  Start Playing!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info button to reopen instructions */}
      <button
        onClick={() => setShowInstructions(true)}
        className="fixed bottom-6 right-6 z-40 bg-survivor-blue text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all text-3xl"
        title="How to Play"
      >
        <IoInformationCircle />
      </button>

      {/* Main Game */}
      <ReturneeGame />
    </div>
  );
}
