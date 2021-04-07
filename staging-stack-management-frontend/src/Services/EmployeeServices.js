import axios from "axios";

const BASE_TEAM_URL = "http://localhost:8080/employees";

class EmployeesServices {
  getEmployees() {
    return axios.get(BASE_TEAM_URL);
  }

  addEmployee(employee) {
    return axios.post(BASE_TEAM_URL, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(`${BASE_TEAM_URL}/${employeeId}`);
  }

  updateEmployee(employeeId, employee) {
    return axios.put(`${BASE_TEAM_URL}/${employeeId}`, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(`${BASE_TEAM_URL}/${employeeId}`);
  }

  getEmployeeByTeamId(teamId) {
    return axios.get(`${BASE_TEAM_URL}/find-team/${teamId}`);
  }
}

export default new EmployeesServices();
