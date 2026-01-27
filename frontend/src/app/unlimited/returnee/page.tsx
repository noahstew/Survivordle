'use client';

import { useState, useEffect } from 'react';
import { useReturnees } from '@/contexts/ReturneeContext';
import SearchReturnee from '@/components/game/SearchReturnee';

export default function Page() {
  const { returnees, loading, error, getRandomReturnee } = useReturnees();
  const [currentReturnee, setCurrentReturnee] = useState<any>(null);

  useEffect(() => {
    if (!loading && returnees.length > 0) {
      setCurrentReturnee(getRandomReturnee());
    }
  }, [loading, returnees]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentReturnee) return <div>No returnees found</div>;

  return (
    <div>
      <SearchReturnee />
      <h1>{currentReturnee.name}</h1>
      <p>Age: {currentReturnee.age}</p>
      <p>Seasons: {currentReturnee.seasons}</p>
      <p>Days Lasted: {currentReturnee.days_lasted}</p>
      <p>Votes Against: {currentReturnee.votes_against}</p>
      <img
        src={currentReturnee.img_url}
        alt={currentReturnee.name}
        referrerPolicy="no-referrer"
        style={{ width: '300px', height: 'auto' }}
      />
      <button onClick={() => setCurrentReturnee(getRandomReturnee())}>
        Get New Returnee
      </button>
    </div>
  );
}
