import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label
      className={`flex items-center p-1 rounded-md cursor-pointer transition-colors 
                  ${checked ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-white border border-gray-300 text-gray-900'} 
                  hover:bg-green-50 sm:p-1.5 md:p-2.5`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 border-2 rounded-sm flex items-center justify-center 
                    ${checked ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="ml-1 text-[10px] sm:text-xs md:text-sm">{label}</span>
    </label>
  );
}
