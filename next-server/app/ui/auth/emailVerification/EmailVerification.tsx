"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  token: string;
}

export const VerificationResult: React.FC<Props> = ({ token }) => {
  const [data, setData] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
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
  }, [token]);

  if (loading) {
    return (
      <>
        <h2>Please wait for the server</h2>
        <div>Loading...</div>
      </>
    );
  }

  if (data?.success === false) {
    return (
      <>
        <h2>Email Verification Failed</h2>
        <div>
          <p>Something went wrong</p>
          <p>Contact the developer or the admin</p>
        </div>
      </>
    );
  } else if (data?.success === true) {
    return (
      <>
        <h2>Email Verification Success</h2>
        <div>
          <p>Welcome to our platform.</p>
          <p>Proceed to Login to access your account</p>
          <Link href={'/auth'}>Login</Link>
        </div>
      </>
    );
  }
};
