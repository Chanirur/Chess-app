import { VerificationResult } from "@/app/ui/auth/emailVerification/EmailVerification";


const EmailVerification: React.FC<{ params: { token: string}}> = async ({ params }) => {

    const { token } = params;

    return (
        <main className="flex absolute items-center justify-center w-[100vw] h-[100vh]">
            <div className="relative w-[90vw] max-w-[90vw] md:w-[70vw] max-w-[180vh] h-[90vh] sm:h-[min(90vh,600px)] flex flex-col md:flex-row rounded-[50px]">
                <div id="mainForm" className={`relative md:absolute w-[100%] md:w-full h-[70vh] md:h-full rounded-[50px] bg-[linear-gradient(135deg,#00A000FF,#D0FA77e6)] z-40 flex flex-col items-center justify-center overflow-auto`}>
                    <div className="w-[60%] h-full grid justify-center md:grid-rows-[30%_1fr]" />
                    <div className="w-[60%] h-full grid justify-center md:grid-rows-[30%_1fr]">
                        <VerificationResult token={token} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EmailVerification;