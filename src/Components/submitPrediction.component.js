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
    Col,
    Modal, Container, Row
} from "react-bootstrap";
import './Prediction.css'
import axios from "axios";

const SubmitPrediction = () => {
    const [game, setGame] = useState(null);
    const [winner, setWinner] = useState('draw');
    const user = AuthService.getCurrentUser();
    const [scores, setScores] = useState([{'homeScore': 0, 'awayScore': 0},
        {'homeScore': 0, 'awayScore': 0},
        {'homeScore': 0, 'awayScore': 0}]);

    const gameId = useParams();
    
    const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const listScores = scoreList.map((score) =>
         <option value={score}>{score}</option>);

    const predictionScores = [[0, 0], [0, 0], [0, 0]];



    const updateScores = (e, arg) => {
        console.log(e, arg);
    }

    const ScoreSelect = (props) => {
        const [score, setScore] = useState(0);

        const updateScores = (event) => {
            setScore(event.target.value);
            console.log(score);
            //console.log(score);
            let newScores = [...scores];
            console.log(newScores);
            props.team === 'home' ? newScores[props.index].homeScore = event.target.value
                : newScores[props.index].awayScore = event.target.value;
            //newScores[props.index].homeScore = event.target.value;
            //newScores[0].homeScore = event.value;
            console.log(newScores);
            //setScores(newScores);
            // console.log(scores);
        }
        // const handleChange = () => {
        //     //const newScore = event.value;
        //     //setScore(newScore);
        //     let newScores = [...scores];
        //     console.log(newScores)
        //     //props.home ? newScores[props.index] = event.target.value
        //     newScores[0].homeScore = score;
        //     setScores(newScores);
        //     console.log(scores);
        // }

        return (
            <Form.Control as="select" size="sm" defaultValue={0} onChange={updateScores}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
            </Form.Control>
        )
    }

    const logWinner = () => {
        let newScores = [...scores];
        newScores[1].homeScore = 3;
        setScores(newScores);
      console.log(winner);
      console.log(scores);
    };

    const onFormSubmit = e => {
        const prediction = new Map([
            ['gameId', gameId.id],
            ['userId', user.id],
            ['winner', winner],
            ['scores', scores]
        ]);
        e.preventDefault()
        const predictionJson = JSON.stringify(Object.fromEntries(prediction));
        UserService.submitPrediction(predictionJson);
        alert(predictionJson);
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
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Prediction</Modal.Title>
            </Modal.Header>
            {/*<Form onSubmit={onFormSubmit}>*/}
            {/*Only show this element if game is fetched*/}
            <Modal.Body>
                <Container>
                    <Form>

            {game && (
                <Row className="justify-content-md-center">
                    <Col md={"auto"}>
                <ToggleButtonGroup type="radio" name="winner" value={winner} onChange={
                    e => { setWinner(e); logWinner() }
                }>
                    <ToggleButton value={'home'}>{game.homeTeam.teamName}</ToggleButton>
                    <ToggleButton value={'draw'}>Draw</ToggleButton>
                    <ToggleButton value={'away'}>{game.awayTeam.teamName}</ToggleButton>
                </ToggleButtonGroup>
                </Col>
                </Row>
            )}
                        <Row className="justify-content-md-center">
                            <Col sm={"2"}>
                                <Form.Label>Home</Form.Label>
                                <ScoreSelect index={0} team={"home"}></ScoreSelect>
                            </Col>
                            <Col sm={"2"}>
                                <Form.Label>Away</Form.Label>
                                <ScoreSelect index={0} team={"away"}></ScoreSelect>
                            </Col>
                        </Row>

                        <Row className="justify-content-md-center">
                            <Col sm={"2"}>
                                <Form.Label>Home</Form.Label>
                                <ScoreSelect index={1} team={"home"}></ScoreSelect>
                            </Col>
                            <Col sm={"2"}>
                                <Form.Label>Away</Form.Label>
                                <ScoreSelect index={1} team={"away"}></ScoreSelect>
                            </Col>
                        </Row>

                        <Row className="justify-content-md-center">
                            <Col sm={"2"}>
                                <Form.Label>Home</Form.Label>
                                <ScoreSelect index={2} team={"home"}></ScoreSelect>
                            </Col>
                            <Col sm={"2"}>
                                <Form.Label>Away</Form.Label>
                                <ScoreSelect index={2} team={"away"}></ScoreSelect>
                            </Col>
                        </Row>

                    </Form></Container><br />
            {/*    <Form>*/}
            {/*    <Form.Row>*/}
            {/*        <Form.Group as={Col} sm={"2"}>*/}
            {/*            <Form.Label>Home</Form.Label>*/}
            {/*            <ScoreSelect index={0} team={"home"}></ScoreSelect>*/}
            {/*        </Form.Group>*/}
            {/*        <Form.Group as={Col} sm={"2"}>*/}
            {/*            <Form.Label>Away</Form.Label>*/}
            {/*            <ScoreSelect index={0} team={"away"}></ScoreSelect>*/}
            {/*    </Form.Group>*/}
            {/*    </Form.Row>*/}

            {/*        <Form.Row>*/}
            {/*            <Form.Group as={Col} sm={"2"}>*/}
            {/*                <ScoreSelect index={1} team={"home"}></ScoreSelect>*/}
            {/*            </Form.Group>*/}
            {/*            <Form.Group as={Col} sm={"2"}>*/}
            {/*                <ScoreSelect index={1} team={"away"}></ScoreSelect>*/}
            {/*            </Form.Group>*/}
            {/*        </Form.Row>*/}

            {/*        <Form.Row>*/}
            {/*            <Form.Group as={Col} sm={"2"}>*/}
            {/*                <ScoreSelect index={2} team={"home"}></ScoreSelect>*/}
            {/*            </Form.Group>*/}
            {/*            <Form.Group as={Col} sm={"2"}>*/}
            {/*                <ScoreSelect index={2} team={"away"}></ScoreSelect>*/}
            {/*            </Form.Group>*/}
            {/*        </Form.Row>*/}

            {/*</Form></Container>*/}
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onFormSubmit}>
                    Submit
                </Button>
                    <Button variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal.Dialog>

    );
}


export default SubmitPrediction;