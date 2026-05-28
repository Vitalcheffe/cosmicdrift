import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';

export async function GET() {
  try {
    const pdfPath = '/home/z/my-project/download/AfriGrid-Hackathon-2026.pdf';
    const pdfBuffer = await readFile(pdfPath);
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="AfriGrid-Hackathon-2026.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
