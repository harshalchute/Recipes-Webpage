import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../css/login.css'
import Card from 'react-bootstrap/Card';

import { loginService } from "../services";


const Login = () => {

  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault()
    const data = { email: emailAddress, password }
    // console.log(data);
    // console.log(loginService(data));
    loginService(data).then(res => {
      // console.log(res)
      if (res.success) {
        setTimeout(() => {
          navigate('/food-recipes');
        }, 2000);
      }
    })
  }

  const navigateSignup = () => {
    navigate('/signup');
  };

  return (<div>
    <div className="block-back">
      <img className="img-back" src="assets/images/2.jpg" alt="log img" />
    </div>
    <div className='register-form'>
      <Card style={{ width: '100%' }} className="shadow-lg card-back">
        <Card.Body style={{ backgroundColor: '#f8f8ff66' }}>
          <h3 className='mb-3 text-center'>USER LOGIN</h3>
          <div>
            <Form onSubmit={submit}>

              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={emailAddress}
                  onChange={(event) => setEmailAddress(event.target.value)
                  }
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)
                  }
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={submit}>
                Login
              </Button>
              &nbsp;&nbsp;
              <Button variant="primary" type="button" onClick={navigateSignup}>
                Sign up
              </Button>
            </Form>
          </div>

        </Card.Body>
      </Card>
    </div>
  </div>);
}

export default Login;

