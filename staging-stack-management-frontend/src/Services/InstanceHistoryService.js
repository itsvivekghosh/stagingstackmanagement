import axios from "axios";

const BASE_URL = "http://localhost:8080/instances/history";

class InstanceHistoryService {
  getInstancesHistory() {
    return axios.get(`${BASE_URL}`);
  }
}

export default new InstanceHistoryService();
