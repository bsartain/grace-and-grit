// app/api/sheet-data/route.ts (App Router) or pages/api/sheet-data.ts (Pages Router)
import { NextResponse } from "next/server"; // Use 'NextApiRequest'/'NextApiResponse' for Pages Router

export async function GET() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwX_phWT-u9yiulXfzyCpioxs8-0XvF0v9c-8xvtwGmdysyXhPhabqenCBw347Zg9qM6A/exec",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
