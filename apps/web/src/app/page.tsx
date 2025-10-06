import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Hola Mundo</h1>
      <p className="mt-2 text-lg text-gray-600">Nuestra app de Next.js está funcionando.</p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </main>
  );
}
