"use client"

import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'
import { useToast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'

type Props = {
    chapter: Chapter
    chapterIndex: number,
    completedChapters: Set<String>
    setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>
}

export type ChapterCardHandler = {
    triggerLoad: () => void
}
// the chapeter card is a comp because we need to pass a ref we need to wrap it into a forward ref, which takes in generics, the handler and props so we can remove the props from normal defination we can then pass the ref which will be called in the cardComponent 
const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {
    const [success, setSuccess] = useState<boolean | null>(null)
    const { toast } = useToast()
    const { mutate: getChapterInfo, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/chapter/getInfo', { chapterId: chapter.id })
            return response.data
        }
    })
    // to avoid asking for new chaptertId, so it add to the compeletedID
    const addChapterIdToSet = useCallback(
        () => {
            setCompletedChapters((prev) => {
                const newSet = new Set(prev)
                newSet.add(chapter.id)
                return newSet
            })
        },
        [chapter.id, setCompletedChapters],
    )
    useEffect(() => {
        if (chapter.videoId) {
            setSuccess(true)
            addChapterIdToSet()
        }

    }, [chapter, addChapterIdToSet])


    React.useImperativeHandle(ref, () => ({
        // define triggerload func
        async triggerLoad() {
            if (chapter.videoId) {
                addChapterIdToSet();
                return

            }
            getChapterInfo(undefined, {
                onSuccess: () => {
                    setSuccess(true)
                    addChapterIdToSet()
                },
                onError: (error) => {
                    setSuccess(false)
                    console.log(error)
                    toast({
                        title: "Error",
                        description: "There was an error loading your chapter",
                        variant: "destructive"
                    });
                    addChapterIdToSet()
                }
            })
        }
    }))
    return (
        <div key={chapter.id} className={
            cn('px-4 py-2 mt-2 rounded flex justify-between',
                {
                    'bg-secondary': success === null,
                    'bg-red-500': success === false,
                    'bg-green-500': success === true,
                }
            )
        }>
            <h5>Chapter {chapterIndex + 1} {chapter.name}</h5>
            {isPending && <Loader2 className="animate-spin" /> }
        </div>
    )
});
ChapterCard.displayName = "ChapterCard"
export default ChapterCard