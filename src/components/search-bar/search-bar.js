import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Input from '../input';
import Button from '../button';
import styles from './search-bar.module.scss';

const isInvalid = (value) => /[A-Z0-9]{17}/g.test(value) && !(/[QOI]/g.test(value)) && value.trim() !== ''

class SearchBar extends Component {

  state = {
    input: {
      value: '',
      errorMessage: 'Please enter the correct 17 characters',
      valid: true,
    },
  }

  onChange = (e) => {
    const input = { ...this.state.input }

    input.value = e.target.value;
    input.valid = true;
    
    this.setState({ input })
  }
d
  onSubmit = (e) => {
    e.preventDefault();

    const input = { ...this.state.input }
    
    if ( isInvalid(input.value) ) {
      input.valid = true;

      this.setState({ input })
      this.props.onSubmit(e, this.state.input.value)
    }
    else {
      input.valid = false;

      this.setState({ input })
    }
  }

  render() {
    const { isDisabled, classes } = this.props;
    const { input  } = this.state;
    
    return (
      <form className={cn(...classes, styles.form)} onSubmit={this.onSubmit}>
        <Input  value={input.value}
                valid={input.valid}
                errorMessage={input.errorMessage}
                onChange={this.onChange} 
                classes={{root: styles.rootInput, input: styles.input}}
                placeholder="vin number"
                maxlength={'17'} />

        <Button disabled={isDisabled}>
          {!isDisabled ? 'Decode' : 'Decoding...'}
        </Button>
      </form>
    )
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  classes: PropTypes.array,
  isDisabled: PropTypes.bool,
}

SearchBar.defaultProps = {
  classes: [],
  onSubmit: () => {},
}

export default SearchBar