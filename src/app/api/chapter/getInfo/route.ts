// /api/chapter/getInfo

import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getQuestionsFromTranscript, getTranscript, searchYoutube } from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";

const sleep = async () =>
    new Promise(resolve => {
        setTimeout(resolve, Math.random() * 4000);
    });
const bodyParser = z.object({
    chapterId: z.string()
})
export async function POST(req: Request, res: Response) {
    try {
        // await sleep(); we just used it to see how the ref works
        const body = await req.json()
        const { chapterId } = bodyParser.parse(body)
        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
            },
        });
        if (!chapter) {
            return NextResponse.json({
                success: false, error: "Chapter not found"
            }, { status: 404 })
        }

        // get video id
        const videoId = await searchYoutube(chapter.youtubeSearchQuery)
        let transcript = await getTranscript(videoId);
        // because the transcript can get too long so to avoid issues
        let maxLength = 500
        transcript = transcript.split(' ').slice(0, maxLength).join(' ')

        const { summary }: { summary: string } = await strict_output(
            'You are an AI capable of summerizing a youtube transcript',
            'Summarize in 250 words or less and do not talk of the sponsors or anything unrelatted to the main topic, also do not introduce what the summary is about.\n' + transcript,
            {
                summary: "summary of the transcript"
            }
        );

        const questions = await getQuestionsFromTranscript(transcript, chapter.name)

        await prisma.question.createMany({
            data: questions.map(question => {
                let options = [question.answer, question.option1, question.option2, question.option3]
                options.sort(() => Math.random() - 0.5)
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),  //in the prisma itll be a array json.parse to get them
                    chapterId: chapterId
                }
            })
        })
        // we need to update the database with the new details the video id etc
        await prisma.chapter.update({
            where: { id: chapterId },
            data: {
                videoId: videoId,
                summary: summary,
            }
        })
        console.log({ summary, questions, transcript })
        return NextResponse.json({ success: true })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false, error: "invalid body"
            }, { status: 400 })
        }
        console.log(error)
        return NextResponse.json({
            success: false, error: "An error occured"
        }, { status: 500 })

    }
}
