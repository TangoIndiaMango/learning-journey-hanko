"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
// import { signIn } from 'next-auth/react'

type Props = {}

const SignInButton = (props: Props) => {

    const router = useRouter()
    const handleSignIn = () => {
        router.push('/login')
    }
    return (
        <div>
            <Button variant="ghost" onClick={handleSignIn}>
                Sign In
            </Button>
        </div>
    )
}

export default SignInButton