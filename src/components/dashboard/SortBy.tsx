import React from "react";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";
import { SortByDataProps, sortByList } from "../../../hooks/Dashboard";

interface SortByProps {
  sortBy: SortByDataProps;
  isSortByOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  toggleDropdown: () => void;
  handleSelect: (sortBy: SortByDataProps) => void;
}

export default function SortBy({
  sortBy,
  isSortByOpen,
  dropdownRef,
  toggleDropdown,
  handleSelect,
}: SortByProps) {
  return (
    <div className="relative w-full sm:max-w-[18rem]" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isSortByOpen}
        className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.5)] transition duration-200 hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue/30 focus-visible:ring-offset-2"
      >
        <span className="min-w-0 flex-1 text-sm font-semibold">
          <span className="text-gray-600">Urutkan: </span>
          <span className="block truncate font-bold text-primaryBlue">
            {sortBy.label}
          </span>
        </span>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primaryBlue/10 text-primaryBlue">
          <IoChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isSortByOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isSortByOpen && (
        <div className="absolute left-0 z-10 mt-3 w-full rounded-2xl border border-gray-200/80 bg-white p-2 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.5)]">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Urutan
          </div>
          {sortByList.map((option: SortByDataProps) => (
            <button
              type="button"
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition duration-200 ${
                sortBy.value === option.value
                  ? "bg-primaryBlue/10 text-primaryBlue"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{option.label}</span>
              {sortBy.value === option.value && (
                <IoCheckmark className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
