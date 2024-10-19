"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { loadStripe } from '@stripe/stripe-js';

// Mock data - replace with actual API call
const mockRegistry = {
  coupleName: 'John & Jane',
  destinations: ['Bali', 'Paris', 'Maldives', 'New York'],
  allowWriteIn: true,
};

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Vote() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [writeInDestination, setWriteInDestination] = useState('');
  const [email, setEmail] = useState('');
  const [notifyResult, setNotifyResult] = useState(false);
  const [amount, setAmount] = useState(25);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a Stripe Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Stripe expects amount in cents
        destination: selectedDestination === 'write-in' ? writeInDestination : selectedDestination,
        email: notifyResult ? email : null,
      }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    const result = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-amber-800">Vote for {mockRegistry.coupleName}'s Honeymoon</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Select a Destination</Label>
          <RadioGroup value={selectedDestination} onValueChange={setSelectedDestination}>
            {mockRegistry.destinations.map((destination) => (
              <div key={destination} className="flex items-center space-x-2">
                <RadioGroupItem value={destination} id={destination} />
                <Label htmlFor={destination}>{destination}</Label>
              </div>
            ))}
            {mockRegistry.allowWriteIn && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="write-in" id="write-in" />
                <Label htmlFor="write-in">Other</Label>
                <Input
                  placeholder="Enter destination"
                  value={writeInDestination}
                  onChange={(e) => setWriteInDestination(e.target.value)}
                  disabled={selectedDestination !== 'write-in'}
                  className="border-amber-300 focus:ring-amber-500"
                />
              </div>
            )}
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="amount">Amount to Contribute (min $25)</Label>
          <Input
            id="amount"
            type="number"
            min="25"
            step="25"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="border-amber-300 focus:ring-amber-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notify-result"
            checked={notifyResult}
            onCheckedChange={(checked) => setNotifyResult(checked as boolean)}
          />
          <Label htmlFor="notify-result">Notify me of the result</Label>
        </div>
        {notifyResult && (
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-amber-300 focus:ring-amber-500"
            />
          </div>
        )}
        <Button type="submit" className="bg-amber-500 hover:bg-amber-600">Submit Vote (${amount})</Button>
      </form>
    </div>
  );
}