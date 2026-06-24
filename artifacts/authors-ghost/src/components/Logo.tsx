import React from "react";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** Stylised ghost-eye mark: a geometric phantom shape that conveys perception + authority */
export function LogoMark({ size = 32, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="lgA" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="lgB" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Outer hexagon - authority ring */}
      <path
        d="M20 3L35.5 12V28L20 37L4.5 28V12L20 3Z"
        fill="url(#lgA)"
        opacity="0.15"
      />
      <path
        d="M20 3L35.5 12V28L20 37L4.5 28V12L20 3Z"
        stroke="url(#lgA)"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Ghost body - stylised phantom silhouette */}
      <path
        d="M20 8C14.477 8 10 12.477 10 18V30C10 31.105 10.895 32 12 32C12.895 32 13.636 31.433 13.899 30.648L14.5 29L15.5 30.5C15.833 31 16.5 31 17 30.5L18 29L19 30.5C19.333 31 20.667 31 21 30.5L22 29L23 30.5C23.5 31 24.167 31 24.5 30.5L25.5 29L26.101 30.648C26.364 31.433 27.105 32 28 32C29.105 32 30 31.105 30 30V18C30 12.477 25.523 8 20 8Z"
        fill="url(#lgB)"
        opacity="0.9"
      />

      {/* Left eye - the perception lens */}
      <circle cx="16.5" cy="17.5" r="2.5" fill="#070810" />
      <circle cx="16.5" cy="17.5" r="1.2" fill="white" />
      <circle cx="17.1" cy="16.9" r="0.45" fill="white" opacity="0.7" />

      {/* Right eye */}
      <circle cx="23.5" cy="17.5" r="2.5" fill="#070810" />
      <circle cx="23.5" cy="17.5" r="1.2" fill="white" />
      <circle cx="24.1" cy="16.9" r="0.45" fill="white" opacity="0.7" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
}

export function Logo({ className = "", iconSize = 32, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={iconSize} />
      {showText && (
        <span className="text-white font-bold tracking-widest text-sm uppercase select-none">
          Authors Ghost
        </span>
      )}
    </div>
  );
}
