'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAuthDispatch";
import { loginUser, clearError } from "../../features/authSlice";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";
import { loginSchema } from "../../utils/validation";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { 
    FormContainer, 
    Form, 
    Title, 
    Label, 
    Input, 
    ErrorText, 
    Button 
} from "./style";


const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state: RootState) => state.auth);

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