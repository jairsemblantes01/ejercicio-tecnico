import React from 'react';
export default function SkeletonForm() {
  return (
    <div className="skeleton-form-container form-container">
      <div className="skeleton skeleton-title"></div>
      <div className="separator-line"></div>
      <div className="skeleton-form">
        <div className="skeleton skeleton-label"></div>
        <div className="skeleton skeleton-input"></div>

        <div className="skeleton skeleton-label"></div>
        <div className="skeleton skeleton-input"></div>

        <div className="skeleton skeleton-label"></div>
        <div className="skeleton skeleton-textarea"></div>

        <div className="skeleton skeleton-label"></div>
        <div className="skeleton skeleton-input"></div>

        <div className="skeleton-form-actions">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}
