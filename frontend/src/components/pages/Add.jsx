import React, { useState } from "react";
// import { Button } from "antd";
import axios from "axios";
import Drawer from "react-drag-drawer";
import "./Add.css";
import Input from "../UI/Input";
import Button from "../UI/Button";

const Add = () => {
  const [toggle, setToggle] = useState(false);
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

  const handelchange4 = (e) => {
    obj["comment"] = e.target.value;
    console.log(obj);
  };

  const fetchData = () => {
    axios
      .get("http://localhost:4000/students/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/students/", obj)
      .then((response) => {
        console.log(response, "hakuna matata");
        fetchData();
        setToggle(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const open = () => {
    setToggle(true);
  };

  const Close = () => {
    setToggle(false);
  };

  return (
    <button onClick={open}>
      <span>Add Student</span>
      <Drawer open={toggle}>
        <div className="container">
          <br />
          <br />
          <br />
          <div className="main">
            <h1 className="has-text-centered is-size-2 mb-3" style={{ color: "white" }}>Student INFO</h1>
            <form>
              <div style={{ color: "white" }}>
                <Input
                  type="text"
                  name="FirstName"
                  placeholder="FirstName"
                  label="FirstName"
                  onChange={handelchange}
                />
                <Input
                  type="text"
                  name="LastName"
                  placeholder="LastName"
                  label="LastName"
                  onChange={handelchange1}
                />
                <Input
                  type="number"
                  name="age"
                  placeholder="age"
                  label="age"
                  onChange={handelchange2}
                />
                <Input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  label="Gender"
                  onChange={handelchange3}
                />
                <Input
                  type="text"
                  name="comment"
                  placeholder="comment"
                  label="comment"
                  onChange={handelchange4}
                />
                <input type="file" onChange={selectImage} />
                <br />
                <Button
                  text={"Submit"}
                  className="is-primary is-fullwidth mt-5"
                  onClick={handelClick}
                />
              </div>
            </form>
          </div>
        </div>

        <Button
          text={"Close"}
          className="is-primary is-fullwidth mt-5"
          onClick={Close}
        />
      </Drawer>
    </button>
  );
};

export default Add;
