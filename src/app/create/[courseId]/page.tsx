import ConfirmChapters from '@/components/ConfirmChapters';
import Navbar from '@/components/Navbar';
import { getuserID } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: {
    courseId: string;
  }
}

const CreateChapters = async ({ params: { courseId } }: Props) => {
  const userId = await getuserID()
  console.log("This the user ID", userId)
  if (!userId) {
    return redirect("/gallery")
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    //performing joins to return
    include: {
      units: {
        include: {
          chapters: true
        }
      }
    }
  })
  if (!course) {
    return redirect("/create")
  }
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-start max-w-xl mx-auto my-16">
        <h5 className="text-sm uppercase text-secondary-foreground/60">
          Course Name
        </h5>
        <h1 className='text-5xl font-bold'>{course.name}</h1>
        <div className='flex p-4 mt-5 border-none bg-secondary'>
          <InfoIcon className='w-12 h-12 mr-3 text-gray-400' />
          <div>
            We generated chapters for each of your units. Look over them and click the Button to confirm and continue
          </div>

        </div>
        <ConfirmChapters course={course} />
      </div>
    </>
  )
}

export default CreateChapters