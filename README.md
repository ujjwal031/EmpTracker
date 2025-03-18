# EmpTrack - Employee Management System

A comprehensive employee management platform built with Next.js, React, TypeScript, MongoDB Atlas, and Tailwind CSS.

## Features

- 📊 **Dashboard Analytics**: Real-time attendance stats and performance metrics
- 👥 **Employee Management**: Track employee details, roles, and departments
- ⏱️ **Attendance Tracking**: Record check-ins, check-outs, and attendance status
- 📝 **Task Management**: Assign and monitor tasks with priority levels
- 📅 **Meeting Scheduler**: Organize and track team meetings
- 🌓 **Dark/Light Mode**: Toggle between themes for better viewing comfort
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB Atlas account (free tier works fine)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/emptrack.git
cd emptrack
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up MongoDB Atlas**

   a. Create a free MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   
   b. Create a new project
   
   c. Build a free cluster (M0)
   
   d. Create a database user with read/write permissions
   
   e. Add your current IP address to the IP Access List
   
   f. Get your connection string by clicking "Connect" > "Connect your application"

4. **Configure environment variables**

   a. Copy the `.env.example` file to `.env`
   
   ```bash
   cp .env.example .env
   ```
   
   b. Update the `.env` file with your MongoDB Atlas connection string
   
   ```
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-address>/<database>?retryWrites=true&w=majority"
   NEXTAUTH_SECRET="your-secret-key-here-min-32-chars"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. **Push the schema to MongoDB**

```bash
npx prisma db push
```

6. **Seed the database with test data**

```bash
npm run seed
```

7. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

8. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Login Credentials (after running seed script)

- **Admin:**
  - Email: admin@emptrack.com
  - Password: admin123

- **Employee:**
  - Email: employee@emptrack.com
  - Password: employee123

## Project Structure

```
emptrack/
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── lib/            # Utility functions and helpers
│   ├── server/         # Server-side code
│   └── styles/         # CSS and styling
├── .env                # Environment variables
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Technologies Used

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API routes, NextAuth.js
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js with credentials and GitHub providers
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS with dark mode support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- MongoDB team for the database service
