import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const areaOfInterest = formData.get('areaOfInterest') as string;
    const passportUrl = formData.get('passportUrl') as string;
    const experienceCertificateUrl = formData.get('experienceCertificateUrl') as string || null;

    console.log('📝 Received candidate submission:', { firstName, lastName, email, areaOfInterest });

    if (!firstName || !lastName || !email || !phone || !areaOfInterest || !passportUrl) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const submission = await prisma.candidateSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        areaOfInterest,
        passportUrl,
        experienceCertificateUrl: experienceCertificateUrl || undefined,
        status: 'pending',
      },
    });

    console.log('✅ Candidate submission saved:', submission.id);

    return NextResponse.json({
      success: true,
      message: 'Your application has been submitted successfully!',
      data: submission,
    });
  } catch (error) {
    console.error('❌ Error saving candidate submission:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit application. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📋 Fetching all candidate submissions...');
    
    const submissions = await prisma.candidateSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`✅ Found ${submissions.length} candidate submissions`);

    return NextResponse.json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error('❌ Error fetching submissions:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submissions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    console.log(`📝 Updating submission ${id} status to: ${status}`);

    const submission = await prisma.candidateSubmission.update({
      where: { id: parseInt(id) },
      data: {
        status,
        ...(notes && { notes }),
      },
    });

    console.log('✅ Submission updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Submission updated',
      data: submission,
    });
  } catch (error) {
    console.error('❌ Error updating submission:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update submission',
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
        { success: false, message: 'Submission ID is required' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Deleting submission ${id}`);

    await prisma.candidateSubmission.delete({
      where: { id: parseInt(id) },
    });

    console.log('✅ Submission deleted successfully');

    return NextResponse.json({
      success: true,
      message: 'Submission deleted',
    });
  } catch (error) {
    console.error('❌ Error deleting submission:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
