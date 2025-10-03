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
    <div className="relative w-full max-w-[12rem]" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="bg-white rounded-md px-3 py-1.5 flex items-center gap-2 justify-between"
      >
        <span className="text-xs">Urutkan: {sortBy.label}</span>
        <div className="w-4 h-4">
          <IoChevronDown
            className={`w-full h-full ${isSortByOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      {isSortByOpen && (
        <div className="bg-white rounded-md p-4 absolute z-10 translate-y-full -bottom-1 flex flex-col gap-2">
          {sortByList.map((option: SortByDataProps) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="flex cursor-pointer items-center gap-2 text-xs justify-between hover:bg-gray-300 duration-300 p-1.5 rounded-md"
            >
              <span>{option.label}</span>
              {sortBy.value === option.value && (
                <div className="w-4 h-4">
                  <IoCheckmark className="w-full h-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
