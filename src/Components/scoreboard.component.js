// Should make other DTO in backend so that password and email is not transfered

import React, {Component, useEffect, useState} from "react";
import AuthService from "../Services/auth.service";
import UserService from "../Services/user.service";
import {Jumbotron, Table} from "react-bootstrap";

const Scoreboard = () => {
    const [users, setUsers] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        const getData = async () => {
            UserService.getUsers().then(
                response => {
                    setUsers(response.data);
                },
                error => {
                    //TODO: Add better error checking!
                    return;
                }
            )
        }
        getData();
    }, []);
    console.log(users);
    users.sort((a, b) => (a.points > b.points) ? -1 : 1);
    return (
        <Table>
            <thead className={"thead-dark"}>
            <tr>
                <th>Position</th>
                <th>Points</th>
                <th>User</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, position) =>
                <tr className={"bg-secondary"}>
                    <td>{(position + 1)}</td>
                    <td>{user.points}</td>
                    <td>{user.username}</td>
                </tr>
            )}
            </tbody>
        </Table>
        // <p>This is my house y&apos;all!</p>
        // {teams.map(team =>
        //     <div>{team.id + ' ' + team.teamName + ' ' + team.flagUrl}</div>)}
    )

}

export default Scoreboard;