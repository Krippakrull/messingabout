import React, {useState} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import Main from "./Components/Main/Main";
import Settings from "./Components/Settings/Settings";
import Login from "./Components/Login/Login";

import './App.css';

// const onSubmit = e => {
//     e.preventDefault()
//     const formData = new FormData(e.target),
//         formDataObj = Object.fromEntries(formData.entries());
//     alert(formDataObj.toString());
// }

const LoginForm = () => {
    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = JSON.stringify(Object.fromEntries(formData.entries()));
        alert(formDataObj);
    }
    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email"/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

const ExampleToast = ({children}) => {
    const [show, toggleShow] = useState(true);

    return (
        <Toast show={show} onClose={() => toggleShow(!show)}>
            <Toast.Header>
                <strong className="mr-auto">React-Bootstrap</strong>
            </Toast.Header>
            <Toast.Body>{children}</Toast.Body>
        </Toast>
    );
};

const App = () => {
    const [token, setToken] = useState();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <Container className="p-3">
            <BrowserRouter>
                <Switch>
                    <Route path="/main">
                        <Main/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                </Switch>
            </BrowserRouter>
            <Jumbotron>
                <h1 className="header">Welcome to Euro Buddyleague!</h1>
            </Jumbotron>

            {/*<LoginForm></LoginForm>*/}
        </Container>
    );
}

export default App;
