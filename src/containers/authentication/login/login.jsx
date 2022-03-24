import { Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";
import "./login.scss";
import { ValidationMessages } from "../../../common/constants/validationMessages";
import * as authService from "../../../core/services/authService";
// import centralStore from "../../../common/store/centralStore";
import { connect } from "react-redux";
// import { ActionsKey } from "../../../common/constants/constants";
import Emitter from "../../../core/services/emitter";
import http from "../../../core/services/httpService";
class Login extends Component {
  state = {};

  componentDidMount() {
    // throw new Error("Check Error Boundary");

    Emitter.on("LOGIN", (data) => {
      console.log("data", data);
    });
    // centralStore.subscribe(() => console.log("todos", centralStore.getState()));
    // centralStore.dispatch({
    //   type: ActionsKey.getCurrentUser,
    // });
  }
  componentWillUnmount() {
    Emitter.off("LOGIN", () => {});
  }

  loginFormSchema = Yup.object().shape({
    email: Yup.string().default(""),
    // .default("")
    // .required(ValidationMessages.Required)
    // .matches(
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    //   ValidationMessages.Email
    // )
    password: Yup.string().default(""), //.required(ValidationMessages.Required),
  });

  navigateToUserRegister = () => {
    http.get("http://localhost:3000/users/protected", {
      withCredentials: true,
    });
    // http.get("https://jsonplaceholder.typicode.com/users", {
    //   withCredentials: true,
    // });
    this.props.history.push("/register");
  };

  render() {
    console.log(
      "this.loginFormSchema.default() =",
      this.loginFormSchema.default()
    );
    return (
      <div className="row loginWrapper">
        <div className="col-lg-12 col-md-12">
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <Formik
            initialValues={{ ...this.loginFormSchema.default() }}
            validationSchema={this.loginFormSchema}
            onSubmit={(values) => {
              authService.login(values).then(() => {
                // Emitter.emit("LOGIN", true);
                this.props.history.push("/portal/productList");
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              getFieldProps,
              isValid,
              /* and other goodies */
            }) => (
              <div className="row">
                <div className="col-lg-12">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <label className="form-label">Email</label>
                      <div className="col-lg-12">
                        <input
                          type="email"
                          name="email"
                          {...getFieldProps("email")}
                          className="form-control"
                        />
                        {errors.email && touched.email && (
                          <span className="error">{errors.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <label className="form-label">Password</label>
                      <div className="col-lg-12">
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          className="form-control"
                        />
                        {errors.password && touched.password && (
                          <span className="error">{errors.password}</span>
                        )}
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-lg-12 col-md-12">
                        <div className="d-grid gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary block"
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary block"
                            onClick={this.navigateToUserRegister}
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state,
});

export default connect(mapStateToProps)(Login);
