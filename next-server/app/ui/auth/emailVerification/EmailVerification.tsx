"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { montserrat, poppins } from "@/app/ui/fonts";

interface Props {
  token: string;
}

export const VerificationResult: React.FC<Props> = ({ token }) => {
  const [tokens, setTokens] = useState('ggg');
  const [data, setData] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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


    return (
      <>
        <h2 className={`${montserrat.className}`}>
          {
            loading ? 'Please wait for the servers' :
              data?.success ? 'Email Verification Success' : 'Email Verification Failed'
          }
        </h2>
        <div className={`${poppins.className}`}>
          {
            loading ? 'Loading...' :
              data?.success ? (
                <>
                  <p>Welcome to our platform!</p>
                  <p>Proceed to login to access your account.</p>
                  <Link href='/auth'>Login</Link>
                </>
              ) : (
                  <>
                    <p>{data?.message}</p>
                    <p>If error persists contact the developer.</p>
                  </>
              )
          }
        </div>
        <div>
          {tokens}
        </div>
      </>
    );
};
