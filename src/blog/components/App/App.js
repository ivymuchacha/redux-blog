import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Provider, useDispatch } from "react-redux";
import Navbar from "../Navbar";
import Homepage from "../Pages/Homepage";
import LoginPage from "../Pages/Loginpage";
import RegisterPage from "../Pages/RegisterPage";
import NewPost from "../Pages/NewPost";
import PostList from "../Pages/PostList";
import EditPost from "../Pages/EditPost";
import Page from "../Pages/Page";
import AboutPage from "../Pages/About";
import { getAuthToken, MEDIA_QUERY } from "../../utils";
import store from "../../redux/store";
import { getMeUser } from "../../redux/reducers/userReducer";

const Root = styled.div`
  padding-top: 64px;
  ${MEDIA_QUERY} {
    padding-top: 130px;
  }
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      dispatch(getMeUser());
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Root>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/post-list">
              <PostList />
            </Route>
            <Route exact path="/new-post">
              <NewPost />
            </Route>
            <Route exact path="/post/:id">
              <Page />
            </Route>
            <Route exact path="/edit-post/:id">
              <EditPost />
            </Route>
          </Switch>
        </Router>
      </Root>
    </Provider>
  );
}

export default App;
