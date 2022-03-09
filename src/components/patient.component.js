import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.onChangePatientname = this.onChangePatientname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getPatient = this.getPatient.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.deletePatient = this.deletePatient.bind(this);

    this.state = {
      currentPatient: {
        id: null,
        patientname: "",
        email: "",
        active: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPatient(this.props.match.params.id);
    
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) this.setState({ redirect: "/home" });
  this.setState({ currentUser: currentUser, userReady: true })
  }

  onChangePatientname(e) {
    const patientname = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          patientname: patientname
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
        currentPatient: {
        ...prevState.currentPatient,
        email: email
      }
    }));
  }

  getPatient(id) {
    PatientDataService.get(id)
      .then(response => {
        this.setState({
            currentPatient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateActive(status) {
    var data = {
      id: this.state.currentPatient.id,
      patientname: this.state.currentPatient.patientname,
      email: this.state.currentPatient.email,
      active: status
    };

    PatientDataService.update(this.state.currentPatient.id, data)
      .then(response => {
        this.setState(prevState => ({
            currentPatient: {
            ...prevState.currentPatient,
            active: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePatient() {
    PatientDataService.update(
      this.state.currentPatient.id,
      this.state.currentPatient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The patient was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePatient() {    
    PatientDataService.delete(this.state.currentPatient.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/patients')
      })
      .catch(e => {
        console.log(e);
      });
  }

  
  render() {

    const { currentPatient } = this.state;

    
    //Authorization
    
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    //const { currentUser } = this.state;

    return (
      <div>
        {currentPatient ? (
          <div className="edit-form">
            <h4>Patient</h4>
            <form>
              <div className="form-group">
                <label htmlFor="patientname">Patientname</label>
                <input
                  type="text"
                  className="form-control"
                  id="patientname"
                  value={currentPatient.patientname}
                  onChange={this.onChangePatientname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentPatient.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPatient.active ? "Active" : "InActive"}
              </div>
            </form>

            {currentPatient.active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(false)}
              >
                InActive
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateActive(true)}
              >
                Active
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePatient}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePatient}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient...</p>
          </div>
        )}
      </div>
    );
  }
}
