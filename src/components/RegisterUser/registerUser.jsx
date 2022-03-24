import { Block } from "@material-ui/icons";
import React, { createRef } from "react";
import "./registerUser.scss";
import * as authService from "../../core/services/authService";
import httpService from "../../core/services/httpService";
// import * as Yup from "yup";
import axios from "axios";
class Register extends React.Component {
  // registerFormSchema =  Yup.object().shape({});

  formSchema = {
    name: createRef(),
    email: createRef(),
    password: createRef(),
  };
  state = {
    formDetails: {
      name: "",
      email: "",
      password: "",
    },
  };
  submitForm = async (e) => {
    e.preventDefault();
    console.log("environments", process.env);
    await this.setState({
      ...this.state,
      formDetails: {
        name: this.formSchema.name.current.value,
        email: this.formSchema.email.current.value,
        password: this.formSchema.password.current.value,
      },
    });
    const response = await authService.registerUser(this.state.formDetails);
    console.log(response);
  };
  render() {
    return (
      <div className="row loginWrapper">
        <div className="col-12">
          <form
            onSubmit={(e) => {
              this.submitForm(e);
            }}
            noValidate
          >
            <div className="row">
              <div className="col-3">
                <label>
                  <b>Name</b>
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  ref={this.formSchema.name}
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "1%" }}>
              <div className="col-3">
                <label>
                  <b>Email</b>
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  ref={this.formSchema.email}
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "1%" }}>
              <div className="col-3">
                <label>
                  <b>Password</b>
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  ref={this.formSchema.password}
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "1%" }}>
              <div className="col-12" style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
