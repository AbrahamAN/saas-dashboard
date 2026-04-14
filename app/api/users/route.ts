import { NextResponse , NextRequest } from 'next/server'


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

interface CreateUserRequest  {
    name:string;
    email:string;
}


export async function GET() {
    return NextResponse.json(users)
}

export async function POST(request: NextRequest) {

    const body = await request.json()

    if(body.name.length > 2 && body.email.includes('@')){
        const newUser = {
            id:users.length + 1,
            name:body.name,
            email:body.email
        }
        users.push(newUser)
        return NextResponse.json(newUser, {status:201})
    }else{
        return NextResponse.json({error:'Datos invalidos '} , {status:400})
    }
}