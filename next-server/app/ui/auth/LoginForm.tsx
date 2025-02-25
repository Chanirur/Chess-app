import { montserrat, poppins } from "@/app/ui/fonts";

export const LoginForm = () => {
	return (
		<>
			<h2 className={`${montserrat.className} text-[40px]`}>Welcome Back!!</h2>
			<form id="loginForm" className={`${poppins.className} flex flex-col gap-[5vh]`}>
				<div className="formControl block" id="usernameField">
					<label htmlFor="username" className="text-sm font-medium text-[#e5e5e5]">Username</label>
					<input type="text" name="username" id="username" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
				</div>
				<div className="formControl block" id="passwordField">
					<label htmlFor="password" className="text-sm font-medium text-[#e5e5e5]">Password</label>
					<input type="password" name="password" id="password" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-purple-500 focus:border-purple-500" />
				</div>
				<div className="formControl block" id="submitBtn">
					<button type="submit" id="submit">Login</button>
				</div>
				<div id="passwordResetLink">Forgot Password?</div>
			</form>
		</>
	)
}