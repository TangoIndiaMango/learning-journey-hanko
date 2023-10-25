"use client"
import React from 'react'
import Typewriter from 'typewriter-effect'
type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <>
    <Typewriter options={{
        loop: true,
    }}
    onInit={(typewriter) => {
        typewriter.typeString('Your Learning Odyssey Starts Here 🚀').pauseFor(2000).deleteAll().typeString("Where knowledge that meets convinience 📔").pauseFor(2000).deleteAll().typeString("OPEN AI 📔").pauseFor(2000).deleteAll().typeString("Elliot Chong..... BrainBuster 🧠").start()
    }}/>
    </>
  )
}

export default TypewriterTitle