import * as React from "react";
import { Styles } from "./App.Styles";
import Editor from "@monaco-editor/react";

function App() {
  return (
    <Styles>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </Styles>
  );
}

export default App;
