import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to FastAPI backend
    const response = await fetch(`${process.env.FASTAPI_BASE_URL || 'http://localhost:8000'}/continue_clarifier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in continue clarifier:', error);
    return NextResponse.json(
      { error: 'Failed to continue clarifier' },
      { status: 500 }
    );
  }
}