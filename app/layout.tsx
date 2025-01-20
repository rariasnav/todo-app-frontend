'use client';

import React, { ReactNode } from 'react';
import { Provider } from "react-redux";
import { store } from './store';
import Navbar from './components/Navbar';

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <Provider store={store}>
                <body>
                    <Navbar />
                    {children}
                </body>
            </Provider>
        </html>
    );
}