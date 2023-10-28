import { InfoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const HankoError = (props: Props) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                <div className="flex items-center text-red-500 text-2xl font-semibold">
                <InfoIcon className='w-8 h-8 mr-3 text-red-500' />
                    An Error Occurred</div>
                <p className="text-gray-600 mt-2">Something went wrong while processing your request. Please try again.</p>
                <div className="mt-4">
                    <Link href="/login" className="text-indigo-600 flex  justify-center hover:underline">Login</Link>
                </div>
            </div>
        </div>

    )
}

export default HankoError