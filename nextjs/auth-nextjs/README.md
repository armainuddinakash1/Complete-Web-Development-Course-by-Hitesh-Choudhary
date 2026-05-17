# Auth-NextJS - Authentication System

A modern authentication system built with **Next.js 16**, **MongoDB**, and **JWT** tokens. This project demonstrates a complete authentication workflow including user registration, login, email verification, and secure API routes.

## 🚀 Features

- **User Registration & Login** - Secure user authentication with email and password
- **JWT Authentication** - Token-based session management
- **Password Hashing** - Bcryptjs for secure password storage
- **Email Verification** - Nodemailer integration for email verification
- **Protected Routes** - Middleware to protect authenticated pages
- **User Context** - React Context API for global user state
- **Tailwind CSS** - Modern, responsive UI styling
- **Toast Notifications** - React Hot Toast for user feedback
- **TypeScript** - Type-safe development with full type support
- **MongoDB Integration** - Mongoose ORM for database operations

## 📋 Tech Stack

### Frontend

- **Next.js** 16.2.4 - React framework with App Router
- **React** 19.2.4 - UI library
- **Tailwind CSS** 4 - Utility-first CSS framework
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** 9.6.1 - MongoDB ODM
- **JWT** (jsonwebtoken) - Token-based authentication
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Axios** - HTTP client

### Development

- **TypeScript** 5 - Static type checking
- **ESLint** - Code linting

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (backend endpoints)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── (other pages)      # Application pages
├── components/            # Reusable React components
│   ├── layout/           # Layout components (Navbar, Footer, etc.)
│   └── (other components)
├── contexts/             # React Context providers
├── models/               # Mongoose database schemas
├── dbConfig/             # Database connection configuration
├── helpers/              # Utility functions and helpers
└── proxy.ts              # API proxy configuration
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- Email service credentials (for Nodemailer)

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Database Setup

Ensure MongoDB is running and the connection URI is correctly configured in `.env.local`.

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🔐 Authentication Flow

1. **User Registration** - User creates account with email and password
    - Password is hashed using Bcryptjs
    - User record is stored in MongoDB

2. **Email Verification** - Verification link is sent to user's email
    - Nodemailer handles email delivery
    - User clicks link to verify email

3. **User Login** - User logs in with credentials
    - Password is verified against stored hash
    - JWT token is generated and returned
    - Token is stored (typically in cookies or localStorage)

4. **Authenticated Requests** - Protected routes check JWT token
    - Token is validated in middleware
    - User context is updated
    - Protected pages are accessible

## 🛣️ API Routes

### Authentication Endpoints

- `POST /api/users/signup` - Create new user account
- `POST /api/users/login` - Authenticate user and get token
- `POST /api/users/logout` - Clear authentication
- `GET /api/users/me` - Get current user info
- `POST /api/users/verifyemail` - Verify email address

### User Endpoints

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

## 🎨 Components

### Layout Components

- **Navbar** - Navigation bar with user menu
- **Footer** - Application footer
- **Sidebar** - Side navigation (if applicable)

### Authentication Components

- **LoginForm** - User login interface
- **RegisterForm** - User registration interface
- **ProtectedRoute** - Route guard component

## 🔒 Security Features

- ✅ Password hashing with Bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ CORS configuration
- ✅ Email verification for new accounts
- ✅ Token expiration and refresh mechanisms

## 📦 Dependencies Overview

| Package         | Version | Purpose          |
| --------------- | ------- | ---------------- |
| next            | 16.2.4  | React framework  |
| react           | 19.2.4  | UI library       |
| mongoose        | 9.6.1   | MongoDB ORM      |
| jsonwebtoken    | 9.0.3   | JWT handling     |
| bcryptjs        | 3.0.3   | Password hashing |
| nodemailer      | 8.0.7   | Email service    |
| axios           | 1.16.0  | HTTP client      |
| tailwindcss     | 4       | CSS framework    |
| react-hot-toast | 2.6.0   | Notifications    |
| typescript      | 5       | Type checking    |

## 🧪 Testing & Debugging

- Use browser DevTools to inspect network requests
- Check MongoDB Compass for database records
- Review server logs in terminal output
- Use ESLint for code quality checking

## 🚨 Common Issues & Solutions

### MongoDB Connection Error

- Verify MongoDB URI is correct in `.env.local`
- Ensure MongoDB service is running
- Check network access permissions

### Email Not Sending

- Verify email credentials in `.env.local`
- Enable "Less secure app access" for Gmail
- Check Nodemailer logs

### JWT Token Issues

- Ensure JWT_SECRET is set in environment variables
- Verify token hasn't expired
- Check token format in requests

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Guide](https://jwt.io/introduction)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of the Complete Web Development Course by Hitesh Choudhary.

---

**Last Updated:** May 17, 2026
