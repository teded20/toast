import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassChampagne } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100">
      <div className="text-center mb-8">
        <GlassChampagne className="h-24 w-24 text-amber-600 mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-2 text-amber-800">Toast</h1>
        <p className="text-xl text-amber-700">Celebrate love, one vote at a time</p>
      </div>
      <div className="space-x-4">
        <Button asChild className="bg-amber-500 hover:bg-amber-600">
          <Link href="/couple/register">Create Registry</Link>
        </Button>
        <Button asChild variant="outline" className="text-amber-700 border-amber-500 hover:bg-amber-100">
          <Link href="/vote">Vote</Link>
        </Button>
      </div>
    </div>
  );
}