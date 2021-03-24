import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Card, Col, Space, Row, Button } from "antd";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      isError: false,
      redirect: false,
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
  
  handleUpdate = (e) => {
    this.state.students["FirstName"] = e.target.value;
    console.log(this.state.students);
  };
  handleUpdate1 = (e) => {
    this.state.students["LastName"] = e.target.value;
    console.log(this.state.students);
  };
  handleUpdate2 = (e) => {
    this.state.students["age"] = e.target.value;
    console.log(this.state.students);
  };
  handleUpdate3 = (e) => {
    this.state.students["Gender"] = e.target.value;
    console.log(this.state.students);
  };

  updateImage = (event) => {
    let pic = event.target.files[0];
    console.log(pic);
    var formData = new FormData();
    formData.append("file", pic);
    formData.append("upload_preset", "cloudyy");
    axios
      .post("https://api.cloudinary.com/v1_1/dgqiognni/image/upload", formData)
      .then((response) => {
        console.log(response.data.url);
        this.state.students["image"] = response.data.url;
      })
      .catch((err) => console.log(err));
  };

  handelEdit = (e) => {
    console.log("sending", this.state.students);
    axios
      .put("http://localhost:3000/students/" + e, this.state.students)
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
    return this.state.students.map((student) => {
      return (
        <div style={{ display:"grid" }}>
        <Row style={{ marginLeft: 200, marginTop: 100 }} key={student.id}>
          <Col style={{ paddingLeft: "40px" }} key={student.id} span={4}>
            <Space size={this.state.size}>
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
                    delete
                  </button>
                </div>
                <div>
                  <form>
                    <input
                      type="text"
                      name="FirstName"
                      placeholder="FirstName"
                      label="FirstName"
                      onChange={this.handleUpdate.bind(this)}
                    />
                    <input
                      type="text"
                      name="LastName"
                      placeholder="LastName"
                      label="LastName"
                      onChange={this.handleUpdate1.bind(this)}
                    />
                    <input
                      type="number"
                      name="age"
                      placeholder="age"
                      label="age"
                      onChange={this.handleUpdate2.bind(this)}
                    />
                    <input
                      type="text"
                      name="Gender"
                      placeholder="Gender"
                      label="Gender"
                      onChange={this.handleUpdate3.bind(this)}
                    />
                    <input type="file" onChange={this.updateImage.bind(this)} />
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
            </Space>
          </Col>
        </Row>
        </div>
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
        <div className="container" style={{ zIndex: "1" }}>
          <button>Add Student</button>
        </div>
        {/*        
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead> */}
        <div>{this.renderTableRows()}</div>
      </>
    ) : (
      <div>No Students</div>
    );
  }
}

export default Student;
