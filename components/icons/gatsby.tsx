import React from 'react';
import { ComponentProps } from 'react';

export default function GatsbyIcon({
  width = 24,
  height = 24,
}: ComponentProps<'svg'>) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      focusable="false"
    >
      <title>Gatsby</title>
      <path
        d="M14 0C6.3 0 0 6.3 0 14s6.3 14 14 14 14-6.3 14-14S21.7 0 14 0zM6.2 21.8C4.1 19.7 3 16.9 3 14.2L13.9 25c-2.8-.1-5.6-1.1-7.7-3.2zm10.2 2.9L3.3 11.6C4.4 6.7 8.8 3 14 3c3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3C19.7 6.5 17 5 14 5c-3.9 0-7.2 2.5-8.5 6L17 22.5c2.9-1 5.1-3.5 5.8-6.5H18v-2h7c0 5.2-3.7 9.6-8.6 10.7z"
        fill="#639"
      />
    </svg>
  );
}
