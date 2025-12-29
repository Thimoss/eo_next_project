import React from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  actionLabel?: string;
  showAction?: boolean;
  onAction?: () => void;
  helperText?: string;
  containerClassName?: string;
}

export default function SearchBar({
  actionLabel = "Cari",
  showAction = true,
  onAction,
  helperText,
  containerClassName = "",
  className = "",
  placeholder,
  "aria-label": ariaLabelProp,
  ...inputProps
}: SearchBarProps) {
  const resolvedPlaceholder = placeholder ?? "Cari data...";
  const ariaLabel = ariaLabelProp ?? resolvedPlaceholder;

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.5)] transition duration-200 focus-within:border-primaryBlue focus-within:ring-2 focus-within:ring-primaryBlue/30">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primaryBlue/10 text-primaryBlue">
          <IoSearch className="h-4 w-4" />
        </div>
        <input
          type="search"
          placeholder={resolvedPlaceholder}
          aria-label={ariaLabel}
          className={`w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none ${className}`}
          {...inputProps}
        />
        {showAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.85)] transition duration-200 hover:bg-primaryBlueDarker"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {helperText && <p className="mt-2 text-xs text-gray-400">{helperText}</p>}
    </div>
  );
}
