import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { Box, Flex, Button, VStack, useToast, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import * as sandboxService from "../../services/api";
import { executeCode } from "../../services/api";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'gray.800',
                color: 'white',
            },
        },
    },
});

const Sandbox = () => {
    let { sandboxId } = useParams();

    const [sandbox, setSandbox] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const editorRef = useRef(null);
    const terminalRef = useRef(null);
    const terminal = useRef(null);
    const toast = useToast();
    const [output, setOutput] = useState('');
    const [codeSaved, setCodeSaved] = useState(false);

    useEffect(() => {
        if (terminalRef.current && !terminal.current) {
            terminal.current = new Terminal({
                cursorBlink: true,
            });
            terminal.current.open(terminalRef.current);
        }
    }, [terminalRef.current]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await sandboxService.getSandboxById(sandboxId);
                setSandbox(data);
                setLoading(false);
            } catch (error) {
                setError(error.toString());
                setLoading(false);
            }
        };

        fetchData();
    }, [sandboxId]);

    useEffect(() => {
        if (sandbox && editorRef.current) {
            editorRef.current.setValue(sandbox.code);
        }
    }, [sandbox, editorRef.current]);

    const runCode = async () => {
        try {
            const code = editorRef.current.getValue();
            const result = await executeCode(code);
            setOutput(result);
            if (terminal.current) {
                terminal.current.writeln(`Output:\n${result.result}`);
            } if (!result) {
                toast({
                    title: 'No result',
                    description: 'Please check your code and try again',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error executing code:', error);
        }
    };

    const saveCode = async () => {
        try {
            const code = editorRef.current.getValue();
            const updatedSandbox = await sandboxService.updateSandbox(sandboxId, code, output);
            toast({
                title: 'Code saved.',
                description: 'Your code has been successfully saved.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setSandbox({ ...sandbox, code: updatedSandbox.code });
            editorRef.current.setValue(updatedSandbox.code);
        } catch (error) {
            console.error('Error saving code:', error);
            toast({
                title: 'Error',
                description: 'Failed to save code.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Flex height="100vh" overflow="hidden" direction="column" p="2">
                <Flex flex="1" overflow="hidden">
                    <Box flex="1" p="2">
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            defaultValue="// Write your JavaScript code here"
                            theme="vs-dark"
                            onMount={(editor) => {
                                editorRef.current = editor;
                            }}
                        />
                    </Box>
                    <VStack flex="1" p="2" spacing="4">
                        <Box flex="1" width="100%" backgroundColor="gray.700">
                            <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />
                        </Box>
                        <Button colorScheme="blue" onClick={runCode} alignSelf="start">
                            Run Code
                        </Button>
                        <Button colorScheme="green" onClick={saveCode} alignSelf="start">
                            {codeSaved ? 'Code Saved' : 'Save Code'}
                        </Button>
                    </VStack>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
};

export default Sandbox;
