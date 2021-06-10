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

    const filterGames = () => {
        const filteredGames = games.filter(game => game.startTime !== null);
        setGames(filteredGames);

    }

    const formatDate = (dateString) => {
        const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    if (games) {
        const filteredGames = games.filter(game => !game.winner);
        console.log(filteredGames);
        filteredGames[1] ? console.log(filteredGames[1].startTime) : console.log('Empty');
        console.log(filteredGames[1]);
    }
    //console.log(games[1].winner);
    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Country</th>
                <th>Flag</th>
                <th>Start Time</th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {games.map(game =>
                <tr>
                    <td>{game.gameId}</td>
                    <td>{game.homeTeam.teamName}</td>
                    <td>{game.awayTeam.teamName}</td>
                    <td>{formatDate(game.startTime)}</td>
                    <td><a href={"/predict/" + game.gameId}>Predict</a> </td>
                </tr>)}
            </tbody>
        </Table>
    )

}

export default Games;