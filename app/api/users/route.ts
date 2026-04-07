import { NextResponse } from 'next/server'


const users = [
    {
        id:1,
        name: 'Alice Johnson',
        email: 'john.doe@example.com'
    },
    {
        id:2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com'
    },
    {
        id:3,
        name: 'Jim Doe',
        email: 'jim.doe@example.com'
    },
    {
        id:4,
        name: 'Jill Doe',
        email: 'jill.doe@example.com'
    },
    {
        id:5,
        name: 'Abraham Navarro',
        email: 'abraham.valera25@gmail.com'
    }
]

export async function GET() {
    return NextResponse.json(users)
}