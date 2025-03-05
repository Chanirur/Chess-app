import { montserrat, poppins } from "@/app/ui/fonts";
import { useState } from "react";

interface Props {
	setMode: (mode: "login" | "register" | "resetPassword") => void;
}

export const LoginForm: React.FC<Props> = ({ setMode }) => {
	
	interface dataProps {
		username: string;
		password: string;
	}


	const [formData, setFormData] = useState<dataProps>({ username: '', password: '' });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			  });
	}
	
	const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const response = await fetch('api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});
			await response.json();
		}
	

	const setResetPassword = () => {
		setMode('resetPassword');
	}

	return (
		<>
			<h2 className={`${montserrat.className} text-[40px] flex justify-center items-center`}>Welcome Back!</h2>
			<form onSubmit={loginSubmit} id="loginForm" className={`${poppins.className} flex flex-col gap-[5vh] items-start`}>
				<div className="formControl block" id="usernameField">
					<label htmlFor="username" className="text-sm font-medium text-[#e5e5e5]">Username</label>
					<input onChange={handleChange} type="text" name="username" id="username" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]" />
				</div>
				<div className="formControl block" id="passwordField">
					<label htmlFor="password" className="text-sm font-medium text-[#e5e5e5]">Password</label>
					<input onChange={handleChange} type="password" name="password" id="password" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]" />
				</div>
				<div className="formControl block" id="submitBtn">
					<button type="submit" id="submit" className="w-[100%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">Login</button>
				</div>
				<div id="passwordResetLink" onClick={setResetPassword} className="cursor-pointer hover:text-gree-400">Forgot Password?</div>
			</form>
		</>
	)
}

export const LoginSwitcher: React.FC<Props> = ({ setMode }) => {
	return (
		<>
			<h2 className={`${montserrat.className} text-[40px]`}>New Here?</h2>
			<button type="button" onClick={() => setMode('register')} className={`${poppins.className} w-[30%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400`}>
				Register
			</button>
		</>
	)
}