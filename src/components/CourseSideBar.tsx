import { cn } from '@/lib/utils'
import { Chapter, Course, Unit } from '@prisma/client'

import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'

type Props = {
    course: Course & {
        units: (Unit & {
            chapters: Chapter[];

        })[]
    }
    currentChaterId: string
}

const CourseSideBar = async ({ course, currentChaterId }: Props) => {
    return (
        <div className='w-[400px] absolute top-1/2 -translate-y-1/2 p-6 rounded-r-3xl bg-secondary mt-16'>
            <h1 className='text-4xl font-bold'>{course.name}</h1>
            {course.units.map((unit, unitIndex) => {
                return (
                    <div key={unit.id} className="mt-4">
                        <h2 className='text-sm uppercase text-secondary-foreground/60'>Unit {unitIndex + 1}</h2>
                        <h2 className='text-2xl font-bold'>{unit.name}</h2>
                        {unit.chapters.map((chapter, chapterIndex) => {
                            return (
                                <div key={chapter.id}>
                                    <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                                        className={cn("text-secondary-foreground/60", {
                                            'text-green-400 font-bold': chapter.id === currentChaterId
                                        })}
                                    >
                                        {chapter.name}
                                    </Link>
                                </div>
                            )
                        })}
                        <Separator className='m-2 text-gray-500 bg-gray-500' />
                    </div>
                )
            })}
        </div>
    )
}

export default CourseSideBar