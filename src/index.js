import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// import { Router, Route, IndexRoute, browserHistory } from "react-router";

// NotesApp store and Container
import noteStore from "./app/redux/notesStore";
import NotesContainer from "./app/notes";

ReactDOM.render(
  <Provider store={noteStore}>
    <NotesContainer />
  </Provider>,
  document.getElementById("root")
);
