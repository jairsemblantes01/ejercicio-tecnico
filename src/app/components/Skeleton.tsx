import React from "react";

export default function SkeletonTable () {
  return (
    <div className="skeleton-table">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
        </div>
      ))}
    </div>
  );
};


