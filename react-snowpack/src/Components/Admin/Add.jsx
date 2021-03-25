import React from "react";
import { Button } from "antd";
import axios from "axios";

const obj = {};

const handelchange = (e) => {
  obj["FirstName"] = e.target.value;
  console.log(obj);
};
const handelchange1 = (e) => {
  obj["LastName"] = e.target.value;
  console.log(obj);
};
const handelchange2 = (e) => {
  obj["age"] = e.target.value;
  console.log(obj);
};
const handelchange3 = (e) => {
  obj["Gender"] = e.target.value;
  console.log(obj);
};

const selectImage = (event) => {
  let pic = event.target.files[0];
  console.log(pic);
  var formData = new FormData();
  formData.append("file", pic);
  formData.append("upload_preset", "cloudyy");
  axios
    .post("https://api.cloudinary.com/v1_1/dgqiognni/image/upload", formData)
    .then((response) => {
      console.log(response.data.url);
      obj["image"] = response.data.url;
    })
    .catch((err) => console.log(err));
};

// const handelchange4 = (e) => {
//     obj['image'] = e.target.value;
//     console.log(obj);
//   };
const handelClick = () => {
  axios
    .post("http://localhost:3000/students/", obj)
    .then((response) => {
      console.log(response, "hakuna matata");
    },location.reload())
    .catch((err) => {
      console.log(err);
    });
};

const Add = () => {
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div className="main">
        <h1 className="has-text-centered is-size-2 mb-3">Student INFO</h1>
        <form>
          <input
            type="text"
            name="FirstName"
            placeholder="FirstName"
            label="FirstName"
            onChange={handelchange}
          />
          <input
            type="text"
            name="LastName"
            placeholder="LastName"
            label="LastName"
            onChange={handelchange1}
          />
          <input
            type="number"
            name="age"
            placeholder="age"
            label="age"
            onChange={handelchange2}
          />
          <input
            type="text"
            name="Gender"
            placeholder="Gender"
            label="Gender"
            onChange={handelchange3}
          />
          {/* <input
            type="text"
            name="image"
            placeholder="image"
            label="image"
            onChange={handelchange4}
          /> */}
          <input type="file" onChange={selectImage} />
          <br />
          <Button
            className="is-primary is-fullwidth mt-5"
            onClick={handelClick}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Add;
