import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";

export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPatientname = this.onChangeSearchPatientname.bind(this);
    this.retrievePatients = this.retrievePatients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePatient = this.setActivePatient.bind(this);
    this.removeAllPatients = this.removeAllPatients.bind(this);
    this.searchPatientname = this.searchPatientname.bind(this);

    this.state = {
        patients: [],
      currentPatient: null,
      currentIndex: -1,
      searchPatientname: "",
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    this.retrievePatients();
    
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) this.setState({ redirect: "/home" });
  this.setState({ currentUser: currentUser, userReady: true })

  //const { currentUser } = this.state;

  }

  onChangeSearchPatientname(e) {
    const searchPatientname = e.target.value;

    this.setState({
        searchPatientname: searchPatientname
    });
  }

  retrievePatients() {
    //PatientDataService.getAll(username)
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.username);
    PatientDataService.getPatients(currentUser.username)
      .then(response => {
        this.setState({
            patients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  refreshList() {
    this.retrievePatients();
    this.setState({
    currentPatient: null,
      currentIndex: -1
    });
  }

  setActivePatient(patient, index) {
    this.setState({
        currentPatient: patient,
      currentIndex: index
    });
  }

  removeAllPatients() {
    PatientDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchPatientname() {
    this.setState({
      currentPatient: null,
      currentIndex: -1
    });

    PatientDataService.findByPatientname(this.state.searchPatientname)
      .then(response => {
        this.setState({
            patients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    const { searchPatientname, patients, currentPatient, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by patientname"
              value={searchPatientname}
              onChange={this.onChangeSearchPatientname}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchPatientname}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Patients List</h4>

          <ul className="list-group">
            {patients &&
              patients.map((patient, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePatient(patient, index)}
                  key={index}
                >
                  {patient.patientname}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPatients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPatient ? (
            <div>
              <h4>Patient</h4>
              <div>
                <label>
                  <strong>Patientname:</strong>
                </label>{" "}
                {currentPatient.patientname}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentPatient.email}
              </div>
              <div>
                <label>
                  <strong>DoctorName</strong>
                </label>{" "}
                {currentUser.username}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPatient.active ? "Active" : "InActive"}
              </div>

              <Link
                to={"/patients/" + currentPatient.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Patient...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
