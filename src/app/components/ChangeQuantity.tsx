import React from "react";

interface QuantityProps {
  total: number;
  perPage: number;
  onResultsPerPageChange: (perPage: number) => void;
  options: number[];
}

export default function ChangeQuantity({ total, perPage, onResultsPerPageChange, options = [ 5,10 ] }: QuantityProps) {
  return (
    <div className="pagination">
      <span>{total} Resultados</span>
      <div className="select-wrapper">
        <select
          className="results-select"
          value={perPage}
          onChange={(e) => onResultsPerPageChange(parseInt(e.target.value))}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <i className="fa fa-chevron-down select-icon"></i>
      </div>
    </div>
  );
}
