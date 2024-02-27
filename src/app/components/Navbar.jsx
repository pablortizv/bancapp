import Link from 'next/link'
import React from 'react'
import { getServerSession,  } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

async function Navbar() {
    const session = await getServerSession(authOptions)
    return (
        <nav className='flex justify-between items-center bg-blue-950 text-white text-sm px-5 py-3 sticky mb-14'>
            <h1 className='text-xl font-bold'><Link href={"/"}>Bancapp </Link></h1>
            <ul className='flex gap-x-2'>
                {
                    !session?.user ? (
                        <>
                            <li>
                                <Link href={"/auth/login"}>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href={"/auth/register"}>
                                    Registrarse
                                </Link>
                            </li>
                        </>
                    ) :
                        (
                            <>
                                <li>
                                    <Link href={"/dashboard"}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/api/auth/signout"}>
                                        Cerrar sesión
                                    </Link>
                                </li>
                            </>
                        )
                }
            </ul>
        </nav>
    )
}

export default Navbar