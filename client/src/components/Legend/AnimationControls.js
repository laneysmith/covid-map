import React from 'react';

const AnimationControls = ({ disabled, animate, onChangeAnimate }) => {
  const handleToggleAnimate = () => onChangeAnimate(!animate);

  return (
    <div className="legend-controls">
      <button type="button" onClick={handleToggleAnimate} disabled={disabled}>
        {`${animate ? 'Stop' : 'Start'} Animation`}
      </button>
    </div>
  );
};

export default AnimationControls;
