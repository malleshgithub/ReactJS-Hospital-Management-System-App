import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

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
const vgender = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The gender must be between 3 and 20 characters.
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vhospital = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The hospital name must be select.
      </div>
    );
  }
};
const vspecialty = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The speciality must be select.
      </div>
    );
  }
};


export default class AddPatient extends Component {
  constructor(props){
    super(props);
    this.handlePatient = this.handlePatient.bind(this);
    this.onChangePatientname=this.onChangePatientname.bind(this);
    this.onChangeGender=this.onChangeGender.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeHospital = this.onChangeHospital.bind(this);
    this.onChangeSpeciality=this.onChangeSpeciality.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    
    this.newPatient = this.newPatient.bind(this);


    this.state = {
      id: null,
      patientname:"",  
      gender: "",
      email:"",
      hospital: "",
      specialty:"",
      dusername: "",
      active: false,
      successful: false,
      message: "",
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
onChangeSpeciality(e) {
  this.setState({
    specialty: e.target.value
  });
}

onChangeUsername(e) {
  this.setState({
    dusername: e.target.value
  });
}

handlePatient(e) {
  e.preventDefault();
  this.setState({
    message: "",
    successful: false
  });
  this.form.validateAll();
  
  var data = {
    patientname: this.state.patientname,
    gender: this.state.gender,
    email: this.state.email,
    hospital: this.state.hospital,
    specialty: this.state.specialty,
    dusername: this.state.currentUser.username
};

console.log(this.state.patientname);
  if (this.checkBtn.context._errors.length === 0) {
    PatientDataService.create(data)
    .then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }
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
render(){
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
            ) :(
  <div>
    <br></br>
    <div className="col-md-12">
        <div className="card-header">
         PATIENT REGISTRATION
        </div>
          <div className="card-body">

             <Form
                onSubmit={this.handlePatient}
                 ref={c => {
                 this.form = c;
                 }}  
             >
             {!this.state.successful && ( 
            <div>
              <div className="form-group">
                <label htmlFor="patientname">PatientName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="patientname"
                  value={this.state.patientname}
                  onChange={this.onChangePatientname}
                  validations={[required, vpatientname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChangeGender}
                  validations={[required, vgender]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">EmailId</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
                />
              </div>
              <div className="form-group">
                      <label htmlFor="hospital">hospital</label>
                      <select className="form-select" placeholder="hospital" 
                         value={this.state.hospital}
                         onChange={this.onChangeHospital}
                         validations={[required, vhospital]}>
                           <option value="@Hospital@">@Hospital@</option>
                    <option value="Apollo">Apollo</option>
                    <option value="Yashoda">Yashoda</option>
                    <option value="Kamineni">Kamineni</option>
                      </select>
                    </div> 
             
              <div className="form-group">
                      <label htmlFor="specialty">Specialty</label>
                      <select className="form-select" placeholder="specialty" 
                         value={this.state.specialty}
                         onChange={this.onChangeSpeciality}
                         validations={[required, vspecialty]}>
                         <option value="@@Specialty@">@Specialty@</option>
                         <option value="cardiologist">Cardiologist</option>
                         <option value="dermatologist">Dermatologist</option>
                         <option value="neurologist">Neurologist</option>
                      </select>
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
                    readOnly
                  />
                </div>

              <div className="form-group">
                 <button className="btn btn-primary">Add Patient</button> 
              </div>
            </div>
          )}

          {this.state.message && (
            <div className="form-group">
             
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}

        
            <CheckButton
            style={{ display: "none" }} 
            ref={c => {
              this.checkBtn = c;
            }} 
          />  
        </Form>
      </div>
      </div>
    </div> 
 )}     
 </div>
  );
}
}
