import React from 'react';
import PropTypes from 'prop-types';

const LastVins = ({ vins, onClick }) => (
  <>
    {vins.length !== 0 && (
      <div className="last-vins">
        <h4 className="last-vins-title">Last vins:</h4>
        <ul className="flex-box">
          {vins.map((el, i) => (
            <li key={i} className="flex-item-btn" onClick={() => onClick(vins[i])}>{el.name}</li>
          ))}
        </ul>
      </div>
    )}
  </>
);

LastVins.propTypes = {
  cache: PropTypes.array,
  onClick: PropTypes.func,
}

LastVins.defaultProps = {
  cache: [],
  onClick: () => {},
}

export default LastVins;
