'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../features/authSlice";
import { RootState, AppDispatch } from "../../store";
import { useRouter } from "next/navigation";
import { loginSchema } from "../../utils/validation";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";


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

const ErrorText = styled.p`
    color: red;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;


const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async (data: { email: string; password: string }) => {
        const resultAction = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(resultAction)) {
            router.push("/");
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>Login</Title>
                
                {error && <ErrorMessage message={error} />}

                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} placeholder="Enter your email" type="email" />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

                <Label htmlFor="password">Password</Label>
                <Input id="password" {...register("password")} placeholder="Enter your password" type="password" />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                <Button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </Form>
        </FormContainer>
    );
};

export default LoginPage;