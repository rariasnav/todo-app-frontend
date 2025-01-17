'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { login } from "../../features/authSlice";
import { useRouter } from "next/navigation";
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

const LoginPage: React.FC = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", data);
            dispatch(login(response.data.token));
            alert("Login successful!");
            reset();
            router.push("/");
        } catch (error: any) {
            console.error("Login failed", error.response?.data?.message || error.message);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return(
        <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "0 auto" }}>
                <Title>Login</Title>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                    type="email"
                />

                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                    type="password"
                />
                
                <Button type="submit">Login</Button>
            </Form>
        </FormContainer>
    );
};

export default LoginPage;