"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSwitcher = exports.RegisterForm = void 0;
const fonts_1 = require("@/app/ui/fonts");
const react_1 = __importStar(require("react"));
const validations_1 = require("@/app/utils/validations");
;
const RegisterForm = ({ setMode, setUser }) => {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({ username: '', password: '', email: '' });
    const [error, setError] = (0, react_1.useState)('');
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const checkForm = () => {
        if (!(0, validations_1.isValidUsername)(formData.username)) {
            setError('Username not valid');
            return false;
        }
        else if (formData.password === '') {
            setError('Password cannot be empty');
            return false;
        }
        else if (!(0, validations_1.isValidEmail)(formData.email)) {
            setError('Email not valid');
            return false;
        }
        return true;
    };
    const registerSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (checkForm() === true) {
            const response = yield fetch('api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = yield response.json();
            if (result.success === true) {
                setUser({ username: result.data.username, email: result.data.email });
                setMode('emailVerification');
            }
            else {
                console.log(result);
            }
        }
    });
    return (<>
			<h2 className={`${fonts_1.montserrat.className} text-[40px] flex justify-center items-center`}>Welcome Aboard!</h2>
			<form id="registerForm" onSubmit={(e) => registerSubmit(e)} className={`${fonts_1.poppins.className} flex flex-col gap-[5vh] items-start`}>
				<div className="formControl block" id="usernameField">
					<label htmlFor="username" className="text-sm font-medium text-[#e5e5e5]">Username</label>
					<input type="text" name="username" id="username" autoFocus onChange={handleChange} className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]"/>
				</div>
				<div className="formControl block" id="passwordField">
					<label htmlFor="password" className="text-sm font-medium text-[#e5e5e5] w-full">Password</label>
                    <div className="w-full flex flex-row gap-[5px]">
                        <input type={`${showPassword ? 'text' : 'password'}`} name="password" id="password" onChange={handleChange} className="w-[80%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]"/>
                        <button type='button' onClick={toggleShowPassword} className="w-[20%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400 flex justify-center items-center overflow-hidden">
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className="formControl block" id="emailField">
					<label htmlFor="email" className="text-sm font-medium text-[#e5e5e5]">Email</label>
					<input type="email" name="email" id="email" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]"/>
				</div>
				<div id="errorMessage" className={`${error ? 'visible' : 'hidden'} bg-red-600 w-full border-red-600 opacity-65 border-[2px] rounded-md p-[3px] text-center`}>
					{error}
				</div>
				<div className="formControl block" id="submitBtn">
					<button type="submit" id="submit" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">Register</button>
				</div>
			</form>
			
		</>);
};
exports.RegisterForm = RegisterForm;
const RegisterSwitcher = ({ setMode }) => {
    return (<>
			<h2 className={`${fonts_1.montserrat.className} text-[40px]`}>Existing User?</h2>
			<button type="button" onClick={() => { setMode('login'); }} className={`${fonts_1.poppins.className} w-[30%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400 text-center overflow-hidden`}>
				Login
			</button>
		</>);
};
exports.RegisterSwitcher = RegisterSwitcher;
