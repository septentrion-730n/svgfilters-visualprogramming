import React from "react";
import { Editor } from "./editor/Editor";

function App() {
  return (
    <div className="app">
      <header className="app-header">header</header>
      <main className="app-container">
        <Editor />
      </main>
    </div>
  );
}

export default App;
