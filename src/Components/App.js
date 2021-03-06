import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Signin from "./Signin";
import Header from "./Header";
import Home from "./Home";
import NewPost from "./NewPost";

function App() {
  const [state, setState] = useState({
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  });

  function signout() {
    setState({ isLoggedIn: false, user: null, isVerifying: true });
    localStorage.removeItem("app__user");
  }

  let storageKey = localStorage["app__user"];

  useEffect(() => {
    if (storageKey) {
      fetch("https://accelerate-task-backend.herokuapp.com/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: `${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      setState({ isVerifying: false });
    }
  }, [storageKey]);

  function updateUser(user) {
    setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem("app__user", user.token);
  }

  return (
    <div>
      <Router>
        <Header isLoggedIn={state.isLoggedIn} Signout={signout} />

        {state.isLoggedIn ? (
          <AuthenticatedApp user={state.user} updateUser={updateUser} />
        ) : (
          <UnAuthenticatedApp updateUser={updateUser} />
        )}
      </Router>
    </div>
  );
}

function AuthenticatedApp(props) {
  return (
    <Routes>
      {" "}
      <Route
        path="/"
        exact
        element={
          <Home
            user={props.user}
          />
        }
      ></Route>
      <Route path="/newpost" exact element={<NewPost />}></Route>
    </Routes>
  );
}
function UnAuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route
        path="/Signin"
        exact
        element={<Signin updateUser={props.updateUser} />}
      ></Route>
      <Route
        path="/Signup"
        exact
        element={<Signup updateUser={props.updateUser} />}
      ></Route>
    </Routes>
  );
}
export default App;
