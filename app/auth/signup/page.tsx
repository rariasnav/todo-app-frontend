'use client';

import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import styled from "styled-components";


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #34495e;
    color: #ecf0f1;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background-color: #2c3e50;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #ecf0f1;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 0.8rem;
    margin-bottom: 1.5rem;
    border: 1px solid #95a5a6;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 5px #3498db;
    }
`;

const Button = styled.button`
    background-color: #e74c3c;
    color: #fff;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b;
    }

    &:focus {
        outline: none;
    }
`;

const SignUpPage: React.FC = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await axiosInstance.post("/api/auth/register", data);
            alert("User registered successfully. You can now log in.");
            reset();
        } catch (error: any) {
            console.error("Sign-up failed:", error.response?.data?.message || error.message);
            alert("Sign-up failed. Please try again.");
        }
    };

    return(
        <FormContainer>
            <Form 
                onSubmit={handleSubmit(onSubmit)} 
                style={{ maxWidth: "400px", margin: "0 auto" }}
            >
                <Title>Sign Up</Title>
                <Label htmlFor="name">Name</Label>
                <Input 
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your name"
                    type="text" 
                />

                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Your email"
                    type="email" 
                />

                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password"
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    placeholder="Your password"
                    type="password" 
                />
                <Button type="submit">Sign Up</Button>
            </Form>
        </FormContainer>
    );
};

export default SignUpPage;