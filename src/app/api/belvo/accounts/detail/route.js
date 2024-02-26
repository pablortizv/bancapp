import { NextResponse, } from "next/server"

export async function GET(request, res) {
    const { nextUrl: { search } } = request;
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());

  const auth = process.env.AUTH_BELVO
  try {
    const response = await fetch(`https://sandbox.belvo.com/api/accounts/${params.account}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      }
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