import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Методическая копилка",
  description: "Ресурс для обмена педагогическим опытом",
  generator: "GymCoders",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`font-sans antialiased ${_geist.className}`} 
        suppressHydrationWarning={true} 
      >
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}