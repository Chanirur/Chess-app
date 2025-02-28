import { montserrat, poppins } from "@/app/ui/fonts";
import React, { useRef } from "react";

export const LoginForm: React.FC<Props> = () => {

	const length = 6;

	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	const checkComplete = () => {
		const otp = inputsRef.current.map((input) => input?.value).join("");
		if (otp.length === length) {
			//todo: send otp to server
		}
	};

	const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/, "");
		e.target.value = value;

		if (value && i < length) {
			inputsRef.current[i + 1]?.focus();
		}

		checkComplete()
	}

	const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'backspace' && !inputsRef.current[i]?.value && i > 0) {
			inputsRef.current[i - 1]?.focus();
			inputsRef.current[i - 1]!.value = '';
		}
	}

	return (
		<>
			<div>
				<div>
					{Array.from({ length }).map((_, i) => (
						<input
							key={i}
							ref={(el) => { inputsRef.current[i] = el }}
							type="text"
							className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded focus:border-blue-500 outline-none"
							onChange={(e) => handleChange(i, e)}
							onKeyDown={(e) => handleKeyDown(i, e)}
						/>
					))}
				</div>
			</div>
		</>
	)
}