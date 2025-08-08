"use client";
import React from "react";
import Search from "./Search";
import SortBy from "./SortBy";
import DocumentCard from "./DocumentCard";
import { useDashboard } from "../../../hooks/Dashboard";
import Loading from "../global/Loading";
import EmptyData from "../global/EmptyData";
import { Document } from "../../../types/Documents.type";

export default function ClientSide() {
  const {
    data,
    error,
    isLoading,
    mutate,
    sortBy,
    setSortBy,
    isSortByOpen,
    setIsSortByOpen,
    handleSelect,
    toggleDropdown,
    dropdownRef,
  } = useDashboard();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <Search />
        <SortBy
          sortBy={sortBy}
          isSortByOpen={isSortByOpen}
          handleSelect={handleSelect}
          toggleDropdown={toggleDropdown}
          dropdownRef={dropdownRef}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : data.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
          {data.map((document: Document) => (
            <DocumentCard document={document} key={document.id} />
          ))}
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
}
