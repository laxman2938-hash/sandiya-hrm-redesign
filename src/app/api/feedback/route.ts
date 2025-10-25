import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      feedbackType,
      subject,
      message,
      category,
      attachmentUrl,
      isAnonymous,
    } = body;

    console.log('📝 Received feedback submission:', { name, email, feedbackType, category });

    if (!name || !email || !feedbackType || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['feedback', 'grievance', 'complaint', 'suggestion'].includes(feedbackType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid feedback type' },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        name: isAnonymous ? 'Anonymous' : name,
        email: isAnonymous ? 'anonymous@example.com' : email,
        phone: phone || null,
        feedbackType,
        subject,
        message,
        category: category || null,
        attachmentUrl: attachmentUrl || null,
        isAnonymous: isAnonymous || false,
        status: 'open',
        priority: feedbackType === 'grievance' || feedbackType === 'complaint' ? 'high' : 'normal',
      },
    });

    console.log('✅ Feedback saved:', feedback.id);

    return NextResponse.json({
      success: true,
      message: 'Your feedback has been submitted successfully. Thank you!',
      data: feedback,
    });
  } catch (error) {
    console.error('❌ Error saving feedback:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit feedback. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📋 Fetching all feedback submissions...');

    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`✅ Found ${feedbacks.length} feedback submissions`);

    return NextResponse.json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error('❌ Error fetching feedbacks:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch feedbacks',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, priority, resolution } = body;

    console.log(`📝 Updating feedback ${id} status to: ${status}`);

    const feedback = await prisma.feedback.update({
      where: { id: parseInt(id) },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(resolution && { resolution }),
        updatedAt: new Date(),
      },
    });

    console.log('✅ Feedback updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Feedback updated',
      data: feedback,
    });
  } catch (error) {
    console.error('❌ Error updating feedback:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update feedback',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Deleting feedback ${id}`);

    await prisma.feedback.delete({
      where: { id: parseInt(id) },
    });

    console.log('✅ Feedback deleted successfully');

    return NextResponse.json({
      success: true,
      message: 'Feedback deleted',
    });
  } catch (error) {
    console.error('❌ Error deleting feedback:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete feedback',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
