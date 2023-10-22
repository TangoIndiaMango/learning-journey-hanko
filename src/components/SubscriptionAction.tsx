"use client"


import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Progress } from "./ui/progress";
import { Button } from './ui/button';
import { ZapIcon } from 'lucide-react';
import axios from 'axios';

type Props = {}

const SubscriptionAction = (props: Props) => {
    const { data } = useSession()
    const [loading, setLoading] = useState(false)

    const handleSubscribe = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col items-center w-1/2 p-4 mx-auto rounded-md mt-4 bg-secondary'>
            {data?.user.credits} / 10 Free Generations
            <Progress className='mt-2' value={data?.user.credits ? (
                data.user.credits / 10
            ) * 100 : (0)}
            />

            <Button disabled={loading} className='mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600' onClick={handleSubscribe}>
                Upgrade <ZapIcon className='fill-white ml-2' />
            </Button>
        </div>
    )
}

export default SubscriptionAction