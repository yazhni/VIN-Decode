import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './input.module.scss';

const Input = props => {
  const classes = [];

  if (!props.valid) classes.push(styles.invalid)

  return (
    <div className={cn(props.classes.root)}>
      <input className={cn(classes, styles.input, props.classes.input)}
             type={props.type}
             value={props.value}
             onChange={props.onChange}
             maxLength={props.maxlength}
             placeholder={props.placeholder} />

      { !props.valid && <span className={styles.errorMessage}>{props.errorMessage}</span> }
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  maxlength: PropTypes.string,
  valid: PropTypes.bool,
  onChange: PropTypes.func,
  classes: PropTypes.object,
}

Input.defaultProps = {
  type: 'text',
  errorMessage: 'Please enter the correct value',
  maxlength: '',
  placeholder: '',
}

export default Input;