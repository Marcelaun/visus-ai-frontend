// src/components/ProbabilityBars/ProbabilityBars.jsx

import React from 'react';
import './ProbabilityBars.css';

// Recebe a lista de probabilidades
const ProbabilityBars = ({probabilities}) => {
  if (!probabilities || !Array.isArray(probabilities) || probabilities.length === 0) {
    return <div className="prob-bars-empty">Dados de probabilidade indisponíveis.</div>;
  }
  // Encontra o maior valor para destacar
  const maxValue = Math.max(...probabilities.map((p) => p.value));

  return (
    <div className="prob-bars-container">
      {probabilities.map((prob, index) => (
        <div key={index} className="prob-bar-item">
          <span className="prob-bar-label">{prob.label}</span>
          <div className="prob-bar-track">
            <div
              className={`prob-bar-fill ${prob.value === maxValue ? 'is-max' : ''}`}
              style={{width: `${prob.value}%`}}
            ></div>
          </div>
          <span className="prob-bar-value">{prob.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

export default ProbabilityBars;
