import CourseSideBar from '@/components/CourseSideBar'
import MainVideoSummary from '@/components/MainVideoSummary'
import QuizCards from '@/components/QuizCards'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/db'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        slug: string[]
    }
}

const CoursePge = async ({ params: { slug } }: Props) => {
    const [courseId, unitIndexParam, chapterIndexParam] = slug
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            units: {
                include: {
                    chapters: {
                        include: { question: true }
                    }
                }
            }
        }
    })
    if (!course) {
        return redirect("/gallry")

    }
    let unitIndex = parseInt(unitIndexParam)
    let chapterIndex = parseInt(chapterIndexParam)

    const unit = course.units[unitIndex]
    if (!unit) {
        return redirect("/gallery")
    }

    const chapter = unit.chapters[chapterIndex]

    // get next and previous chapters

    const nextChapter = unit.chapters[chapterIndex + 1]

    const prevChapter = unit.chapters[chapterIndex - 1]

    return (
        <div className=''>
            <CourseSideBar course={course} currentChaterId={chapter.id} />

            <div>
                <div className='ml-[400px] px-8'>
                    <div className='flex'>
                        <MainVideoSummary chapter={chapter} chapterIndex={chapterIndex} unit={unit} unitIndex={unitIndex} />
                        <QuizCards chapter={chapter} />
                    </div>

                    <div className='flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500'></div>
                    <div className='flex pb-8'>
                        {prevChapter && (
                            <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`} className='flex mt-4 mr-auto w-fit'>
                                <div className='flex items-center'>
                                    <ChevronLeft className='w-6 h-6 mr-2' />
                                    <div className='flex flex-col items-start'>
                                        <span className='text-sm text-secondary-foreground/60'>Previous</span>
                                        <span className='text-xl font-bold'>{prevChapter.name}</span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {nextChapter && (
                            <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`} className='flex mt-4 ml-auto w-fit'>
                                <div className='flex items-center'>
                                    <div className='flex flex-col items-start'>
                                        <span className='text-sm text-secondary-foreground/60'>Next</span>
                                        <span className='text-xl font-bold'>{nextChapter.name}</span>
                                    </div>
                                    <ChevronRight className='w-6 h-6 mr-2' />
                                </div>
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </div>

    )
}

export default CoursePge