import { NextRequest, NextResponse } from 'next/server';

function generateReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = '';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `REF-${ref}`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      organization,
      designation,
      country,
      phone,
      vertical,
      projectType,
      budgetRange,
      timeline,
      projectDescription,
    } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!organization || typeof organization !== 'string' || organization.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Organization is required.' },
        { status: 400 }
      );
    }

    if (!vertical || typeof vertical !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Vertical (subsidiary) selection is required.' },
        { status: 400 }
      );
    }

    const reference = generateReference();

    return NextResponse.json({
      success: true,
      reference,
    });
  } catch (error) {
    console.error('[Quote API Error]', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }
}
