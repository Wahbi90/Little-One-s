import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import Header from './src/Component/sections/Header';
import SignUp from './src/Component/Pages/SignUp';
import SignIn from './src/Component/Pages/SignIn';
import ForgotPassword from './src/Component/Pages/ForgotPassword';
import Homepage from './src/Component/Pages/HomePage';
import Dashboard from './src/Component/Pages/Dashbord';
import PrivateRoute from './src/Component/auth/PrivateRoute';
import PublicRoute from './src/Component/auth/PublicRoute';
import Loader from './src/Component/UI/Loader';
import firebase from './src/firebase/config';
import { getUserById, setLoading, setNeedVerification } from './src/store/actions/authActions';
import { RootState } from './src/store';

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if(user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if(!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if(loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;