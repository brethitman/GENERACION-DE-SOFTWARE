// src/types/editor.ts
export interface EditorChain {
  focus: () => EditorCommandsWithRun;
}

export interface EditorCommandsWithRun {
  toggleBold: () => EditorCommandsWithRun;
  toggleItalic: () => EditorCommandsWithRun;
  toggleUnderline: () => EditorCommandsWithRun;
  setColor: (color: string) => EditorCommandsWithRun;
  run: () => void;
}

export interface EditorInstance {
  commands: {
    setContent: (html: string) => void;
    insertContent: (html: string) => void;
  };
  chain: () => EditorChain;
}
