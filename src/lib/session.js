'use server'
import { cookies } from 'next/headers'

export default async function session({ token, user }) {
    console.log(token)
    console.log(user)

    cookies().set('session123', token, {
        httpOnly: true,
        secure: true,
        // expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}
