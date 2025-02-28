import { montserrat, poppins } from "@/app/ui/fonts";

export const ResetPasswordForm: React.FC = () => {
	return (
		<>
			<h2 className={`${montserrat.className} text-[40px] flex justify-center items-center`}>Welcome Back!</h2>
			<form id="loginForm" className={`${poppins.className} flex flex-col gap-[5vh] items-start`}>
				<div className="formControl block" id="usernameField">
					<label htmlFor="email" className="text-sm font-medium text-[#e5e5e5]">Email</label>
					<input type="email" name="email" id="email" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]" />
				</div>
				<div className="formControl block" id="submitBtn">
					<button type="submit" id="submit" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">
                        Continue
                    </button>
				</div>
			</form>
		</>
	)
}

interface Props {
	setMode: (mode: "login" | "register" | "resetPassword") => void;
}

export const ResetPasswordSwitcher: React.FC<Props> = ({ setMode }) => {
	return (
		<>
			<h2 className={`${montserrat.className} text-[40px]`}>Remember Password</h2>
			<button type="button" onClick={() => setMode('login')} className={`${poppins.className} w-[30%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400`}>
				Back to Login
			</button>
		</>
	)
}
