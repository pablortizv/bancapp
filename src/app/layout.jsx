import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth";
import { SessionProvider } from '@/app/SessionProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bancapp",
  description: "Código de prueba",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es">
      <body className={inter.className }>
      <SessionProvider session={session}> 
        <Navbar/>
        {children}
        </SessionProvider>
        </body>
    </html>
  );
}
