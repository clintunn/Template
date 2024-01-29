import React from "react";
import { useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Login.css";
import { Link } from "react-router-dom";
import withSignupRequired from "../components/withSignupRequired";

/*
The Login function uses the useState hook to declare a state variable named email and its corresponding updater function setEmail. 
The initial state of email is set to an empty string ('').
This is also the same case for password and setPassword
*/
function Login({ onSignupRequired }) {
    const [email, setEmail] = useState('');         
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin(e) {
        e.preventDefault(); // Prevents the default behavior of form submission
    
        try {
            setLoading(true);
            // Prepare the form data
            const formData = {
                email: email,
                password: password,
            };
    
            // Make a POST request to the backend API with the form data
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                // Parse the response JSON if applicable
                const data = await response.json();
                console.log('Login successful:', data);
                // You may want to redirect or perform other actions upon successful login
                onSignupRequired(true);
            } else {
                // Handle non-successful responses
                console.error('Error logging in:', response.status, response.statusText);
                onSignupRequired(false);
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error logging in:', error);
            setError('An unexpected error occurred. Please try again.');
        }finally {
            setLoading(false);
        }
    }
    

return (
<Container>
    <Row>
        {/* <Col md={5} className="login_bg"></Col> */}
        <Col md={12} className="d-flex flex-direction-column align-items-center justify-content-center">
            <Form className="form_inc" onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Logging in...': 'Login'}
                </Button>
                <div className="py-4">
                    <p>
                        Don't have an account ? <Link to={"/signup"}>Signup</Link>
                    </p>
                </div>
                {error && (
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
                )}

            </Form>
        </Col>
    </Row>
</Container>
);
}

export default withSignupRequired(Login);