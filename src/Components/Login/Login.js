import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import PropTypes from "prop-types";

const loginUser = async (userdata) => {
    return fetch(process.env.REACT_APP_API_URL + '/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
    })
        .then(data => data.json())
}

const Login = ({ setToken }) => {

    const onFormSubmit = async e => {
        e.preventDefault()
        const credentials = new FormData(e.target);
        const credentialsObject = Object.fromEntries(credentials.entries());
        const token = await loginUser({
            credentialsObject
        });
        setToken(token);
        // const formData = new FormData(e.target),
        //     formDataObj = JSON.stringify(Object.fromEntries(formData.entries()));
        // alert(formDataObj);
    }
    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login;