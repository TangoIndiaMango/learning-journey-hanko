import CreateCourseForm from '@/components/CreateCourseForm'
import Navbar from '@/components/Navbar'
import { getuserID } from '@/lib/auth'
import { InfoIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}
export const dynamic = "force-dynamic"

const CreatePage = async (props: Props) => {
    const userId = await getuserID()
    if (!userId) {
        return redirect("/gallery")
    }
    return (
        <>
            <Navbar />


            <div className='flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0'>
                <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
                    Course Outline
                </h1>
                <div className="flex p-4 mt-5 border-none bg-secondary">
                    <InfoIcon className='w-12 h-12 mr-3 text-gray-400' />
                    <div>
                        Enter in a course title or what you want to learn about, then enter a list of units which are the specifics you want to learn and our AI will generate a course for you!
                    </div>
                </div>

                <CreateCourseForm />
            </div>
        </>
    )
}

export default CreatePage