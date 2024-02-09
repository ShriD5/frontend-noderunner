// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Box, Heading, Input, Button, Text, FormControl, FormErrorMessage, Link, useToast} from '@chakra-ui/react';
import { signup } from '../../services/auth';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = async ({email, password}) => {
        setIsLoading(true);
        setError('');
        try {
            await signup(email,password);
            setIsLoading(false);
            navigate('/');
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
            <Heading mb="4">Create an Account</Heading>
            {error && <Text color="red.500" mb="4">{error}</Text>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                    <Input type="email" placeholder="Email" {...register('email', { required: 'Email is required' })} />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl mt="4" isInvalid={errors.password}>
                    <Input type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <Button mt="4" type="submit" isLoading={isLoading} colorScheme="blue">Sign Up</Button>
            </form>
            <Text mt="4" fontSize="sm">Already have an account? <Link color="blue.500" href="/login">Log in</Link></Text>
        </Box>
    );
};

export default Signup;
