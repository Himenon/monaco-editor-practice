import * as React from "react";
import { Styles } from "./App.Styles";
import Editor, { Monaco } from "@monaco-editor/react";
import type * as monaco from "monaco-editor/esm/vs/editor/editor.api";

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

interface MonacoEditorRef {
  editor: monaco.editor.IStandaloneCodeEditor;
  monaco: Monaco;
}

/**
 * @see https://stackoverflow.com/questions/68342605/monaco-editor-deltadecorations-changes-the-style-of-the-whole-text-instead-of-ju
 */
const generateRangeError = ({ editor, monaco }: MonacoEditorRef) => {
  console.log("hello");
  // editor.deltaDecorations(
  //   [],
  //   [
  //     {
  //       range: new monaco.Range(1, 3, 3, 1),
  //       options: {
  //         isWholeLine: true,
  //         className: "myContentClass",
  //         glyphMarginClassName: "myGlyphMarginClass",
  //       },
  //     },
  //   ]
  // );
  const textModel = editor.getModel();
  if (!textModel) {
    return;
  }
  /**
   * @see https://github.com/microsoft/monaco-editor/issues/790
   */
  monaco.editor.setModelMarkers(textModel, "test", [
    {
      startLineNumber: 2,
      startColumn: 1,
      endLineNumber: 2,
      endColumn: 10,
      message: "Hello world!",
      severity: monaco.MarkerSeverity.Warning,
    },
  ]);
};

function App() {
  const editorRef = React.useRef<MonacoEditorRef | null>(null);
  React.useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    generateRangeError(editorRef.current);
  }, [editorRef]);
  return (
    <Styles>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="typescript"
        defaultValue={dummyCode}
        onMount={(editor, monaco) => {
          editorRef.current = {
            editor,
            monaco,
          };
        }}
      />
    </Styles>
  );
}

export default App;
