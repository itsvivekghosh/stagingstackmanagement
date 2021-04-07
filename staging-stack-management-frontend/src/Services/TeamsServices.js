import axios from "axios";

const BASE_TEAM_URL="http://localhost:8080/teams";

class TeamsServices {

    getTeams() {
        return axios.get(BASE_TEAM_URL);
    }

    addTeam(team) {
        return axios.post(BASE_TEAM_URL, team);
    }

    getTeamById(teamId) {
        return axios.get(BASE_TEAM_URL + "/"+ teamId)
    }

    updateTeam(team, teamId) {
        return axios.put(BASE_TEAM_URL + '/' + teamId + "/update", team);
    }

    deleteTeam(teamId) {
        return axios.delete(BASE_TEAM_URL + '/' + teamId + "/delete");
    }
}

export default new TeamsServices();