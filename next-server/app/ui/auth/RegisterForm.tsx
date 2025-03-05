'use client';

import { montserrat, poppins } from "@/app/ui/fonts";
import React, { useState } from "react";

interface Props {
	setMode: React.Dispatch<React.SetStateAction<"login" | "register" | "resetPassword" | "emailVerification">>
	setUser: React.Dispatch<React.SetStateAction<{ username: string, email: string } | null>>;
};

export const RegisterForm: React.FC<Props> = ({setMode, setUser}) => {

	interface dataProps {
		username: string,
		password: string,
		email: string
	}

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [formData, setFormData] = useState<dataProps>({ username: '', password: '', email: '' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		  });
	}

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

	const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch('api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		});
		const result = await response.json();
		if (response.status === 201) {
			setUser({ username: result.username, email: result.email });
			setMode('emailVerification');
		}
	}

	return (
		<>
			<h2 className={`${montserrat.className} text-[40px] flex justify-center items-center`}>Welcome Aboard!</h2>
			<form id="registerForm" onSubmit={(e) => registerSubmit(e)} className={`${poppins.className} flex flex-col gap-[5vh] items-start`}>
				<div className="formControl block" id="usernameField">
					<label htmlFor="username" className="text-sm font-medium text-[#e5e5e5]">Username</label>
					<input type="text" name="username" id="username" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]" />
				</div>
				<div className="formControl block" id="passwordField">
					<label htmlFor="password" className="text-sm font-medium text-[#e5e5e5] w-full">Password</label>
                    <div className="w-full flex flex-row gap-[5px]">
                        <input type={`${showPassword ? 'text' : 'password'}`} name="password" id="password" onChange={handleChange} className="w-[80%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]" />
                        <button type='button' onClick={toggleShowPassword} className="w-[20%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400 flex justify-center items-center overflow-hidden">
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className="formControl block" id="emailField">
					<label htmlFor="email" className="text-sm font-medium text-[#e5e5e5]">Email</label>
					<input type="email" name="email" id="email" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]" />
				</div>
				<div className="formControl block" id="submitBtn">
					<button type="submit" id="submit" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">Register</button>
				</div>
			</form>
		</>
	)
}

interface swithcherProps {
	setMode: React.Dispatch<React.SetStateAction<"login" | "register" | "resetPassword" | "emailVerification">>
}

export const RegisterSwitcher: React.FC<swithcherProps> = ({setMode}) => {
	return (
		<>
			<h2 className={`${montserrat.className} text-[40px]`}>Existing User?</h2>
			<button type="button" onClick={() => {setMode('login')}} className={`${poppins.className} w-[30%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400 text-center overflow-hidden`}>
				Login
			</button>
		</>
	)
}