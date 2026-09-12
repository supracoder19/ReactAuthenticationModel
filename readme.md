# React Authentication Architecture & State Management Evolution

A comprehensive repository demonstrating client-side authentication mechanisms in React, progressing through distinct state management paradigms—from native Context API to Redux Toolkit & Thunk, and finally to TanStack Query (React Query).

---

## 📌 Overview

Authentication in single-page applications (SPAs) requires careful handling of access tokens, refresh tokens, cookie storage, and interceptors. This project serves as a step-by-step practical guide and playground for implementing secure token-based authentication workflows across different frontend state architectures while interacting with an Express mock backend.

---

## 🔑 Authentication Flow Architecture

* **Access Token:** Short-lived JWT/Bearer token stored in application memory and sent via the `Authorization` header for protected API endpoints.
* **Refresh Token:** Stored securely in an `HttpOnly` cookie to fetch new access tokens upon expiry.
* **Automatic Refresh:** Handled using Axios interceptors/middleware to catch `401 Unauthorized` responses and refresh credentials seamlessly.

---

## 🔀 Branch Architecture & Evolution Roadmap

The repository is organized into dedicated Git branches to isolate and highlight each state management approach:

| Branch Name | State Management Strategy | Key Features & Concepts |
| :--- | :--- | :--- |
| `main` | **Project Root & Express Backend** | Dummy authentication API server providing login, refresh, logout, and protected routes. |
| `feature/context-axios` | **React Context API + Axios** | Global auth state with `useContext`, manual state hooks, and Axios response interceptors. |
| `feature/redux-thunk` | **Redux Toolkit + React Thunk** | Centralized Redux store, asynchronous thunks for auth API calls, and slice-based state management. |
| `feature/tanstack-query` | **TanStack Query (React Query)** | Server-state management, automated cache updates, custom mutation/query hooks, and optimistic UI. |

---

## 🛠️ Backend API Reference

The project includes a dummy Express backend running on `http://localhost:3000` with the following mock endpoints:

| Method | Endpoint | Headers / Cookies | Description |
| :---: | :--- | :--- | :--- |
| `POST` | `/login` | Body: `{ username, password }` | Validates credentials (`vilen` / `1234`), sets the `refreshToken` cookie, and returns `accessToken`. |
| `POST` | `/refresh` | Cookie: `refreshToken` | Issues a new access token if the refresh cookie is valid. |
| `POST` | `/logout` | Cookie: `refreshToken` | Clears the `refreshToken` HTTP-only cookie. |
| `GET` | `/protectedRoute` | Header: `Authorization: Bearer 9999` | Protected endpoint requiring a valid Bearer access token. |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/supracoder19/ReactAuthenticationModel
cd ReactAuthenticationModel/authBackendDummy

# Install dependencies
npm install

# Create environment file (.env)
echo "PORT=3000" > .env

# Run server
npm run dev

# Run frontEnd

cd ../ReactAuthenticationModel/authFrontEnd
npm run dev

🔐 Mock Credentials
Username: user
Password: 1234