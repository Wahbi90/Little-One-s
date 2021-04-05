import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { RootState } from "../../store";

interface Props extends RouteProps {
  component: any;
}

const AdminRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  console.log(user, "mo2");

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated && user?.userType === "Admin" ? (
          <Component {...props} />
        ) : null
      }
    />
  );
};

export default AdminRoute;
