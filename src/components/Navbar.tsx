"use client"

import Link from 'next/link';
import React from 'react';
import SignInButton from './SignInButton';
import { ThemeToggle } from './ThemeToggle';
import { useRouter } from 'next/navigation';
import { Hanko, SessionDetail } from "@teamhanko/hanko-elements";
import UserAccountNav from './UserAccountNav';

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;

const Navbar = () => {
    // const [user, setUser] = useState<any>(null);
    const router = useRouter()
    const hanko = new Hanko(hankoApi);
    const session:SessionDetail = hanko.session.get();
    if (!session?.userID) {
        router.push("/login")
    }
    

    return (
        <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-900 z-[10] h-fit border-b border-zinc-300 py-2">
            <div className='flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl'>
                <Link href="/gallery" className='items-center hidden gap-2 sm:flex'>
                    <p className='rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:translate-y-[2px] md:block dark:border-white'>
                        Learning Journey
                    </p>
                </Link>
                <div className='flex items-center'>
                    <Link href="/gallery" className='mr-3 rounded-lg border-3 shadow-lg px-3 py-1 text-md font-semibold transition-all hover:translate-y-[2px] md:block dark:border-white' > Gallery </Link>
                    {session && ( 
                        
                        <>
                            <Link href="/create" className='mr-3 rounded-lg font-semibold border-3 shadow-lg px-3 py-1 text-md transition-all hover:translate-y-[2px] md:block dark:border-white'> Create Course</Link>
                            
                        </>
                    )}
                    <ThemeToggle className="mr-3" />
                    <div className='flex items-center'>
                        {session ? <UserAccountNav user={session} /> : <SignInButton />}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

