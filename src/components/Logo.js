import React from 'react';
import Image from 'next/image';

export default function Logo({ className = '', width = 120, height = 40 }) {
  return (
    <Image
      src="/images/riseLogo.svg"
      alt="Rise Digital Agency Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
} 