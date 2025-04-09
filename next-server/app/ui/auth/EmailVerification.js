"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationForm = void 0;
const react_1 = require("react");
const fonts_1 = require("@/app/ui/fonts");
const EmailVerificationForm = ({ email }) => {
    const sendEmail = () => {
        fetch('api/auth/send-email-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
    };
    (0, react_1.useEffect)(() => {
        fetch('api/auth/send-email-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
    }, [email]);
    return (<>
			<h2 className={`${fonts_1.montserrat.className} text-[40px] flex items-center justify-center`}>Email Verification</h2>
			<div className={`${fonts_1.poppins.className} flex flex-col gap-[5vh] items-center content-start justify-center text-center`}>
				<div className={`${fonts_1.poppins.className} text-[25px]`}>
					{email ? email : 'Please Refresh'} 
				</div>
				
				<p>
					We&#39;ve sent link to your email. Click it to verify your account.
				</p>
				<button type="button" onClick={sendEmail} id="resend" className="w-auto px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">
					Resend
				</button>
			</div>
		</>);
};
exports.EmailVerificationForm = EmailVerificationForm;
