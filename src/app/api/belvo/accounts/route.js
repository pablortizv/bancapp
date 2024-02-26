import { NextResponse } from "next/server"

export async function POST(request) {

  const data = await request.json()
  const auth = process.env.AUTH_BELVO
  try {
    const response = await fetch('https://sandbox.belvo.com/api/accounts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({
        "link": data.link,
      }),
    });

    const accounts = await response.json();

    return NextResponse.json(accounts)
  } catch (error) {
    return NextResponse.json({
      message: error.message
    }, {
      status: 500
    })
  }
}