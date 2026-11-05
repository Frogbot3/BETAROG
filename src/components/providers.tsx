"use client";
import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
