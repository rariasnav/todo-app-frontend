import React from "react";
import { Container } from "./style";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <Container>{message}</Container>;
};

export default ErrorMessage;