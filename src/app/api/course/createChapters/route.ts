// /api/course/createChapters

import { getuserID } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { createChaptersSchema } from "@/validators/course";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
    const userId = await getuserID()
    try {
        const body = await req.json()
        
        const { title, units } = createChaptersSchema.parse(body)

        type outputUnits = {
            title: string;
            chapters: {
                youtube_search_query: string;
                chapter_title: string;
            }[];
        }[];

        let output_units: outputUnits = await strict_output(
            'You are an AI capable of creating course content, coming up with reevant chapter titles and finding relevant YOUTUBE videos for each chapter',
            new Array(units.length).fill(
                `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter rovide a detail youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`
            ),
            {
                title: 'title of the unit',
                chapters: 'an array of chapters, and each chapters should have a youtube_search_query and a chapter_title key in the json object'
            }

        );

        const imageSearchTerm = await strict_output(
            'You are a creative and helpful AI assistant capable of generating relevant image for a Course.',
            `please provide a good image search term for the title of a course about ${title}. he search term will be fed into the UNSPLASH API make sure it is a good search term that will return good result.`,
            {
                image_search_term: 'generate a good search term for the title of the course'
            }
        );

        const course_image = await getUnsplashImage(imageSearchTerm.image_search_term)

        const course = await prisma.course.create({
            data: {
                name: title,
                image: course_image,
                userId: userId as any
            },
        });

        for (const unit of output_units) {
            const title = unit.title
            const prismaUnit = await prisma.unit.create({
                data: {
                    name: title,
                    courseId: course.id
                },
            });
            await prisma.chapter.createMany({
                data: unit.chapters.map((chapter) => {
                    return {
                        name: chapter.chapter_title,
                        youtubeSearchQuery: chapter.youtube_search_query,
                        unitId: prismaUnit.id
                    }
                })
            })
        }


        console.log(imageSearchTerm)
        return NextResponse.json({ course_id: course.id })
    } catch (error) {
        if (error instanceof ZodError) {
            return new NextResponse('invalid body', { status: 400 })
        }
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 });
    
    }
}