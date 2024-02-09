import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Heading, Input, Button, Text, FormControl, FormErrorMessage, Link, useToast } from '@chakra-ui/react';
import { login } from '../../services/auth';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const { authenticate } = useAuth();

    const onSubmit = async ({ email, password }) => {
        setIsLoading(true);
        setError('');
        try {
    await login(email, password);
            setIsLoading(false);
            navigate('/home');
            await authenticate(email, password);

        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            toast({
                title: "Login Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW={{ base: '100%', sm: '400px' }} mx="auto" mt="8" p="4" borderWidth="1px" borderRadius="lg">
            <Heading mb="4">Log In</Heading>
            {error && <Text color="red.500" mb="4">{error}</Text>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <Input type="email" placeholder="Email" {...register('email', { required: 'Username is required' })} />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl mt="4" isInvalid={errors.password}>
                    <Input type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <Button mt="4" type="submit" isLoading={isLoading} colorScheme="blue">Log In</Button>
            </form>
            <Text mt="4" fontSize="sm">Don't have an account? <Link color="blue.500" href="/signup">Sign up</Link></Text>
        </Box>
    );
};

export default Login;
