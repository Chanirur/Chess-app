import React from 'react'

export const RegisterForm = () => {
    return (
        <form id="loginForm">

            <h2>Welcome Aboard!!</h2>

            <div className="formControl" id="usernameField">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div className="formControl" id="passwordField">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div className="formControl" id="emailField">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="formControl" id="submitBtn">
                <button type="submit" id="submit">Register</button>
            </div>
        </form>
    )
}