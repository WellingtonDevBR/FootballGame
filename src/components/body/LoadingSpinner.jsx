import React from 'react';
import './LoadingSpinner.module.css';
export class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    );
  }
}