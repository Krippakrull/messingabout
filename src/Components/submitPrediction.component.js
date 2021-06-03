import React, {Component, useEffect, useRef, useState} from "react";

import UserService from "../Services/user.service";
import {useParams} from "react-router-dom";
import AuthService from "../Services/auth.service";
import {
    Jumbotron,
    Table,
    Form,
    Button,
    Dropdown,
    DropdownButton,
    ToggleButtonGroup,
    ToggleButton,
    Col
} from "react-bootstrap";
import axios from "axios";

const SubmitPrediction = () => {
    const [game, setGame] = useState(null);
    const gameId = useParams();
    const user = AuthService.getCurrentUser();

    const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const listScores = scores.map((score) =>
        <option value={score}>{score}</option>);

    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target);
        formData.append("gameId", gameId.id);
        formData.append("userId", user.id);
        const formDataObj = JSON.stringify(Object.fromEntries(formData.entries()));
        formDataObj.concat()
        alert(formDataObj.concat('"scores" [{"homeScore":1, awayScore:3}, {"homeScore":1, awayScore:3},{"homeScore":1, awayScore:3}]'));
    }
    useEffect(() => {
        const getData = async () => {
            const result = await UserService.getGameById(gameId.id);
            const data = await result.data;
            console.log(data.awayTeam.teamName);
            setGame(data);
            // UserService.getGameById().then(
            //     response => {
            //         const current = response.data;
            //         setGame(current);
            //         console.log(response.data);
            //         console.log(game);
            //     },
            //     error => {
            //         //TODO: Add better error checking!
            //         return;
            //     }
            // )
        }
        getData();
    }, []);

    return (
        <Jumbotron>
            <Form onSubmit={onFormSubmit}>
            <h2>Winner</h2>
            {/*Only show this element if game is fetched*/}
            {game && (
                <ToggleButtonGroup type="radio" name="options">
                    <ToggleButton value={1}>{game.homeTeam.teamName}</ToggleButton>
                    <ToggleButton value={2}>Draw</ToggleButton>
                    <ToggleButton value={3}>{game.awayTeam.teamName}</ToggleButton>
                </ToggleButtonGroup>
            )}
            <br/>
            <h2>Set 3 scores</h2>
                <Form.Row>
                    <Col>
                        <Form.Control name="homeScore1" size="sm" as="select">
                            <option>Home</option>
                            {listScores}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control size="sm" as="select">
                            <option>Away</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Dropdown>
                <Dropdown.Toggle variant="success">
                    Open
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        1
                    </Dropdown.Item>
                    <Dropdown.Item>
                        2
                    </Dropdown.Item>
                    <Dropdown.Item>
                        3
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Jumbotron>

    );
}


export default SubmitPrediction;