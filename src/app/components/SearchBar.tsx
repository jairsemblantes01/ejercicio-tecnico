import React from "react";
import debounce from "debounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  debouncedSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch, debouncedSearch }: SearchBarProps) {
  const handleSearch = debouncedSearch || debounce((query: string) => {
    onSearch(query);
  }, 500);

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      className="search-input"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
