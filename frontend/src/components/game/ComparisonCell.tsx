'use client';

import { ChevronUp, ChevronDown, Equal } from 'lucide-react';

type ComparisonResult = 'correct' | 'higher' | 'lower' | 'before' | 'after';

interface ComparisonCellProps {
  value: string | number;
  result: ComparisonResult;
  label: string;
}

export default function ComparisonCell({
  value,
  result,
  label,
}: ComparisonCellProps) {
  const getBackgroundColor = () => {
    if (result === 'correct') return 'bg-survivor-green';
    return 'bg-survivor-sand';
  };

  const getIcon = () => {
    if (result === 'correct') return null;
    // For 'before' or 'lower': target is ahead/higher, so show UP arrow
    if (result === 'before' || result === 'lower') {
      return (
        <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-survivor-orange" />
      );
    }
    // For 'after' or 'higher': target is behind/lower, so show DOWN arrow
    if (result === 'after' || result === 'higher') {
      return (
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-survivor-blue" />
      );
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-lg ${getBackgroundColor()} h-20 shadow-sm w-full`}
    >
      <span className="text-xs text-gray-700 font-medium mb-1">{label}</span>
      <div className="flex items-center gap-1">
        <span className="font-bold text-xs md:text-sm text-gray-900 text-center break-words">
          {value}
        </span>
        {getIcon()}
      </div>
    </div>
  );
}
