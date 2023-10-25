import GalleryCourseCard from '@/components/GalleryCourseCard'
import Navbar from '@/components/Navbar'
import { getuserID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import React from 'react'

type Props = {}

const GalleryPage = async (props: Props) => {
    const userId = await getuserID()
    const courses = await prisma.course.findMany({

        where: {
            userId: userId
        },
        include: {
            units: {
                include: {
                    chapters: true
                }
            }
        }


    })
    return (
        <>
            <Navbar />
            <div className='py-8 mx-auto max-w-7xl'>
                {courses.length === 0 ? (
                    
                        <div className="w-50 h-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 mx-auto mt-4 rounded-md bg-gradient-to-tr from-green-400 to-blue-500 shadow-lg transform hover:scale-105 transition duration-300">
                            <h3 className="text-2xl font-bold text-white">No Courses</h3>
                            <p className="text-white mt-2">You don&apos;t have any Course yet. Create one to get started!</p>
                        <Link href="/create" className="bg-white flex justify-center text-green-500 font-semibold px-4 py-2 mt-4 rounded-lg hover:bg-green-500 hover:text-white transition duration-300">
                            Create Notes
                        </Link>
                        </div>
                    
                ) : (
                    // Render the grid of courses when there are courses
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center'>
                        {courses.map(course => (
                            <GalleryCourseCard course={course} key={course.id} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default GalleryPage;
