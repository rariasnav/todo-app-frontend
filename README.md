# ToDo Frontend

This is the frontend of the ToDo application, built with Next.js, React, and TypeScript.

## Features

- User authentication with JWT
- Task management:
  - Create, Read, Update, Delete tasks
  - State management using Redux Toolkit
- Styled with Styled Components
- Unit tests for critical components

## Technologies Used

- **Next.js**: React framework
- **TypeScript**: Static typing
- **Redux Toolkit**: State management
- **Styled Components**: Styling
- **React Hook Form**: Form handling
- **Jest**: Testing framework

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