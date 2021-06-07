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

// const ScoreSelect = () => {
//     const [score, setScore] = useState(0);
//
//     return (
//         <Form.Control size="sm" value={score} as="select" name={"score"} onChange={e => {setScore(e.target.value); console.log(score)}}>
//             <option value={0}>Home</option>
//             <option value={1}>1</option>
//             <option value={2}>2</option>
//             <option value={3}>3</option>
//             <option value={4}>4</option>
//             <option value={5}>5</option>
//             <option value={6}>6</option>
//             <option value={7}>7</option>
//             <option value={8}>8</option>
//             <option value={9}>9</option>
//         </Form.Control>
//     )
// }

const SubmitPrediction = () => {
    const [game, setGame] = useState(null);
    const [winner, setWinner] = useState('draw');
    const user = AuthService.getCurrentUser();
    const [scores, setScores] = useState([{'homeScore': 0, 'awayScore': 0},
        {'homeScore': 0, 'awayScore': 0},
        {'homeScore': 0, 'awayScore': 0}]);


    const gameId = useParams();

    // const Prediction =({ userId, gameId, winner, scores }) => (
    //
    // )
    
    const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const listScores = scoreList.map((score) =>
         <option value={score}>{score}</option>);

    const predictionScores = [[0, 0], [0, 0], [0, 0]];

    const ScoreSelect = (props) => {
        const [score, setScore] = useState();

        const updateScores = (event) => {
            setScore(event.value);
            console.log(event.target.value);
            //console.log(score);
            //let newScores = [...scores];
            // console.log(newScores)
            // //props.home ? newScores[props.index] = event.target.value
            //newScores[0].homeScore = event.value;
            //console.log(newScores);
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
            <select size="sm" value={score} as="select" onChange={e => {setScore(e.value);console.log(score)}}>
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
            </select>
        )
    }

    const updateScores = (e, arg) => {
        console.log(e, arg);
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
        const formData = new FormData(e.target);
        formData.append("gameId", gameId.id);
        formData.append("userId", user.id);
        const formDataObj = JSON.stringify(Object.fromEntries(prediction));
        // formDataObj.concat('"scores":[{"homeScore":${scores}, "away}]')
        formDataObj.concat()
        alert(formDataObj);
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
                <ToggleButtonGroup type="radio" name="winner" value={winner} onChange={
                    e => { setWinner(e); logWinner() }
                }>
                    <ToggleButton value={'home'}>{game.homeTeam.teamName}</ToggleButton>
                    <ToggleButton value={'draw'}>Draw</ToggleButton>
                    <ToggleButton value={'away'}>{game.awayTeam.teamName}</ToggleButton>
                </ToggleButtonGroup>
            )}
            <br/>
            <h2>Set 3 scores</h2>
                <Form.Row>
                    <Col>
                        <ScoreSelect name={"1"}></ScoreSelect>
                    </Col>
                    <Col>
                        <ScoreSelect name={"2"}></ScoreSelect>
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