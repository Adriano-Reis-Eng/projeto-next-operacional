import { NextRequest, NextResponse } from "next/server";

const url = "https://script.google.com/macros/s/AKfycbzm2VNugtjH9K79zzDsGhM3g2gIuxe9OWQDqlerbIyljxIEBqahKep_wTaQTpJ5Y6Ai/exec";

             
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('teste api' , body)

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },    
    body: JSON.stringify(body),
  });
  console.log('reposta', response)

  const data = await response.json();  
  return NextResponse.json(data, { status: response.status });
} 
