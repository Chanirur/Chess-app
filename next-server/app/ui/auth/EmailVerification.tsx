import { useRef } from "react";
import { montserrat, poppins } from "@/app/ui/fonts";

interface Props {
	email: string | undefined;
}

export const EmailVerificationForm: React.FC<Props> = ({ email }) => {

	const length = 6;

	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	const checkComplete = async () => {
		const otp = inputsRef.current.map((input) => input?.value).join("");
		if (otp.length === length) {
			const result = await fetch('/api/auth/veriy-email');
			console.log(await result.json())
		}
	};

	const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 1) {
			e.target.value = e.target.value[0]
		} 
		const value = e.target.value.replace(/\D/, "");
		e.target.value = value;

		if (value && i < length) {
			inputsRef.current[i + 1]?.focus();
		}

		checkComplete()
	}

	const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !inputsRef.current[i]?.value && i > 0) {
			inputsRef.current[i - 1]?.focus();
			inputsRef.current[i - 1]!.value = '';
		}
	}

	return (
		<>
			<h2 className={`${montserrat.className} text-[40px] flex items-center justify-center`}>Email Verification</h2>
			<div className={`${poppins.className} flex flex-col gap-[5vh] items-center content-start justify-center text-center`}>
				<div className={`${poppins.className} text-[25px]`}>
					{ email ? email : 'Please Refresh' } 
				</div>
				<div className="w-full md:w-auto flex flex-row gap-[1vw]">
					{Array.from({ length }).map((_, i) => (
						<input
							key={i}
							ref={(el) => { inputsRef.current[i] = el }}
							type="text"
							className="w-[10vw] h-[10vw] md:w-[10vh] md:h-[10vh] md:px-4 md:py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340] text-[6vw] md:text-[6vh] text-center"
							onChange={(e) => handleChange(i, e)}
							onKeyDown={(e) => handleKeyDown(i, e)}
						/>
					))}
				</div>
				<p>
					We&#39;ve sent a 6-digit code to your email. Enter it below to verify your account.
				</p>
				<button type="button" id="resend" className="w-auto px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">
					Resend
				</button>
			</div>
		</>
	)
}