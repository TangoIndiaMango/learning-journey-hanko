"use client"

import { cn } from '@/lib/utils'
import { Chapter, Question } from '@prisma/client'
import React, { useCallback, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { ChevronRightIcon } from 'lucide-react'

type Props = {
    chapter: Chapter & {
        question: Question[]
    }
}

const QuizCards = ({ chapter }: Props) => {
    const [answers, setAnswers] = useState<Record<string, string>>({})
    // {'question1.id': 'socialist party'} //holds the id to the answer they have choosen, so whenever they click on the radio button we change the answer they chose
    // console.log(answers)

    const [questionState, setQuestionState] = useState<Record<string, boolean | null>>({})
    // {'question1.id': 'true'} that means the answer is correct we change the background to green
    // {'question1.id': 'false'} that means the answer is wrong we change it to red
    // {'question1.id': 'null'} the user hasn't answered the question at all

    const checkAnswers = useCallback(() => {
        const newQuestionStatus = { ...questionState }
        chapter.question.forEach(question => {
            const user_answer = answers[question.id]
            if (!user_answer) return
            if (user_answer === question.answer) {
                newQuestionStatus[question.id] = true
            } else{
                newQuestionStatus[question.id] = false
            }
            setQuestionState(newQuestionStatus)
        })
    }, [answers, questionState, chapter.question])
    return (
        <div className='flex-[1] mt-16 ml-8'>
            <h1 className='text-2xl font-bold'> Concept Check </h1>
            <div className='mt-2'>
                {chapter.question.map(question => {
                    const options: string[] = JSON.parse(question.options ?? '[]') as string[];
                    return (
                        <div key={question.id} className={cn(
                            'p-3 mt-4 border border-secondary rounded-lg', {
                                'bg-green-700': questionState[question.id] === true,
                                'bg-red-700': questionState[question.id] === false,
                                'bg-secondary': questionState[question.id] === null,

                            }
                        )}>

                            <h1 className='text-lg font-semibold'>{question.question}</h1>
                            <div className='mt-2'>
                                <RadioGroup onValueChange={(e) => {
                                    setAnswers((prev) => {
                                        return {
                                            ...prev,
                                            [question.id]: e
                                        }
                                    })
                                }}>
                                    {options.map((option, optionIndex) => {
                                        return (
                                            <div key={optionIndex} className='flex items-center space-x-2'>
                                                <RadioGroupItem value={option} id={question.id + optionIndex.toString()} />
                                                <Label htmlFor={question.id + optionIndex.toString()}>
                                                    {option}
                                                </Label>


                                            </div>
                                        )
                                    })}
                                </RadioGroup>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Button className='w-full mt-2 ' size='lg' onClick={checkAnswers}>
                Check Answer <ChevronRightIcon className='w-4 h-4 ml-2' />
            </Button>
        </div>
    )
}

export default QuizCards