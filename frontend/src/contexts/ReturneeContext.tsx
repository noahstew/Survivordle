'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface Returnee {
  name: string;
  age: number;
  seasons: string;
  season_names?: string;
  days_lasted: number;
  votes_against: number;
  img_url: string;
}

interface ReturneeContextType {
  returnees: Returnee[];
  loading: boolean;
  error: string | null;
  getRandomReturnee: () => Returnee | null;
}

const ReturneeContext = createContext<ReturneeContextType | undefined>(
  undefined,
);

export function ReturneeProvider({ children }: { children: ReactNode }) {
  const [returnees, setReturnees] = useState<Returnee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/returnee/all')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch returnees');
        return res.json();
      })
      .then((data) => {
        setReturnees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getRandomReturnee = () => {
    if (returnees.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * returnees.length);
    return returnees[randomIndex];
  };

  return (
    <ReturneeContext.Provider
      value={{ returnees, loading, error, getRandomReturnee }}
    >
      {children}
    </ReturneeContext.Provider>
  );
}

export function useReturnees() {
  const context = useContext(ReturneeContext);
  if (context === undefined) {
    throw new Error('useReturnees must be used within a ReturneeProvider');
  }
  return context;
}
