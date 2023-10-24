"use client"

import dynamic from 'next/dynamic';
const HankoAuth = dynamic(() => import('@/components/HankoAuth'), { ssr: false })


export default function LoginPage() {
  return (
  <div className="flex min-h-screen justify-center items-center ">
    <HankoAuth />
  </div>
  );
}
