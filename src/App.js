import React, { components } from 'react';
import Articles from "./pages/Articles";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import Nav from "./components/Nav/Nav";


const App = () => (
  <div>
    <Nav />
    <Articles />
  </div>
);

export default App;
