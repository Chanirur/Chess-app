"use client";

import { useSearchParams } from "next/navigation";
import { VerificationResult } from "@/app/ui/auth/emailVerification/EmailVerification";

const EmailVerification: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get the token from the query string

  if (!token) {
    return (
      <main className="flex absolute items-center justify-center w-[100vw] h-[100vh]">
        <div className="relative w-[90vw] max-w-[90vw] md:w-[70vw] max-w-[180vh] h-[90vh] sm:h-[min(90vh,600px)] flex flex-col md:flex-row rounded-[50px]">
          <div
            id="mainForm"
            className={`relative md:absolute w-[100%] md:w-full h-[70vh] md:h-full rounded-[50px] bg-[linear-gradient(135deg,#00A000FF,#D0FA77e6)] z-40 flex flex-col items-center justify-center overflow-auto`}
          >
            <h2>Invalid Url..</h2>
            <div>
              <p>Please check the url and try again.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex absolute items-center justify-center w-[100vw] h-[100vh]">
      <div className="relative w-[90vw] max-w-[90vw] md:w-[70vw] max-w-[180vh] h-[90vh] sm:h-[min(90vh,600px)] flex flex-col md:flex-row rounded-[50px]">
        <div
          id="mainForm"
          className={`relative md:absolute w-[100%] md:w-full h-[70vh] md:h-full rounded-[50px] bg-[linear-gradient(135deg,#00A000FF,#D0FA77e6)] z-40 flex flex-col items-center justify-center overflow-auto`}
        >
          <VerificationResult token={token} />
        </div>
      </div>
    </main>
  );
};

export default EmailVerification;
