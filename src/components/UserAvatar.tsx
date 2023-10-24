import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import Image from 'next/image'
import { User } from '@teamhanko/hanko-elements'
import { User2 } from 'lucide-react'

type Props = {
    user: any
}

const UserAvatar = ({ user }: Props) => {
    return (
        <>
            <Avatar>
                {user ? (
                    <div className="flex items-center justify-center bg-secondary-foreground/80 w-full h-full aspect-square">
                        {/* <Image src="" alt='user-profile' referrerPolicy='no-referrer' layout="fill" /> */}
                        <User2 className='w-4 h-4 text-white'/>
                    </div>
                ) : (
                    <AvatarFallback>
                        <span className="sr-only">{`User Name`}</span>
                    </AvatarFallback>
                )}
            </Avatar>
        </>
    )
}

export default UserAvatar
