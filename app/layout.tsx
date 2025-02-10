'use client';

import React, { ReactNode } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './store';
import Navbar from './components/Navbar/Navbar';

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <body>
                        <Navbar />
                        {children}
                    </body>
                </PersistGate>
            </Provider>
        </html>
    );
}