import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import { signup, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [types, setTypes] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    dispatch(
      signup(
        { email, password, firstName, lastName, phoneNumber, gender, types },
        () => setLoading(false)
      )
    );
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="First name"
            label="First name"
          />
          <Input
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            placeholder="Last name"
            label="Last name"
          />
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Input
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
            placeholder="Phone Number"
            label="Phone Number"
          />
          <Input
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.currentTarget.value)}
            placeholder="Gender"
            label="Gender"
          />
          <Input
            name="types"
            value={types}
            onChange={(e) => setTypes(e.currentTarget.value)}
            placeholder="Types"
            label="Types"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
            label="Password"
          />
          <Button
            text={loading ? "Loading..." : "Sign Up"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  );
};

export default SignUp;
