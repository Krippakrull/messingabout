import React, {Component, useEffect, useState} from "react";

import UserService from "../Services/user.service";
import {Jumbotron, Table} from "react-bootstrap";

const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const getData = async () => {
            UserService.getTeams().then(
            response => {
                setTeams(response.data);
            },
            error => {
                //TODO: Add better error checking!
                return;
            }
        )}
        getData();
    }, []);
    console.log(teams);
    return (
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Country</th>
                    <th>Flag</th>
                </tr>
                </thead>
                <tbody>
                    {teams.map(team =>
                        <tr>
                            <td>{team.id}</td>
                            <td>{team.teamName}</td>
                            <td>{team.flagUrl}</td>
                        </tr>)}
                </tbody>
            </Table>
            // <p>This is my house y&apos;all!</p>
            // {teams.map(team =>
            //     <div>{team.id + ' ' + team.teamName + ' ' + team.flagUrl}</div>)}
    )

}

export default Teams;

// export default class Teams extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             teams: []
//         };
//     }
//
//     componentDidMount() {
//         UserService.getTeams().then(
//             response => {
//                 // const teams = response.data;
//                 // console.log(teams);
//                 this.setState({
//                     teams: response.data
//                 });
//             },
//             error => {
//                 this.setState({
//                     content:
//                         (error.response && error.response.data) ||
//                         error.message ||
//                         error.toString()
//                 });
//             }
//         );
//     }
//
//
//
//     render() {
//         // const displayTeams = (props) => {
//         //     return (
//         //
//         //     )
//         // }
//         return (
//             <div className="container">
//                 <header className="jumbotron">
//                     <h3>{this.state.teams}</h3>
//                 </header>
//             </div>
//         );
//     }
//}