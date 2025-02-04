# ToDo Frontend

This is the frontend of the ToDo application, built with Next.js, React, and TypeScript.

## Features

- User authentication with JWT
- Task management:
  - Create, Read, Update, Delete tasks
  - State management using Redux Toolkit
- Styled with Styled Components
- Unit tests for critical components
- Yup and React Hook Form validations.

## Technologies Used

- **Next.js**: React framework
- **TypeScript**: Static typing
- **Redux Toolkit**: State management
- **Redux Persist**: Redux State persistence 
- **Styled Components**: Styling
- **React Hook Form**: Form handling
- **Yup**: Advanced Form Validations
- **Jest**: Testing framework

## JWT Authentication

- Authentication in the application is based on JSON Web Tokens (JWT):
  - The user registers (/api/auth/register) or logs in (/api/auth/login).
  - If the credentials are correct, the backend returns a JWT.
  - The JWT is stored in Redux and localStorage for persistence.
  - Whenever the user makes an authenticated request (such as fetching or updating tasks), the token is sent in the Authorization: Bearer <TOKEN> header.
  - If the token expires or is invalid, the user is redirected to the login page.
  
## Files structure
todo-frontend/
│-- app/
│   ├── auth/                       # Authentication (Login, Signup)
│   │   ├── login/  
|   │   │   ├── page.tsx
│   │   ├── signup/
|   │   │   ├── page.tsx  
│   ├── components/                 # Reusables components
│   │   ├── ErrorMessage.tsx        # To show errors in UI
│   │   ├── Navbar.tsx      
│   │   ├── TaskForm.tsx            # Form to add tasks
│   │   ├── TaskItem.tsx            # Taks list elements
│   ├── features/                   # Redux slices
│   │   ├── authSlice.ts            # JWT authentication management
│   │   ├── taskSlice.ts            # Task management in Redux
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.ts              # Hook to manage authentication
│   ├── utils/                      # Utils
│   │   ├── axiosInstance.ts        # Axios config
│   │   ├── validation.ts           # Yup validations
│   ├── layout.tsx                  # Layout
│   ├── index.tsx                   # Main page
│   ├── store.ts                    # Redux config
│-- tests/                          # Unit tests
│-- .env.local                      # Enviroment variables
│-- .gitignore                      # Ignore no necessary files
│-- jest.config.js                  # Jest config for unit tests
│-- jest.setup.js                   # Additional jest config
│-- next-env.d.ts                   # Next.js config for TypeScript
│-- next.config.js                  # Next.js config
│-- package.json                    # Project dependencies
│-- tsconfig.json                   # TypeScript config
│-- README.md                       



## Setup Instructions

### Prerequisites

- Node.js installed
- Backend running and accessible

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-frontend.git
   cd todo-frontend

2. Install dependencies:
    $ npm install

3. Create an .env.local file:
   $ cp .env.example .env.local

Update the environment variables:
-   NEXT_PUBLIC_API_BASE_URL=<Backend Base URL>

## Running the Server

1. Start the development server:
    $ npm run dev

2. Build for production:
    $ npm run build

3. Start the production server:
   $ npm start

## Running the Server
To run unit tests:
    $ npm test
    