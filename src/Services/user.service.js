import axios from "axios";
import authHeader from './auth-header';
import tokenService from './token-service';

const API_URL = 'http://localhost:8080/api/test/';
const token = tokenService();
const postHeader =
        {
            'Authorization': 'Bearer ' + tokenService(),
            'Content-Type': 'application/json'

        }


class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getTeams() {
        return axios.get('http://localhost:8080/api/teams', {headers: authHeader()});
    }

    getGames() {
        return axios.get('http://localhost:8080/api/games', {headers: authHeader()});
    }
    getGameById(id) {
        return axios.get('http://localhost:8080/api/games/' + id, {headers: authHeader()});
    }
    getUsers() {
        return axios.get('http://localhost:8080/api/users/', {headers: authHeader()});
    }
    submitPrediction(prediction) {
        console.log(prediction);
        console.log(postHeader);
        return axios.post('http://localhost:8080/api/predictions/predict', prediction, {headers: postHeader});
    }

}

export default new UserService();