import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "../UI/Message";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import Student from "./Student";

const Admin: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
    console.log(user, "mo3");
  }, [success, dispatch]);

  return (
    <section className="section">
      <Student />
    </section>
  );
};

export default Admin;
