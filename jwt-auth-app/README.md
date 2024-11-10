1. Project Structure

jwt-auth-app/
│
├── /backend                   # Backend (Express.js)
│   ├── /controllers 
│       └── authController.js   # Authentication logic (register, login, protect routes)
│   ├── /middlewares           
│       └── auth.js             # Middleware functions (e.g., JWT protection)
│   ├── /models 
│       └── user.js             # Models (if using a database, for user schema)
│   ├── /routes  
│       └── authRoutes.js       # API route handlers (auth routes)
│   ├── .env                    # Environment variables (for JWT secret)
│   ├── app.js                  # Main Express server configuration
│   └── package.json            # Backend dependencies

reate the Project Folder
Create a new directory for your project:

bash
Copy code
mkdir jwt-auth-api
cd jwt-auth-api



Initialize the Node.js Project
Run the following command to initialize the project and create the package.json file:

bash
Copy code
npm init -y

Install Required Packages
Install the necessary dependencies for the backend (e.g., Express, JWT, etc.):

bash
Copy code
npm install express jsonwebtoken bcryptjs dotenv

mkdir models routes middleware


create auth.js in middleware
create userModel.js un models
create userRoutes.js in routes 
create app.js in jwt-auth-app
create .even in jwt-auth-app
copy code in evry file given in artifact
then run the code using node app.js


Sign Up - POST http://localhost:3000/api/signup
Method: POST
URL: http://localhost:3000/api/signup
Body: In Postman, set the body type to JSON and enter:
json

{
  "email": "newUser@example.com",
  "password": "password123"
}

Log In - POST http://localhost:3000/api/login
Method: POST
URL: http://localhost:3000/api/login
Body: In Postman, set the body type to JSON and enter:
json
Copy code
{
  "email": "newUser@example.com",
  "password": "password123"
}

Headers: No special headers are required for this request.
Response: This will return a token in the response, which you'll need for accessing protected routes.


Protected Route - GET http://localhost:3000/api/protected
Method: GET
URL: http://localhost:3000/api/protected
Headers:
Add an Authorization header with the value:
php
Copy code
Bearer <your_token_here>
Replace <your_token_here> with the actual token received from the login request (for example, Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld1VzZXIiLCJpYXQiOjE3MzEyMzAzMDgsImV4cCI6MTczMTIzMzkwOH0.eDFEDdVbrln-8TzynzUV6VxVVuI8WfbH6Nd5hX05eZA