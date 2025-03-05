"use client"

import { useState } from "react";
import Image from "next/image";
import { LoginForm, LoginSwitcher } from "@/app/ui/auth/LoginForm";
import { RegisterForm, RegisterSwitcher } from "@/app/ui/auth/RegisterForm";
import { ResetPasswordForm, ResetPasswordSwitcher } from "@/app/ui/auth/ResetPassword";
import { motion } from "framer-motion";
import { EmailVerificationForm } from "../ui/auth/EmailVerification";


export default function AuthScreen() {

	interface User {
		username: string,
		email: string
	}

	const [mode, setMode] = useState<'login' | 'register' | 'resetPassword' | 'emailVerification'>('login');
	const [user, setUser] = useState<User | null>(null);

	return (
		<main className="flex absolute items-center justify-center w-[100vw] h-[100vh]">
			<div className="relative w-[90vw] max-w-[90vw] md:w-[70vw] max-w-[180vh] h-[90vh] sm:h-[min(90vh,600px)] flex flex-col md:flex-row rounded-[50px]">

				<Image
					src="/auth/auth-bg.jpeg"
					alt="Auth Background"
					fill={true}
					priority
					style={{ objectFit: 'cover' }}
					className="-z-10 rounded-[50px] hidden md:block"
				/>

				<motion.div id="mainForm" className={`relative md:absolute w-[100%] ${mode === 'emailVerification' ? 'md:w-full' : 'md:w-[50%]'} h-[70vh] md:h-full rounded-[50px] bg-[linear-gradient(135deg,#00A000FF,#D0FA77e6)] z-40 flex flex-col items-center justify-center`}
					animate={{ x: mode === 'login' || mode === 'emailVerification' ? "0%" : "100%" }}
					transition={{ duration: 0.5 }}>
					<div className="w-[60%] h-full grid justify-center md:grid-rows-[30%_1fr]">
						{mode === 'login'
							? (<LoginForm setMode={setMode} />)
							: mode === 'register'
								? (<RegisterForm setMode={setMode} setUser={setUser} />)
								: mode === 'resetPassword'
									? (<ResetPasswordForm />)
									: (<EmailVerificationForm email={user?.email} />)}
					</div>
				</motion.div>
				<div id="switcher" className={`relative w-full md:w-[50%] md:absolute left-0 ${mode === 'login' ? 'md:left-1/2' : 'md:left-0'} h-[30%] md:h-full flex items-center justify-center flex-col gap-[10vh] z-auto`}>
					{mode === 'login'
						? (<LoginSwitcher setMode={setMode} />)
						: mode === 'register'
							? (<RegisterSwitcher setMode={setMode} />)
							: mode === 'resetPassword'
								? (<ResetPasswordSwitcher setMode={setMode} />)
								: ''}
				</div>
			</div>
		</main>
	);
}