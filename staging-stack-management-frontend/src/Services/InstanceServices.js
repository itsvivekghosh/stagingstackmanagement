import axios from "axios";

const BASE_URL = "http://localhost:8080/instances";
class InstanceServices {
  getInstances(pageSize = 10, pageNo = 0, sortBy = "createdOn") {
    return axios.get(
      `${BASE_URL}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    );
  }

  addInstance(instance) {
    return axios.post(`${BASE_URL}`, instance);
  }

  getInstance(instanceId) {
    return axios.get(`${BASE_URL}/${instanceId}`);
  }

  deleteInstance(instanceId) {
    return axios.delete(`${BASE_URL}/${instanceId}`);
  }

  updateInstance(instanceId, instance) {
    return axios.put(`${BASE_URL}/${instanceId}`, instance);
  }

  occupyInstance(object, instanceId, reason) {
    return axios.put(
      `${BASE_URL}/occupy-instance?instanceId=${instanceId}&instanceReason=${reason}`,
      object
    );
  }

  freeInstance(instanceId, employee) {
    return axios.put(
      `${BASE_URL}/free-instance?instanceId=${instanceId}`,
      employee
    );
  }
}

export default new InstanceServices();
