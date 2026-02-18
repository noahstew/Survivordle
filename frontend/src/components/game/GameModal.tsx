'use client';

import { X } from 'lucide-react';
import { Returnee } from './GuessRow';

type ModalType = 'win' | 'giveup';

interface GameModalProps {
  isOpen: boolean;
  type: ModalType;
  answer: Returnee;
  guessCount: number;
  onClose: () => void;
}

export default function GameModal({
  isOpen,
  type,
  answer,
  guessCount,
  onClose,
}: GameModalProps) {
  if (!isOpen) return null;

  const isWin = type === 'win';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isWin ? '🎉 Congratulations!' : '😔 Better Luck Next Time'}
          </h2>

          <div className="mb-6">
            <img
              src={answer.img_url}
              alt={answer.name}
              referrerPolicy="no-referrer"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-green-500"
            />
            <h3 className="text-2xl font-bold text-gray-800">{answer.name}</h3>
            <p className="text-gray-600 mt-2">Seasons: {answer.seasons}</p>
            <p className="text-gray-600">Age: {answer.age}</p>
            <p className="text-gray-600">Days Lasted: {answer.days_lasted}</p>
            <p className="text-gray-600">
              Votes Against: {answer.votes_against}
            </p>
          </div>

          {isWin && (
            <p className="text-lg text-gray-700 mb-6">
              You guessed it in{' '}
              <span className="font-bold text-green-600">{guessCount}</span>{' '}
              {guessCount === 1 ? 'try' : 'tries'}!
            </p>
          )}

          {!isWin && (
            <p className="text-lg text-gray-700 mb-6">
              The answer was <span className="font-bold">{answer.name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
