import React, { useState } from 'react';
import { Progress } from "./ui/progress";
import { Button } from './ui/button';
import { ZapIcon } from 'lucide-react';
import { Hanko } from '@teamhanko/hanko-elements';

type Props = {}

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;
const SubscriptionAction = (props: Props) => {
    const hanko = new Hanko(hankoApi);

    const [loading, setLoading] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false); // New state variable

    const fetchCredits = { credits: 10 };

    const handleSubscribe = () => {
        setLoading(true);
        setShowComingSoon(true); // Show "COMING SOON" card

        // If you want to re-enable the button after a delay, you can use setTimeout
        setTimeout(() => {
            setLoading(false);
            setShowComingSoon(false);
        }, 5000); // Example: re-enable the button after 5 seconds
    };

    return (
        <div className='flex flex-col items-center w-1/2 p-4 mx-auto rounded-md mt-4 bg-secondary'>
            {fetchCredits.credits} / 10 Free Generations
            <Progress className='mt-2' value={fetchCredits.credits ? (
                fetchCredits.credits / 10
            ) * 100 : (0)}
            />

            {showComingSoon ? ( // Conditionally render "COMING SOON" card
                <div className="coming-soon-card p-4 mx-auto mt-4 rounded-md bg-gradient-to-tr from-green-400 to-blue-500 shadow-lg transform hover:scale-105 transition duration-300">
                    <h3 className="text-2xl font-bold text-white">COMING SOON</h3>
                    <p className="text-white mt-2">Stay tuned for our exciting updates!</p>
                </div>

            ) : (
                <Button disabled={loading} className='mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600' onClick={handleSubscribe}>
                    Upgrade <ZapIcon className='fill-white ml-2' />
                </Button>
            )}
        </div>
    );
}

export default SubscriptionAction;
