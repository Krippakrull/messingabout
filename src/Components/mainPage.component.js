import React, { Component } from "react";
import Scoreboard from "./scoreboard.component";
import Games from "./games.component";
import Profile from "./profile.component";

import {Tabs, Tab, Container, Jumbotron, Row} from "react-bootstrap";

const MainPage = () => {

    return (

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
                <Games />
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <Container>
                    <Row>
                        <h3>Profile</h3>
                    </Row>
                    <Row>
                        <Profile />
                    </Row>
                    <Row>
                        <h4 className={"border-dark"}>Upcoming games</h4>
                    </Row>
                    <Row>
                        <Games />
                    </Row>

                    <Row>
                        <Scoreboard />
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
            </Tab>
        </Tabs>
    )
}
export default MainPage;