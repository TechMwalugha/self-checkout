import { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Admin Panel"
}

export default function RootLayout({
    children
} : Readonly<{ children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body>
                <main className="p-5">
                    {children}
                </main>
            </body>
        </html>
    )
}