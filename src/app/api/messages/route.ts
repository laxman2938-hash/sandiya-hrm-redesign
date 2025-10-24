import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📨 Received contact form submission:', body);

    const message = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      },
    });

    console.log('✅ Contact message saved successfully:', message.id);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      data: message,
    });
  } catch (error) {
    console.error('❌ Error saving contact message:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    console.log(`📝 Updating message ${id} status to: ${status}`);

    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    console.log('✅ Message status updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: message,
    });
  } catch (error) {
    console.error('❌ Error updating message status:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update status',
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
        { success: false, message: 'Message ID is required' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Deleting message ${id}`);

    await prisma.contactMessage.delete({
      where: { id: parseInt(id) },
    });

    console.log('✅ Message deleted successfully');

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting message:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📨 Fetching all contact messages...');
    
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`✅ Found ${messages.length} contact messages`);

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('❌ Error fetching contact messages:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch messages.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
