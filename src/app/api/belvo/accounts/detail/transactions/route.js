import { NextResponse } from "next/server"

export async function POST(request) {

  const data = await request.json()
  const auth = process.env.AUTH_BELVO;
  const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

  try {
    const response = await fetch('https://sandbox.belvo.com/api/transactions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({
        "link": data.link,
        "date_from": formatDate(lastMonth),
        "date_to": formatDate(today),
        "account": data.account
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

