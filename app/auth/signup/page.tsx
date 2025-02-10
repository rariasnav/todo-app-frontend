'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../hooks/useAuthDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registerUser, clearError } from "../../features/authSlice";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";
import { signupSchema } from "../../utils/validation";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { 
    FormContainer,
    Form,
    Title,
    Label,
    Input,
    Button
} from "./style";


const SignUpPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(signupSchema) });

    const onSubmit = async (data: { name: string; email: string; password: string }) => {
        const resultAction = await dispatch(registerUser(data));

        if (registerUser.fulfilled.match(resultAction)) {
            alert("User registered successfully. You can now log in.");
            reset();
            router.push("/auth/login");
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    return(
        <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>Sign Up</Title>
                {error && <ErrorMessage message={error} />}
                
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="Your name" type="text" />
                <p style={{ color: "red" }}>{errors.name?.message}</p>

                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} placeholder="Your email" type="email" />
                <p style={{ color: "red" }}>{errors.email?.message}</p>

                <Label htmlFor="password">Password</Label>
                <Input id="password" {...register("password")} placeholder="Your password" type="password" />
                <p style={{ color: "red" }}>{errors.password?.message}</p>

                <Button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</Button>
            </Form>
        </FormContainer>
    );
};

export default SignUpPage;