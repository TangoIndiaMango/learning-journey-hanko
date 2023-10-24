import TypeWriter from "@/components/TypeWriter";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-animate">
      <h1 className="text-5xl font-bold text-white mb-8 "><TypeWriter /></h1>
      <p className="text-xl text-white mb-12">Discover, Learn, and Achieve Your Goals</p>
      <Link href="/gallery" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold py-3 px-6 rounded-lg transition duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105">Get Started</Link>
    </div>
  )
}
