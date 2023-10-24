import { prisma } from '@/lib/db'
import React from 'react'
import { Progress } from './ui/progress'
import { Hanko } from '@teamhanko/hanko-elements'

type Props = {
}
const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;
const ProgressBar = async (props: Props) => {
    // const userId = await getuserID()
    const hanko = new Hanko(hankoApi);
    const session = hanko.session.get();

    if (session) {
      console.info(`userID: ${session.userID}, jwt: ${session.jwt}`);
    }
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const { id, email } = await hanko.user.getCurrent();
    //             if (id) {
    //                 setUser({ id, email });
    //             } else {
    //                 router.push("/login");
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch user data:", error);
    //         }
    //     }
    //     fetchData();
    // }, []);
    // const { id } = await hanko.user.getCurrent();
    const fetchedUser = await prisma.user.findUnique({
        where: {
            id: session.userID, // Assuming you have a unique identifier for the user
        },
    });

    return (
        <>
            {fetchedUser?.credits} / 10 Free Generations {/* Use the 'credits' state */}
            <Progress className='mt-2' value={fetchedUser?.credits ? (fetchedUser?.credits / 10) * 100 : 0} />
        </>
    )
}

export default ProgressBar;