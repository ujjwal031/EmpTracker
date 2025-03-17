# EmpTrack - Employee Management System

A comprehensive web application for employee management, tracking attendance, GitHub activity, meetings, and performance metrics.

## Features

- Dashboard with performance metrics and activity tracking
- Attendance management with check-in/check-out functionality
- GitHub integration for code contributions
- Meeting scheduling and management
- Performance analytics
- Dark/light mode support
- Responsive design

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- NextAuth.js for authentication
- Prisma ORM
- PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- PostgreSQL database
- GitHub OAuth application (optional, for GitHub login)

### Setup PostgreSQL

1. Install PostgreSQL on your machine or use a cloud provider
2. Create a new database:
   ```sql
   CREATE DATABASE emptracker;
   ```
3. Make note of your connection details (username, password, host, port)

### Setup the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/emp-mana.git
   cd emp-mana
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy the `.env` file and update it with your database and authentication settings:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/emptracker?schema=public"
   NEXTAUTH_SECRET="your-secure-random-string"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional for GitHub login
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""
   ```

4. Initialize the database:
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Login Credentials

After seeding the database, you can log in with the following test accounts:

- **Admin**
  - Email: admin@emptrack.com
  - Password: admin123

- **Employee**
  - Email: employee@emptrack.com
  - Password: employee123

## Database Schema

The application uses several models:

- `User`: Stores user information and authentication details
- `Attendance`: Tracks daily check-ins and check-outs
- `GithubActivity`: Records GitHub contributions
- `Meeting`: Manages scheduled meetings
- `Performance`: Stores performance reviews and ratings

## Authentication

The application uses NextAuth.js for authentication with:

- Email/password login
- GitHub OAuth (if configured)
- JWT session handling
- Role-based access control

## Development

### Key Features to Implement or Customize

1. **GitHub Integration**: Add real GitHub API integration for tracking code contributions
2. **Notifications**: Implement notification system for meetings and actions
3. **Reporting**: Add analytics and reporting features
4. **Mobile App**: Develop a companion mobile app for easier check-ins

### Folder Structure

- `/src/app`: Next.js App Router pages and layouts
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and shared libraries
- `/prisma`: Database schema and migrations

## Screenshots

Coming soon!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
