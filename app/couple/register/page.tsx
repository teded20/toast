"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function CoupleRegister() {
  const router = useRouter();
  const { toast } = useToast();
  const [destinations, setDestinations] = useState(['']);
  const [allowWriteIn, setAllowWriteIn] = useState(false);
  const [endDate, setEndDate] = useState<Date>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddDestination = () => {
    setDestinations([...destinations, '']);
  };

  const handleDestinationChange = (index: number, value: string) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save registry and create user account
    console.log({ destinations, allowWriteIn, endDate, email, password });
    toast({
      title: "Registry Created!",
      description: "Your honeymoon registry has been set up successfully.",
    });
    router.push('/couple/dashboard');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-amber-800">Create Your Honeymoon Registry</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="couple-names">Couple Names</Label>
          <Input id="couple-names" placeholder="e.g., John & Jane" required className="border-amber-300 focus:ring-amber-500" />
        </div>
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
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="border-amber-300 focus:ring-amber-500"
          />
        </div>
        <div>
          <Label>Honeymoon Destinations</Label>
          {destinations.map((destination, index) => (
            <Input
              key={index}
              value={destination}
              onChange={(e) => handleDestinationChange(index, e.target.value)}
              placeholder={`Destination ${index + 1}`}
              className="mb-2 border-amber-300 focus:ring-amber-500"
              required
            />
          ))}
          <Button type="button" onClick={handleAddDestination} variant="outline" className="text-amber-700 border-amber-500 hover:bg-amber-100">
            Add Destination
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="allow-write-in"
            checked={allowWriteIn}
            onCheckedChange={(checked) => setAllowWriteIn(checked as boolean)}
          />
          <Label htmlFor="allow-write-in">Allow write-in options</Label>
        </div>
        <div>
          <Label>Voting End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal border-amber-300 text-amber-700">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit" className="bg-amber-500 hover:bg-amber-600">Create Registry</Button>
      </form>
    </div>
  );
}