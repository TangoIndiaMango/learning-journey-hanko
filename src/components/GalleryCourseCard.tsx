
import { Chapter, Course, Unit } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    course: Course & {
        units: (Unit & {
            chapters: Chapter[]
        })[]
    }
}

const GalleryCourseCard = async ({ course }: Props) => {
    return (
        <>
            <div className='border rounded-lg border-grey-500 min-h-[450px] items-center w-full'>
                <div className='relative aspect-w-4 aspect-h-3'>
                    <Link href={`/course/${course.id}/0/0`} className='relative block w-full h-full'>
                        <Image
                            src={course.image || ''}
                            className='object-cover w-full h-full rounded-t-lg'
                            alt='picture of the course'
                            width={300}
                            height={300}                       />
                        <span className='absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit bottom-2 left-2 right-2'>
                            {course.name}
                        </span>
                    </Link>
                </div>
                <div className='p-4'>
                    <h4 className='text-sm text-secondary-foreground/60'></h4>
                    <div className='space-y-1'>
                        {course.units.map((unit, unitIndex) => {
                            return (
                                <Link href={`/course/${course.id}/${unitIndex}/0`} key={unit.id} className='block underline w-fit'>
                                Unit {unit.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>


        </>
    )
}

export default GalleryCourseCard