'use client';

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

  const getArrow = () => {
    if (result === 'correct') return null;
    // For 'before' or 'lower': target is ahead/higher, so show UP arrow
    if (result === 'before' || result === 'lower') {
      return (
        <span className="text-lg md:text-xl text-survivor-orange font-bold ml-1">
          ↑
        </span>
      );
    }
    // For 'after' or 'higher': target is behind/lower, so show DOWN arrow
    if (result === 'after' || result === 'higher') {
      return (
        <span className="text-lg md:text-xl text-survivor-blue font-bold ml-1">
          ↓
        </span>
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
        {getArrow()}
      </div>
    </div>
  );
}
