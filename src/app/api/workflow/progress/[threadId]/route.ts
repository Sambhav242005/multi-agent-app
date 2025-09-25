import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    // Await the params before accessing threadId
    const { threadId } = await params;
    
    // Forward to FastAPI backend
    const response = await fetch(`${process.env.FASTAPI_BASE_URL || 'http://localhost:8000'}/get_progress/${threadId}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get progress:', error);
    return NextResponse.json(
      { error: 'Failed to get progress' },
      { status: 500 }
    );
  }
}