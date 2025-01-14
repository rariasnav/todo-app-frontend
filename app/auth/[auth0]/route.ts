import { handleAuth } from '@auth0/nextjs-auth0';


console.log('Auth0 API route initialized');

export const GET = handleAuth();
export const POST = handleAuth();