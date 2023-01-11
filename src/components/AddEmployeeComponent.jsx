import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class AddEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      email: "",
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  changeFirstNameHandler = (e) => {
    this.setState({ firstName: e.target.value });
  };
  changeLastNameHandler = (e) => {
    this.setState({ lastName: e.target.value });
  };
  changeEmailHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    } else {
      EmployeeService.getEmployeesById(this.state.id).then((res) => {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        });
      });
    }
    // this.state.id === -1
    //   ? console.log("4")
    //   : EmployeeService.getEmployeesById(this.state.id).then((res) => {
    //       this.setState({
    //         firstName: res.data.firstName,
    //         lastName: res.data.lastName,
    //         email: res.data.email,
    //       });
    //     });
  }

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    console.log("employee => " + JSON.stringify(employee));

    if (this.state.id === "_add") {
      EmployeeService.addEmployee(employee).then((res) => {
        this.props.history.push("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
        this.props.history.push("/employees");
      });
    }
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Edit Employee</h3>;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                {this.getTitle()}
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        placeholder="First Name"
                        name="firstName"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={this.changeFirstNameHandler}
                      />
                      <label>Last Name</label>
                      <input
                        placeholder="Last Name"
                        name="lastName"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={this.changeLastNameHandler}
                      />
                      <label>Email</label>
                      <input
                        placeholder="Email"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.changeEmailHandler}
                      />
                    </div>
                    <button
                      className="btn btn-success"
                      onClick={this.saveOrUpdateEmployee}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancle
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AddEmployeeComponent;
