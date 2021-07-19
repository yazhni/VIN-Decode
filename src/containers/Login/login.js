import React, { Component } from 'react';
import axios from'axios';
import './login.css';
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count + 1)
  );
  return count;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      errors: {
        
        email: '',
        password: '',
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ formValid: validateForm(this.state.errors), errorCount: countErrors(this.state.errors) }, () => {
      if (this.state.formValid && typeof this.state.email != "undefined" && typeof this.state.password != "undefined") {
        axios.post("http://localhost:2082/api/login", {
          email: this.state.email,
          password: this.state.password
        })
          .then(response => {
            console.log("response",response)
            if(response.data.status)
            {
            localStorage.setItem('x-auth-token', (response.data.token));
            localStorage.setItem('x-auth-username',response.data.username)
            window.location.reload()
            }
            else{
              alert(response.data.msg)
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    });


  }

  render() {
    const { errors, formValid } = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Signin</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} noValidate placeholder="Email"/>
              {errors.email.length > 0 &&
                <span className='error'>{errors.email}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={this.handleChange} noValidate  placeholder="Password"/>
              {errors.password.length > 0 &&
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='info'>
              <small>Password must be eight characters in length.</small>
            </div>
            <div className='submit'>
              <button>Login</button>
            </div>
            
          </form>
        </div>
      </div>
    );
  }
}

export default Register;