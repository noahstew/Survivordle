'use client';

import { useState, useEffect, useCallback } from 'react';
import { useReturnees } from '@/contexts/ReturneeContext';
import GameBoard from './GameBoard';
import GameModal from './GameModal';
import { GuessResult, Returnee } from './GuessRow';

// Helper to extract the last season number from seasons string
function getLastSeason(seasons: string | null | undefined): number {
  if (!seasons) {
    console.warn('Seasons is null/undefined:', seasons);
    return 0;
  }

  const seasonsStr = String(seasons);
  const seasonNumbers = seasonsStr
    .split(',')
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  return seasonNumbers.length > 0 ? seasonNumbers[seasonNumbers.length - 1] : 0;
}

// Compare two returnees and generate the guess result
// Logic:
// - 'before'/'lower' means guess < target (arrow points UP to target)
// - 'after'/'higher' means guess > target (arrow points DOWN to target)
function compareReturnees(guess: Returnee, answer: Returnee): GuessResult {
  const guessLastSeason = getLastSeason(guess.seasons);
  const answerLastSeason = getLastSeason(answer.seasons);

  return {
    guess,
    nameMatch: guess.name === answer.name,
    // Last season: if guess season is before (smaller), show 'before'
    lastSeasonComparison:
      guessLastSeason === answerLastSeason
        ? 'correct'
        : guessLastSeason < answerLastSeason
          ? 'before'
          : 'after',
    // Age: if guess age is lower, show 'lower'
    ageComparison:
      guess.age === answer.age
        ? 'correct'
        : guess.age < answer.age
          ? 'lower'
          : 'higher',
    // Days: if guess days is lower, show 'lower'
    daysComparison:
      guess.days_lasted === answer.days_lasted
        ? 'correct'
        : guess.days_lasted < answer.days_lasted
          ? 'lower'
          : 'higher',
    // Votes: if guess votes is lower, show 'lower'
    votesComparison:
      guess.votes_against === answer.votes_against
        ? 'correct'
        : guess.votes_against < answer.votes_against
          ? 'lower'
          : 'higher',
  };
}

export default function ReturneeGame() {
  const { returnees, loading, getRandomReturnee } = useReturnees();
  const [targetReturnee, setTargetReturnee] = useState<Returnee | null>(null);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'win' | 'giveup'>('win');

  // Initialize game with random returnee
  const startNewGame = useCallback(() => {
    const randomReturnee = getRandomReturnee();
    if (randomReturnee) {
      setTargetReturnee(randomReturnee);
      setGuesses([]);
      setGameWon(false);
      setShowModal(false);
      console.log('New game started! Answer:', randomReturnee.name); // For debugging
    }
  }, [getRandomReturnee]);

  // Start game when returnees are loaded
  useEffect(() => {
    if (!loading && returnees.length > 0 && !targetReturnee) {
      startNewGame();
    }
  }, [loading, returnees, targetReturnee, startNewGame]);

  const handleGuess = (guessedReturnee: Returnee) => {
    if (!targetReturnee || gameWon) return;

    const result = compareReturnees(guessedReturnee, targetReturnee);
    setGuesses((prev) => [...prev, result]);

    // Check if won
    if (result.nameMatch) {
      setGameWon(true);
      setModalType('win');
      setShowModal(true);
    }
  };

  const handleGiveUp = () => {
    setModalType('giveup');
    setShowModal(true);
    setGameWon(true); // End the game
  };

  const handlePlayAgain = () => {
    startNewGame();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-survivor-sand-light flex items-center justify-center">
        <div className="text-xl text-survivor-green-dark font-semibold">
          Loading returnees...
        </div>
      </div>
    );
  }

  if (!targetReturnee) {
    return (
      <div className="min-h-screen bg-survivor-sand-light flex items-center justify-center">
        <div className="text-xl text-survivor-orange font-semibold">
          Failed to load game. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-survivor-sand-light px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <GameBoard
          guesses={guesses}
          returnees={returnees}
          onGuess={handleGuess}
          onGiveUp={handleGiveUp}
          onPlayAgain={handlePlayAgain}
          gameWon={gameWon}
          loading={loading}
        />

        {targetReturnee && (
          <GameModal
            isOpen={showModal}
            type={modalType}
            answer={targetReturnee}
            guessCount={guesses.length}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
