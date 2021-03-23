import React from "react";
import axios from "axios";

let SingleData = []
const Student = () => {
    let initData = axios
      .get("http://localhost:3000/students/ ")
      .then((response) => {
        SingleData = response.data
        console.log(SingleData, "yoyoy");

const element = () => {
        for (let i = 0 ; i < SingleData.lenth ; i++){
            
        }
        }
      })
      ;

  return (
<div class="container">
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Image</th>
      </tr>
    </thead>
    <tbody id="data">

    </tbody>
  </table>
</div>
  );
};
export default Student;
