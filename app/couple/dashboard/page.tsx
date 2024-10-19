"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Share2 } from 'lucide-react';

// Mock data - replace with actual API calls
const mockData = {
  totalVotes: 50,
  totalAmount: 1250,
  destinations: [
    { name: 'Bali', votes: 20, amount: 500 },
    { name: 'Paris', votes: 15, amount: 375 },
    { name: 'Maldives', votes: 10, amount: 250 },
    { name: 'New York', votes: 5, amount: 125 },
  ],
};

export default function CoupleDashboard() {
  const [data, setData] = useState(mockData);
  const [registryLink, setRegistryLink] = useState('');

  useEffect(() => {
    // TODO: Fetch real data from API
    // TODO: Generate unique registry link
    setRegistryLink(`https://toast.com/vote/${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(registryLink);
    alert('Registry link copied to clipboard!');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-amber-800">Your Honeymoon Registry Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Total Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-amber-600">{data.totalVotes}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Total Amount Raised</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-amber-600">${data.totalAmount}</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-amber-800">Destination Votes</h2>
      <div className="space-y-4">
        {data.destinations.map((destination) => (
          <Card key={destination.name} className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-amber-700">{destination.name}</h3>
                <span className="text-sm text-amber-600">
                  {destination.votes} votes (${destination.amount})
                </span>
              </div>
              <Progress value={(destination.votes / data.totalVotes) * 100} className="h-2 bg-amber-200" indicatorClassName="bg-amber-500" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={handleShare} className="bg-amber-500 hover:bg-amber-600">
          <Share2 className="mr-2 h-4 w-4" />
          Share Registry
        </Button>
      </div>
    </div>
  );
}