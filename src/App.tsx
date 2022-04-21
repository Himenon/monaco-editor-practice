import { Styles } from "./App.Styles";
import Editor from "@monaco-editor/react";

const dummyCode = `export const sum = (list: (number | string)[]) => {
  return list.reduce<number>((total, value) => {
    if (typeof value === "number") {
      return total + value;
    }
    try {
      const numberValue = parseFloat(value);
      return total + numberValue;
    } catch (error) {
      return total;
    }
  }, 0);
};
`;

function App() {
  return (
    <Styles>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="typescript"
        defaultValue={dummyCode}
      />
    </Styles>
  );
}

export default App;
