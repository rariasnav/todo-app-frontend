import { ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <UserProvider>
                <body>{children}</body>
            </UserProvider>
        </html>
    );
}