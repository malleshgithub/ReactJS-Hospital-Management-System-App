import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const vpatientname = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The patientname must be between 3 and 20 characters.
        </div>
      );
    }
  };

export default class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.onChangePatientname = this.onChangePatientname.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeHospital = this.onChangeHospital.bind(this);
        this.onChangeSpecialty = this.onChangeSpecialty.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.savePatient = this.savePatient.bind(this);
        this.newPatient = this.newPatient.bind(this);
    
        this.state = {
          id: null,
          patientname: "",
          gender: "",
          email: "" ,
          hospital: "",
          specialty: "",
          dusername: "",
          // username: "",
          active: false,
    
          submitted: false,
          
      currentUser: { username: "" }
        };
      }
    
      onChangePatientname(e) {
        this.setState({
            patientname: e.target.value
        });
      }
    
      onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
      }

      onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
      }
      
      onChangeHospital(e) {
        this.setState({
            hospital: e.target.value
        });
      }
            
      onChangeSpecialty(e) {
        this.setState({
            specialty: e.target.value
        });
      }
      
      onChangeUsername(e) {
        this.setState({
          //dusername: e.target.value
          dusername: e.target.value
        });
      }

      savePatient() {
        var data = {
            patientname: this.state.patientname,
            gender: this.state.gender,
            email: this.state.email,
            hospital: this.state.hospital,
            specialty: this.state.specialty,
            dusername: this.state.currentUser.username
        };
        
        console.log(this.state.patientname);
        PatientDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              patientname: response.data.patientname,
              gender: response.data.gender,
              email: response.data.email,
              hospital: response.data.hospital,
              specialty: response.data.specialty,
              dusername: this.state.currentUser.username,
              active: response.data.active,
    
              submitted: true
              
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
          
      }
    
      newPatient() {
        this.setState({
          id: null,
          patientname: "",
          gender: "",
          email: "",
          hospital: "",
          specialty: "",
          dusername: "",
          active: false,
    
          submitted: false
        });
      }
    
    //Authorization
    componentDidMount() {
      const currentUser = AuthService.getCurrentUser();

      if (!currentUser) this.setState({ redirect: "/home" });
      this.setState({ currentUser: currentUser, userReady: true })
    }
    
      render() {
        
        //Authorization
        
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
    
       const { currentUser } = this.state;

        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newPatient}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="patientname">PatientName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientname"
                    required
                    value={this.state.patientname}
                    onChange={this.onChangePatientname}
                    name="patientname"
                    validations={[required, vpatientname]}
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gender"
                    required
                    value={this.state.gender}
                    onChange={this.onChangeGender}
                    name="gender"
                  />
                </div>

                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="hospital">Hospital</label>
                  <input
                    type="text"
                    className="form-control"
                    id="hospital"
                    required
                    value={this.state.hospital}
                    onChange={this.onChangeHospital}
                    name="hospital"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialty">Specialty</label>
                  <input
                    type="text"
                    className="form-control"
                    id="specialty"
                    required
                    value={this.state.specialty}
                    onChange={this.onChangeSpecialty}
                    name="specialty"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dusername">Doctorname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dusername"
                    required
                    //value={this.state.dusername}
                    defaultValue={currentUser.username}
                    onChange={this.onChangeUsername}
                    name="dusername"
                  />
                </div>
                <button onClick={this.savePatient} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
    }
    