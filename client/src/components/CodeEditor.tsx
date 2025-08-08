import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useRef } from 'react'
import * as monaco from 'monaco-editor'
import { useTerminalSocket } from '@/context/TerminalSocketContext'

type CodeEditorProps = {
    selectedFile: string;
    code: string;
    language: string;
    setCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ selectedFile, code, language, setCode }) => {

    const {socket} = useTerminalSocket();
    const [terminalConnected, setTerminalConnected] = useState(false);

    const handleCodeChange = (code: string) => {
        setCode(code);
        socket?.emit('file:change', { filePath: selectedFile, content: code });
        if(code == ''){
            socket?.emit('file:change', { filePath: selectedFile, content: "\0" });
        }
    }
    
    useEffect(() => {
        if(socket){
            setTerminalConnected(true);
        }
        else{
            setTerminalConnected(false);
        }
    }, [socket])

    useEffect(() => {
        if(terminalConnected){

            if(code && socket){
                const timer = setTimeout(() => {
                    console.log(`Emitting file change for ${selectedFile}`);
                    socket.emit('file:change', { filePath: selectedFile, content: code });
                }, 2000)
                return () => {
                    clearTimeout(timer);
                }
            }
        }
    }, [socket, terminalConnected])

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) {
        editorRef.current = editor;
        // console.log(monaco)
    }

    const options: any = {
        padding: { top: 12, bottom: 12 },
        theme: 'vs-dark',
        fontFamily: 'Fira Code, Menlo, Monaco, "Courier New", monospace',
        fontLigatures: true,
        fontSize: 15,
        lineHeight: 24,
        automaticLayout: true,
        minimap: {
            enabled: true,
            side: 'right',
            scale: 1,
            size: 'proportional',
        },
        bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
        },
        codeLens: {
            enabled: true,
        },
        lineNumbers: 'on',
        scrollbar: {
            horizontalSliderSize: 6,
            verticalSliderSize: 6,
            alwaysConsumeMouseWheel: false,
        },
        cursorStyle: 'line',
        cursorBlinking: 'phase',
        wordWrap: 'on',
        wrappingIndent: 'same',
        smoothScrolling: true,
        renderWhitespace: 'selection',
        tabSize: 2,
        insertSpaces: true,
        mouseWheelZoom: true,
        scrollBeyondLastLine: true,
        overviewRulerBorder: false,
        quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'smart',
    };



    return (
        <Editor
            height="100%"
            width="100%"
            theme='vs-dark'
            language={language}
            value={code}
            options={options}
            onChange={(value) => {
                handleCodeChange(value || '');
            }}

            onMount={handleEditorDidMount}

        />
    )
}

export default CodeEditor