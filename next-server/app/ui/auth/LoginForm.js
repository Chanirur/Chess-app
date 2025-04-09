"use strict";
"use client";
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
exports.LoginSwitcher = exports.LoginForm = void 0;
const fonts_1 = require("@/app/ui/fonts");
const validations_1 = require("@/app/utils/validations");
const react_1 = __importStar(require("react"));
const LoginForm = ({ setMode, redirectTodashboard }) => {
    ;
    const [formData, setFormData] = (0, react_1.useState)({
        username: "",
        password: "",
    });
    const [error, setError] = (0, react_1.useState)("");
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const checkForm = () => {
        if (!(0, validations_1.isValidUsername)(formData.username) || formData.password === "") {
            setError("Invalid login details");
            return false;
        }
        return true;
    };
    const loginSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (checkForm()) {
            const response = yield fetch("api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = yield response.json();
            if (result.success === false) {
                setError(result.message);
            }
            else {
                redirectTodashboard();
            }
        }
    });
    const setResetPassword = () => {
        setMode("resetPassword");
    };
    return (<>
      <h2 className={`${fonts_1.montserrat.className} text-[40px] flex justify-center items-center`}>
        Welcome Back!
      </h2>
      <form onSubmit={loginSubmit} id="loginForm" className={`${fonts_1.poppins.className} flex flex-col gap-[5vh] items-start`}>
        <div className="formControl block" id="usernameField">
          <label htmlFor="username" className="text-sm font-medium text-[#e5e5e5]">
            Username
          </label>
          <input onChange={handleChange} type="text" autoFocus name="username" id="username" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]"/>
        </div>
        <div className="formControl block" id="passwordField">
          <label htmlFor="password" className="text-sm font-medium text-[#e5e5e5]">
            Password
          </label>
          <input onChange={handleChange} type="password" name="password" id="password" className="w-full px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] focus:outline-none ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-[#33333340]"/>
        </div>
        <div id="errorMessage" className={`${error ? "visible" : "hidden"} bg-red-600 w-full border-red-600 opacity-65 border-[2px] rounded-md p-[3px] text-center`}>
          {error}
        </div>
        <div className="formControl block" id="submitBtn">
          <button type="submit" id="submit" className="w-[100%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400">
            Login
          </button>
        </div>
        <div id="passwordResetLink" onClick={setResetPassword} className="cursor-pointer hover:text-gree-400">
          Forgot Password?
        </div>
      </form>
    </>);
};
exports.LoginForm = LoginForm;
const LoginSwitcher = ({ setMode }) => {
    return (<>
      <h2 className={`${fonts_1.montserrat.className} text-[40px]`}>New Here?</h2>
      <button type="button" onClick={() => setMode("register")} className={`${fonts_1.poppins.className} w-[30%] px-4 py-2 border rounded-lg shadow-sm border-[#e6e6e6] ring-[#e6e6e6] bg-[#e6e6e640] ring-2 hover:bg-[#33333340] hover:ring-green-400 hover:border-green-400`}>
        Register
      </button>
    </>);
};
exports.LoginSwitcher = LoginSwitcher;
