"use client"
import { Chapter, Course, Unit } from '@prisma/client';
import React, { useEffect, useMemo, useState } from 'react';
import ChapterCard, { ChapterCardHandler } from './ChapterCard';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from './ui/separator';

type Props = {
    course: Course & {
        units: (Unit & {
            chapters: Chapter[];
        })[];
    };
};

const ConfirmChapters = ({ course }: Props) => {
    const [loading, setLoading] = useState(false)
    // so the handler say each ref will have a triggerload function
    const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
    //bind chapterId to each card ChapterCard

    course.units.forEach((unit) => {
        unit.chapters.forEach((chapter) => {
            // eslint-disable-next-line react-hooks/rules-of-hook
            chapterRefs[chapter.id] = React.useRef(null);
        });
    });

    console.log(chapterRefs)
    // {
    //     'chapter1': ReactRef,
    //     'chapter2': ReactRef
    // }
    const [completedChapters, setCompletedchapters] = useState<Set<String>>(new Set())
    const totalChaptersCount = useMemo(() => {
        return course.units.reduce((acc, unit) => {
            return acc + unit.chapters.length
        }, 0)

    }, [course.units]);

    return (
        <div className="w-full mt-4">
            {/* Loop through the units */}
            {course.units.map((unit, unitIndex) => {
                return (
                    <div key={unit.id} className="mt-5">
                        <h2 className="text-sm uppercase text-secondary-foreground/60">
                            Unit {unitIndex + 1}
                        </h2>
                        <h3 className="text-2xl font-bold">{unit.name}</h3>
                        <div className="mt-3">
                            {unit.chapters.map((chapter, chapterIndex) => {
                                return (
                                    <ChapterCard
                                        ref={chapterRefs[chapter.id]}
                                        key={chapter.id} chapter={chapter} chapterIndex={chapterIndex}
                                        completedChapters={completedChapters}
                                        setCompletedChapters={setCompletedchapters}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            <div className="flex items-center justify-center mt-4">
                <Separator className='flex[1]' />
                <div className='flex items-center mx-4'>
                    <Link href="/create" className={buttonVariants({ variant: "outline" })}>
                        <ChevronLeft className='w-4 h-4 mr-3' strokeWidth={4} />
                        Back</Link>
                    {totalChaptersCount === completedChapters.size ? (<Link
                        href={`/course/${course.id}/0/0`}
                        className={
                            buttonVariants({
                                className: "ml-4 font-semi-bold",
                            })
                        }
                    >
                        Save and Continue <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>) :
                        (
                            <Button type="button" disabled={loading} className="ml-4 font-semibold" onClick={() => {
                                setLoading(true)
                                // get individual refs
                                Object.values(chapterRefs).forEach((ref) => {
                                    // individually each component will call the function
                                    ref.current?.triggerLoad();
                                })
                                // setLoading(false)
                            }}>
                                Generate
                                <ChevronRight className='w-4 h-4 mr-3' strokeWidth={4} />
                            </Button>
                        )}

                </div>
                <Separator className='flex[1]' />
            </div>
        </div>
    );
};

export default ConfirmChapters;
