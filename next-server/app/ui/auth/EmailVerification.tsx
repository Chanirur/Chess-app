import { useEffect } from "react";
import { montserrat, poppins } from "@/app/ui/fonts";

interface Props {
	email: string | undefined;
}

export const EmailVerificationForm: React.FC<Props> = ({ email }) => {

	const sendEmail = () => {
		fetch('api/auth/send-email-verification', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
	}

	useEffect(() => {
		fetch('api/auth/send-email-verification', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
	}, [email]);
	


	return (
		<>
			<h2 className={`${montserrat.className} text-[40px] flex items-center justify-center`}>Email Verification</h2>
			<div className={`${poppins.className} flex flex-col gap-[5vh] items-center content-start justify-center text-center`}>
				<div className={`${poppins.className} text-[25px]`}>
					{ email ? email : 'Please Refresh' } 
				</div>
				
				<p>
					We&#39;ve sent link to your email. Click it to verify your account.
				</p>
				<button type="button" onClick={sendEmail} id="resend" className="w-auto px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">
					Resend
				</button>
			</div>
		</>
	)
}