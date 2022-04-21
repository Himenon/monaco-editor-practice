import * as React from "react";
import * as monaco from "monaco-editor";
import { Styles } from "./App.Styles";

function App() {
  React.useEffect(() => {
    monaco.editor.create(document.getElementById("container"), {
      value: 'console.log("Hello, world")',
      language: "javascript",
    });
  });

  return (
    <Styles>
      <div id="container"></div>
    </Styles>
  );
}

export default App;
