import React from 'react';
import { SearchingField } from "./Components/searchString";
import "./Style.css"
import { MainContent } from "./Components/content";


function App() {
  return (
    <div className="App">
      <SearchingField></SearchingField>
      <MainContent></MainContent>
    </div>
  );
}

export default App;