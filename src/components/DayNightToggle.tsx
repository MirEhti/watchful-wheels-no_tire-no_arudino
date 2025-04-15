
import React from 'react';
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

interface DayNightToggleProps {
  isDaytime: boolean;
  onToggle: () => void;
}

const DayNightToggle: React.FC<DayNightToggleProps> = ({ isDaytime, onToggle }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`rounded-full p-2 ${
        isDaytime ? 'bg-day text-night-dark' : 'bg-night text-day'
      }`}
      onClick={onToggle}
      aria-label={isDaytime ? 'Switch to night mode' : 'Switch to day mode'}
    >
      {isDaytime ? (
        <SunIcon className="h-5 w-5 text-amber-500" />
      ) : (
        <MoonIcon className="h-5 w-5 text-indigo-300" />
      )}
    </Button>
  );
};

export default DayNightToggle;
