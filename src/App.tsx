import React from "react";
import { AppHeader } from "./components/AppHeader";
import { Editor } from "./editor/Editor";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="app-container">
        <Editor />
      </main>
    </div>
  );
}

export default App;
