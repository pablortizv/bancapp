import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import db from '@/libs/db'
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Correo" },
                password: { label: "Password", type: "password", placeholder: "******" }
            },
            async authorize(credentials, req) {
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!userFound) throw new Error('Usuario y/o contraseña erronea(s)')
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                if(!matchPassword) throw new Error('Usuario y/o contraseña erronea(s)')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async session({ session, token, user }) {
            const userFound = await db.user.findUnique({
                where: {
                    email: token.email
                }
            })
            session.accessToken = userFound.linkID
            return session
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }