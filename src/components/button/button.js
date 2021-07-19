import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './button.module.scss';

const Button = props => {
  const classes = [styles[props.type]];

  return (
    <button onClick={props.onClick}
            className={cn(classes, props.classes)}
            disabled={props.isDisabled}
    >
      {props.children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  type: 'primary',
  isDisabled: false,
  onClick: () => {},
}

export default Button;