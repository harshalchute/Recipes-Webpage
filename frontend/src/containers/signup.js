import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import '../css/register.css';
import Card from 'react-bootstrap/Card';

import { registerService } from "../services";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [errorStatus, setErrorStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);


    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const submitRegister = (e) => {
        e.preventDefault()
        const data = { name, mobileNumber, email: emailAddress, password }
        // console.log(data)
        // console.log(registerService(data))
        registerService(data).then(res => {
            // console.log(res)
            if (res.success) {
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            }
        })
    }

    return (<div>
        <div className='register-form'>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <h3 className='mb-3 text-center'>REGISTER</h3>
                    {error ? <p className='text-center text-danger'>{errorMessage}</p> : ""}
                    {success ? <p className='mb-3 text-center text-success'>{successMessage}</p> : ""}

                    <div>
                        <Form onSubmit={submitRegister}>

                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Enter Your Name"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={mobileNumber}
                                    onChange={(event) => setMobileNumber(event.target.value)
                                    }
                                    placeholder="Enter Mobile Number"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

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

                            <Button variant="primary" type="button" onClick={submitRegister}>
                                Submit
                            </Button>
                        </Form>
                    </div>

                </Card.Body>
            </Card>
        </div>
    </div>);
}

export default Register;