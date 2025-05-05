import { NextRequest, NextResponse } from "next/server";

const url = "https://script.google.com/macros/s/AKfycbyzzZIakU2RWaacWUtn1jS9URU6i4x9Fqic__ICcibn8bHCvKz5-PA8qpSir4AjIgvH/exec";
             
export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
} 

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const queryString = searchParams.toString();
//   const Url = `${url}?${queryString}`;
//   const response = await fetch(Url);
  
//   if (!response.ok) {
//     return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
//   }

//   const data = await response.json();
//   return NextResponse.json(data);
// }