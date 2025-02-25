"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LoginForm } from "@/app/ui/auth/LoginForm";
import { RegisterForm } from "@/app/ui/auth/RegisterForm";

export default function AuthScreen() {
	const [mode, setMode] = useState<'login' | 'register' | 'resetPassword'>('login')

	return (
		<main className="flex absolute items-center justify-center w-[100vw] h-[100vh]">
			<div className="relative w-[90vw] max-w-[90vw] sm:w-[90vw] h-[90vh] sm:h-[min(90vh,600px)] flex sm:flex-col rounded-[50px]">

			<Image
				src="/auth/auth-bg.jpeg"
				alt="Auth Background"
				fill={true}
				priority
				style={{ objectFit: "cover" }}
				className="-z-10 rounded-[50px] hidden md:block"
			/>

			<div id="mainForm" className="w-[100%] md:w-[50%] h-full bg-[linear-gradient(135deg,#00A000FF,#D0FA77e6)] rounded-[50px] flex items-center justify-center flex-col gap-[10vh]">
				{mode === 'login'
					? (<LoginForm />)
					: mode === 'register'
						? (<RegisterForm />)
						: 'Reset Password'}
			</div>
			</div>
		</main>
	);
}