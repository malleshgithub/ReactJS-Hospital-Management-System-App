import http from "../http-common";

const API_URL = "http://localhost:8080/api/auth";

class PatientDataService {
  getAll() {
    return http.get(API_URL + "/patients");
  }

  getPatients(username){
    return http.get(API_URL + `/patients/dusername/${username}`); 
  }

  get(id) {
    return http.get(API_URL + `/patients/${id}`);
  }

  create(data) {
    return http.post(API_URL + "/patients", data);
  }

  update(id, data) {
    return http.put(API_URL + `/patients/${id}`, data);
  }

  delete(id) {
    return http.delete(API_URL + `/patients/${id}`);
  }

  deleteAll() {
    return http.delete(API_URL + `/patients`);
  }

  findByPatientname(patientname) {
    return http.get(API_URL + `/patients?patientname=${patientname}`);
  }
}

export default new PatientDataService();