import React, { Component } from "react";
import { Redirect } from 'react-router-dom';



class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      isLoading: false,
      isError: false,
      redirect:false,
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

  renderTableHeader = () => {
    return Object.keys(this.state.students[0]).map(attr => <th key = {attr}>{attr.toUpperCase() }</th> )
  }

  renderTableRows = () => {
    return this.state.students.map(student => {
      return (
        <tr key={student.id}>
          <td>{student.id}</td>
            <td>{student.FirstName}</td>
            <td>{student.LastName}</td>
            <td>{student.age}</td>
            <td>{student.Gender}</td>
            <td>{student.image}</td>
            <td><button>delete</button></td>
            <td><button>edit</button></td>
        </tr>
      )
    })
  }

  render() {
   
    const {students,isLoading,isError} = this.state
    if (isLoading){
      return <div> Loading ...</div>
    }
    if (isError){
      return <div> Error ...</div>
    }

    return students.length > 0
    ? (
      <>
      <div>
      <button>Add Student</button>
      </div>
      <table>
        <thead>
          <tr>
              {this.renderTableHeader()}
          </tr>
        </thead>
        <tbody>
        {this.renderTableRows()}
        </tbody>
      </table>
      </>
    ) : (
      <div>No Students</div>
      )
    }
  }

export default Student;
