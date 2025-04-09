"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationResult = void 0;
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const fonts_1 = require("@/app/ui/fonts");
const VerificationResult = ({ token }) => {
    const [tokens, setTokens] = (0, react_1.useState)('ggg');
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setTokens(token);
        fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        })
            .then((response) => response.json())
            .then((data) => {
            setData(data);
            setLoading(false);
        })
            .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        });
    }, [token, setTokens]);
    return (<>
        <h2 className={`${fonts_1.montserrat.className}`}>
          {loading ? 'Please wait for the servers' :
            (data === null || data === void 0 ? void 0 : data.success) ? 'Email Verification Success' : 'Email Verification Failed'}
        </h2>
        <div className={`${fonts_1.poppins.className}`}>
          {loading ? 'Loading...' :
            (data === null || data === void 0 ? void 0 : data.success) ? (<>
                  <p>Welcome to our platform!</p>
                  <p>Proceed to login to access your account.</p>
                  <link_1.default href='/auth'>Login</link_1.default>
                </>) : (<>
                    <p>{data === null || data === void 0 ? void 0 : data.message}</p>
                    <p>If error persists contact the developer.</p>
                  </>)}
        </div>
        <div>
          {tokens}
        </div>
      </>);
};
exports.VerificationResult = VerificationResult;
