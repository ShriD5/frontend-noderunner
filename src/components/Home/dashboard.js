import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Flex, useToast } from '@chakra-ui/react';
import { createSandbox, getSandboxesByUser, deleteSandbox } from '../../services/api';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'; //

const SandboxPage = () => {
    const [sandboxes, setSandboxes] = useState([]);
    const toast = useToast();
    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSandboxes = async () => {
            try {
                console.log({userId})
                const sandboxesData = await getSandboxesByUser(userId);
                console.log({sandboxesData})
                setSandboxes(sandboxesData);
            } catch (error) {
                console.error('Error fetching sandboxes:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch sandboxes',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        fetchSandboxes();
    }, [userId, toast]);

    const handleCreateSandbox = async () => {
        try {
            const code = 'console.log("Hello, World!");';
            const newSandbox = await createSandbox(userId, code);
            setSandboxes([...sandboxes, newSandbox]);
            toast({
                title: 'Success',
                description: 'Sandbox created successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            // Redirect the user to the new sandbox's unique page
            // Assuming the sandbox's unique identifier is in newSandbox._id
            navigate(`/sandbox/${newSandbox._id}`);
        } catch (error) {
            console.error('Error creating sandbox:', error);
            toast({
                title: 'Error',
                description: 'Failed to create sandbox',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteSandbox = async (sandboxId) => {
        try {
            await deleteSandbox(sandboxId);
            setSandboxes(sandboxes.filter((sandbox) => sandbox._id !== sandboxId));
            toast({
                title: 'Success',
                description: 'Sandbox deleted successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting sandbox:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete sandbox',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={20}>
            <Heading mb="4">My Sandboxes</Heading>
            <Button mb="4" onClick={handleCreateSandbox}>Create Sandbox</Button>
            {sandboxes.length > 0 ? (
                <Flex flexWrap="wrap" justifyContent="center">
                    {sandboxes.map((sandbox) => (
                        <Box key={sandbox._id} p="4" borderWidth="1px" borderRadius="lg" boxShadow="lg" m="2" minWidth="250px">
                            <Text fontSize="lg">{sandbox.code}</Text>
                            {/*<Button colorScheme="red" mt="2" onClick={() => handleDeleteSandbox(sandbox._id)}>Delete</Button>*/}
                        </Box>
                    ))}
                </Flex>
            ) : (
                <Text>No existing sandboxes.</Text>
            )}
        </Box>
    );
};

export default SandboxPage;
