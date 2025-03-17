import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// Get user's attendance records
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;
    
    const attendance = await prisma.attendance.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance records' }, { status: 500 });
  }
}

// Create check-in record
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, notes } = await request.json();
    
    if (type === 'check-in') {
      // Check if already checked in today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          userId: session.user.id,
          date: {
            gte: today,
          },
        },
      });

      if (existingAttendance) {
        return NextResponse.json(
          { error: 'Already checked in today' },
          { status: 400 }
        );
      }

      // Create new attendance record
      const now = new Date();
      const attendance = await prisma.attendance.create({
        data: {
          userId: session.user.id,
          date: now,
          checkIn: now,
          status: 'PRESENT',
          notes: notes,
        },
      });

      return NextResponse.json(attendance);
    } else if (type === 'check-out') {
      // Find today's check-in record
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          userId: session.user.id,
          date: {
            gte: today,
          },
          checkOut: null, // Not checked out yet
        },
      });

      if (!existingAttendance) {
        return NextResponse.json(
          { error: 'No check-in found for today' },
          { status: 400 }
        );
      }

      // Update with check-out time
      const now = new Date();
      const attendance = await prisma.attendance.update({
        where: {
          id: existingAttendance.id,
        },
        data: {
          checkOut: now,
          notes: notes ? `${existingAttendance.notes || ''} | ${notes}` : existingAttendance.notes,
        },
      });

      return NextResponse.json(attendance);
    }

    return NextResponse.json(
      { error: 'Invalid action type. Must be check-in or check-out' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error recording attendance:', error);
    return NextResponse.json({ error: 'Failed to record attendance' }, { status: 500 });
  }
} 