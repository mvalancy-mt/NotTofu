import React from 'react'
import Image from 'next/image'

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <div className="inline-flex rounded-full border border-gray-800 p-0.5">
      <Image 
        src="/Logo.png" 
        alt="NotTofu Logo" 
        width={size} 
        height={size}
        className="rounded-full"
      />
    </div>
  )
} 