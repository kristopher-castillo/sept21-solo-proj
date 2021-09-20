import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import NotesPage from "./components/NotesPage";
import NotesDetail from "./components/NotesDetail";
import NotebooksPage from "./components/NotebooksPage";
import NotebooksDetail from "./components/NotebooksDetail";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded}/>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/notes" exact>
          <NotesPage />
        </Route>
        <Route path="/notes/:id">
          <NotesDetail />
        </Route>
        <Route path="/notebooks" exact>
          <NotebooksPage />
        </Route>
        <Route path="/notebooks/:id">
          <NotebooksDetail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
