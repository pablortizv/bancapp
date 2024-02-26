import { NextResponse } from "next/server"
import db from '@/libs/db'
import bcrypt from 'bcrypt'


export async function POST(request) {
    try {
        const data = await request.json()

        const emailFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (emailFound) {
            return NextResponse.json({
                message: "Ya existe una cuenta con este correo"
            }, {
                status: 400
            })
        }

        const userFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        })

        if (userFound) {
            return NextResponse.json({
                message: "Usuario ya existe"
            }, {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        })

        const { password: _, ...user } = newUser

        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}