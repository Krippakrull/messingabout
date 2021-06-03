import React, {Component, useEffect, useState} from "react";

import UserService from "../Services/user.service";
import {Jumbotron, Table} from "react-bootstrap";

const Games = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const getData = async () => {
            UserService.getGames().then(
                response => {
                    setGames(response.data);
                },
                error => {
                    //TODO: Add better error checking!
                    return;
                }
            )}
        getData();
    }, []);
    console.log(games);
    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Country</th>
                <th>Flag</th>
                <th>Start Time</th>
            </tr>
            </thead>
            <tbody>
            {games.map(game =>
                <tr>
                    <td>{game.gameId}</td>
                    <td>{game.homeTeam.teamName}</td>
                    <td>{game.awayTeam.teamName}</td>
                    <td>{game.startTime}</td>
                    <td><a href={"/predict/" + game.gameId}>Predict</a> </td>
                </tr>)}
            </tbody>
        </Table>
    )

}

export default Games;