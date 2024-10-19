"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VoteSuccess() {
  const searchParams = useSearchParams();
  const [sessionDetails, setSessionDetails] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Fetch session details from your server
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => setSessionDetails(data));
    }
  }, [searchParams]);

  if (!sessionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-8 text-amber-800">Thank You for Your Vote!</h1>
      <p className="text-xl mb-4 text-amber-700">
        Your contribution of ${sessionDetails.amount / 100} for {sessionDetails.destination} has been received.
      </p>
      {sessionDetails.email && (
        <p className="mb-4 text-amber-600">
          We'll notify you of the final results at {sessionDetails.email}.
        </p>
      )}
      <Button asChild className="bg-amber-500 hover:bg-amber-600">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}