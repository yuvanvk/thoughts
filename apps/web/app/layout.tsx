import { Geist, Geist_Mono } from "next/font/google"
import { Instrument_Serif } from "next/font/google"
import "@workspace/ui/globals.css"
import { Providers } from "@/components/wrapper/providers"


const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontInstrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"]
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontInstrumentSerif.variable}  antialiased dark:bg-[#171717]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
