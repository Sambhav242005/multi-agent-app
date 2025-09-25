import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to FastAPI backend
    const response = await fetch(`${process.env.FASTAPI_BASE_URL || 'http://localhost:8000'}/run_workflow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in run workflow:', error);
    return NextResponse.json(
      { error: 'Failed to run workflow' },
      { status: 500 }
    );
  }
}