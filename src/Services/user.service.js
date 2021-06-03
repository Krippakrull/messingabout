import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

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
}

export default new UserService();