import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean up existing data
    await prisma.attendance.deleteMany({});
    await prisma.githubActivity.deleteMany({});
    await prisma.meetingAttendee.deleteMany({});
    await prisma.meeting.deleteMany({});
    await prisma.performance.deleteMany({});
    await prisma.task.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});

    // Create admin user
    const adminPassword = await bcryptjs.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@emptrack.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'admin',
        position: 'Administrator',
        department: 'Management',
        joinedAt: new Date(),
        githubUsername: 'adminuser',
      },
    });

    console.log('Admin user created:', admin.id);

    // Create employee user
    const employeePassword = await bcryptjs.hash('employee123', 10);
    const employee = await prisma.user.create({
      data: {
        email: 'employee@emptrack.com',
        name: 'Test Employee',
        password: employeePassword,
        role: 'employee',
        position: 'Software Engineer',
        department: 'Engineering',
        joinedAt: new Date(),
        githubUsername: 'testemployee',
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
    const attendance1 = await prisma.attendance.create({
      data: {
        userId: employee.id,
        date: new Date(twoDaysAgo),
        checkIn: new Date(new Date(twoDaysAgo).setHours(9, 15, 0, 0)),
        checkOut: new Date(new Date(twoDaysAgo).setHours(17, 30, 0, 0)),
        status: 'late',
        description: 'Traffic was heavy',
      },
    });

    const attendance2 = await prisma.attendance.create({
      data: {
        userId: employee.id,
        date: new Date(yesterday),
        checkIn: new Date(new Date(yesterday).setHours(8, 50, 0, 0)),
        checkOut: new Date(new Date(yesterday).setHours(17, 0, 0, 0)),
        status: 'present',
        description: 'Regular day',
      },
    });

    console.log('Sample attendance records created');

    // Create sample GitHub activity
    await prisma.githubActivity.create({
      data: {
        userId: employee.id,
        commitCount: 12,
        prCount: 3,
        issueCount: 5,
        repository: 'emp-mana/main',
        date: new Date(yesterday),
      },
    });

    console.log('Sample GitHub activity created');

    // Create sample meeting
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
        userId: employee.id,
      },
    });

    // Create meeting attendees
    await prisma.meetingAttendee.create({
      data: {
        meetingId: meeting.id,
        userId: employee.id,
        status: 'accepted',
      },
    });

    console.log('Sample meeting created:', meeting.id);

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

    // Create sample tasks
    await prisma.task.create({
      data: {
        title: 'Implement new dashboard features',
        description: 'Add charts and analytics to the dashboard',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(new Date().setDate(today.getDate() + 5)),
        userId: employee.id,
      },
    });

    await prisma.task.create({
      data: {
        title: 'Fix login page bugs',
        description: 'Address the form validation issues on the login page',
        status: 'pending',
        priority: 'medium',
        dueDate: new Date(new Date().setDate(today.getDate() + 2)),
        userId: employee.id,
      },
    });

    console.log('Sample tasks created');

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