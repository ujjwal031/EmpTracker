import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@emptrack.com' },
      update: {},
      create: {
        email: 'admin@emptrack.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
        position: 'Administrator',
        department: 'Management',
      },
    });

    console.log('Admin user created:', admin.id);

    // Create employee user
    const employeePassword = await bcrypt.hash('employee123', 10);
    const employee = await prisma.user.upsert({
      where: { email: 'employee@emptrack.com' },
      update: {},
      create: {
        email: 'employee@emptrack.com',
        name: 'Test Employee',
        password: employeePassword,
        role: 'EMPLOYEE',
        position: 'Software Engineer',
        department: 'Engineering',
      },
    });

    console.log('Employee user created:', employee.id);

    // Create sample attendance records
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    // Sample check-in time (9:00 AM)
    const checkInTime = new Date(today);
    checkInTime.setHours(9, 0, 0, 0);

    // Sample check-out time (5:00 PM)
    const checkOutTime = new Date(today);
    checkOutTime.setHours(17, 0, 0, 0);

    // Create attendance records
    await prisma.attendance.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: employee.id,
          date: twoDaysAgo,
          checkIn: new Date(twoDaysAgo.setHours(9, 15, 0, 0)),
          checkOut: new Date(twoDaysAgo.setHours(17, 30, 0, 0)),
          status: 'LATE',
          notes: 'Traffic was heavy',
        },
        {
          userId: employee.id,
          date: yesterday,
          checkIn: new Date(yesterday.setHours(8, 50, 0, 0)),
          checkOut: new Date(yesterday.setHours(17, 0, 0, 0)),
          status: 'PRESENT',
          notes: 'Regular day',
        },
      ],
    });

    console.log('Sample attendance records created');

    // Create sample meetings
    const meetingTime = new Date(today);
    meetingTime.setHours(14, 0, 0, 0);

    const meeting = await prisma.meeting.create({
      data: {
        title: 'Weekly Team Sync',
        description: 'Discuss project progress and goals for next week',
        startTime: meetingTime,
        endTime: new Date(meetingTime.getTime() + 60 * 60 * 1000), // 1 hour later
        meetingLink: 'https://meet.google.com/sample-link',
        organizerId: admin.id,
        attendees: {
          create: [
            {
              userId: employee.id,
              status: 'ACCEPTED',
            },
          ],
        },
      },
    });

    console.log('Sample meeting created:', meeting.id);

    // Create sample GitHub activity
    await prisma.githubActivity.create({
      data: {
        userId: employee.id,
        activityType: 'COMMIT',
        repository: 'emptrack/main',
        commitMessage: 'Fix login bug in authentication system',
        date: new Date(yesterday.setHours(14, 30, 0, 0)),
      },
    });

    console.log('Sample GitHub activity created');

    // Create sample performance record
    await prisma.performance.create({
      data: {
        userId: employee.id,
        date: yesterday,
        rating: 4.5,
        feedback: 'Great job on the recent project. Communication could be improved.',
        achievements: 'Successfully implemented new authentication system',
        goals: 'Improve code documentation and test coverage',
      },
    });

    console.log('Sample performance record created');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    console.log('Database seed completed successfully');
  })
  .catch(async (e) => {
    console.error('Error running seed script:', e);
    await prisma.$disconnect();
    process.exit(1);
  }); 