// src/components/Tooltip.jsx
import React from 'react';
import '../style/Skills.css'; // Ensure this path is correct

function Tooltip({ tooltipData }) {
  if (!tooltipData || !tooltipData.visible) {
    return null;
  }

  const { x, y, skill } = tooltipData;

  return (
    <div
      className="custom-tooltip"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        transform: 'translate(-50%, -110%)',
        zIndex: 9999,
      }}
    >
      <div className="tooltip-content">
        <img src={skill.logo} alt={skill.name} className="tooltip-logo" />
        <div>
          <strong>{skill.name}</strong>
          <p>{skill.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
