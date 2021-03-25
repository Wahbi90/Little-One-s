import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Card, Col, Space, Row, Button } from "antd";
import Grid from "antd/lib/card/Grid";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      isError: false,
      redirect: false,
      Search: "",
      obj: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const response = await fetch("http://localhost:3000/students/");
    if (response.ok) {
      const studentsList = await response.json();
      this.setState({ students: studentsList, isLoading: false });
    } else {
      this.setState({ isError: true, isLoading: false });
    }
  }

  FirstNameUpdate = (studentId, event) => {
    let selectedStudent = this.state.students.find(
      (element) => element.id == studentId
    );
    console.log("myStudent", selectedStudent);
    selectedStudent.FirstName = event.target.value;
    console.log(this.state.students, "hay ka3bet el students");
  };
  LastNameUpdate = (studentId, event) => {
    let selectedStudent = this.state.students.find(
      (element) => element.id == studentId
    );
    console.log("myStudent", selectedStudent);
    selectedStudent.LastName = event.target.value;
    console.log(this.state.students, "hay ka3bet el students");
  };
  ageUpdate = (studentId, event) => {
    let selectedStudent = this.state.students.find(
      (element) => element.id == studentId
    );
    console.log("myStudent", selectedStudent);
    selectedStudent.age = event.target.value;
    console.log(this.state.students, "hay ka3bet el students");
  };
  genderUpdate = (studentId, event) => {
    let selectedStudent = this.state.students.find(
      (element) => element.id == studentId
    );
    console.log("myStudent", selectedStudent);
    selectedStudent.Gender = event.target.value;
    console.log(this.state.students, "hay ka3bet el students");
  };

  updateImage = (studentId, event) => {
    let pic = event.target.files[0];
    console.log(pic);
    var formData = new FormData();
    formData.append("file", pic);
    formData.append("upload_preset", "cloudyy");
    axios
      .post("https://api.cloudinary.com/v1_1/dgqiognni/image/upload", formData)
      .then((response) => {
        console.log(response.data.url);
        let selectedStudent = this.state.students.find(
          (element) => element.id == studentId
        );
        console.log("myStudent", selectedStudent);
        selectedStudent.image = response.data.url;
      })
      .catch((err) => console.log(err));
  };

  handelsearch = (e) => {
    this.state.Search = e.target.value;
    console.log(this.state.Search, "hedhi el search");
  };

  // confirmSearch = (Search) => {
  //   axios
  //     .get("http://localhost:3000/students/"+Search)
  //     .then((response) => {
  //       console.log(response, "searched student");
  //       this.setState({ students: studentsList });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  handelEdit = (e) => {
    let selectedStudent = this.state.students.find(
      (element) => element.id === e
    );
    console.log("student", selectedStudent);
    axios
      .put("http://localhost:3000/students/" + e, selectedStudent)
      .then((response) => {
        console.log(response, "hakuna matata");
      }, location.reload())
      .catch((err) => {
        console.log(err);
      });
  };

  handelDelete = (e) => {
    console.log(e);
    axios
      .delete("http://localhost:3000/students/" + e)
      .then(
        (response) => console.log("response from server", response),
        location.reload()
      )
      .catch((err) => console.log(err, "from server"));
  };

  renderTableRows = () => {
    return this.state.students
      // .filter((ele) => {
      //   if (this.state.Search === "") {
      //     return ele;
      //   } else if (
      //     ele.FirstName.toLowerCase().includes(this.state.Search.toLowerCase())
      //   ) {
      //     return ele;
      //   }
      // })
      .map((student) => {
        return (
          <Row style={{ marginTop: 100 }} key={student.id} span={4}>
            <Col style={{ paddingLeft: "20px" }} key={student.id} span={4}>
              <Card
                hoverable
                style={{ width: 170 }}
                cover={
                  <img
                    alt="example"
                    src={student.image}
                    style={{ height: "170px", width: "300px" }}
                  />
                }
                title="Personal information"
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
              >
                <p> First Name : {student.FirstName}</p>
                <p> Last Name : {student.LastName}</p>
                <p> Age : {student.age}</p>
                <p> Gender : {student.Gender}</p>
                <div>
                  <button onClick={this.handelDelete.bind(this, student.id)}>
                    Delete
                  </button>
                  <button>Edit</button>
                </div>
                <div>
                  <form>
                    <input
                      type="text"
                      name="FirstName"
                      placeholder="FirstName"
                      label="FirstName"
                      onChange={this.FirstNameUpdate.bind(this, student.id)}
                    />
                    <input
                      type="text"
                      name="LastName"
                      placeholder="LastName"
                      label="LastName"
                      onChange={this.LastNameUpdate.bind(this, student.id)}
                    />
                    <input
                      type="number"
                      name="age"
                      placeholder="age"
                      label="age"
                      onChange={this.ageUpdate.bind(this, student.id)}
                    />
                    <input
                      type="text"
                      name="Gender"
                      placeholder="Gender"
                      label="Gender"
                      onChange={this.genderUpdate.bind(this, student.id)}
                    />
                    <input
                      type="file"
                      onChange={this.updateImage.bind(this, student.id)}
                    />
                    <br />
                  </form>
                  <Button
                    className="is-primary is-fullwidth mt-5"
                    onClick={this.handelEdit.bind(this, student.id)}
                  >
                    confirm
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        );
      });
  };

  render() {
    const { students, isLoading, isError } = this.state;
    if (isLoading) {
      return <div> Loading ...</div>;
    }
    if (isError) {
      return <div> Error ...</div>;
    }

    return students.length > 0 ? (
      <>
        <div>
          <button>Add Student</button>
        </div>
        <div>
          <h4>Search by First Name</h4>
          <input
            type="text"
            name="Search"
            placeholder="Search"
            label="Search"
            onChange={this.handelsearch.bind(this)}
          />
          {/* <button onClick={this.confirmSearch.bind(this)}>Search</button> */}
        </div>
        <div
          className="container"
          style={{
            zIndex: "1",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {this.renderTableRows()}
        </div>
      </>
    ) : (
      <div>No Students</div>
    );
  }
}

export default Student;
