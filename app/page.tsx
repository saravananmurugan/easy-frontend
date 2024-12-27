import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('access_token'); // Check the 'access_token' cookie

  if (token) {
    // If token is found, redirect to dashboard
    redirect('/home');
  } else {
    // If no token is found, redirect to signin
    redirect('/signin');
  }

  return null; // No need to render anything
}
