
# Full Stack Job Portal Application - React, Tailwind, Supabase, Clerk, and Shadcn UI.

![image](https://github.com/user-attachments/assets/5b0edff7-975b-41df-b802-ddce02b5d5d8)


This project is a full stack job portal application built using **React.js**, **Tailwind CSS**, **Supabase**, **Clerk** for authentication, and **Shadcn UI** for the frontend components. The application allows both **candidates** and **recruiters** to interact in a seamless job listing and application platform. It covers a wide range of functionalities such as user authentication, job posting, applying for jobs, and tracking job application statuses.

## Key Features
- **User Authentication**: Integrates **Clerk** to manage authentication (Google or custom email/password).
- **Role Selection**: Onboarding screen allows users to select between **candidate** or **recruiter** roles.
- **Job Listings**: Users can search, filter, view, and apply for jobs.
- **Recruiters**: Can post jobs, manage applicants, and track application statuses.
- **Responsive Design**: Built using **Tailwind CSS** to ensure a seamless experience across devices.
- **Storage and Database**: Uses **Supabase** to store job posts, applications, and user data.
- **Job Assessments**: Candidates can take assessments linked to specific job applications.
- **Deployment**: Fully hosted on **Vercel** with environment variables for API keys and credentials.

## Functionalities

### For Candidates:
- View, search, and filter job listings.
- Apply for jobs and take relevant assessments.
- Save jobs to a wishlist using Supabase.
- View saved jobs and track the status of applications.
- Manage account settings and sign out functionality.

### For Recruiters:
- Post jobs with custom fields like **job title**, **job description**, **location**, and **company details**.
- Manage job postings, including **changing hiring status** (open/closed).
- View applications received for specific jobs.
- Download applicant resumes.
- Update the application status (e.g., applied, interviewing, hired, or rejected).

### General Features:
- Responsive UI built using **Shadcn UI** and **Tailwind CSS**.
- Integrated with **Supabase Storage** to handle uploads like resumes.
- Dynamic **job filters** and **search bar** for easy job discovery.


## Snapshots

### SignUp: 
![image](https://github.com/user-attachments/assets/8e7b995f-ba79-4ecb-8f0f-6e9f12be6b1c)

### Recruiter: 
![image](https://github.com/user-attachments/assets/a9631569-5810-4cfd-87cc-df75580eb161)

### Candidate: 
![image](https://github.com/user-attachments/assets/b9cb6263-bd3d-45b2-aaf0-8e5ee5e53e5a)

### Application: 
![image](https://github.com/user-attachments/assets/8f30863a-cb60-4d45-b4d7-c8a5cc309500)

### Database: 
![image](https://github.com/user-attachments/assets/e401a5dd-93eb-4940-9fb1-7aafe6b7af89)

### Authentication: 
![image](https://github.com/user-attachments/assets/d96cc5f1-3af7-43aa-9f8f-dabe610cfe70)


  
## Project Setup

This project uses multiple tools and services. To set up the project locally, ensure you follow the steps mentioned below.

## Credentials

Recruiter: Dummy@gmail.com

Password: Sh@urya123

Candidate: Dummy1@gmail.com

Password: Sh@urya123


## Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
   
2. Navigate to the project directory:
   ```bash
   cd job-portal
   ```
   
3. Install dependencies:
   ```bash
   npm install
   ```
   
4. Add your environment variables to a `.env` file.
   ```bash
   VITE_SUPABASE_URL=<your_supabase_url>
   VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
   VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   ```

6. Run the project:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Database & Storage)
- **Authentication**: Clerk (Supports Google and custom email/password authentication)
- **Form Handling**: React Hook Form
- **Deployment**: Vercel

## Screens and Pages
- **Onboarding Page**: Select between candidate or recruiter.
- **Job Listing Page**: Browse all available jobs, filter, and search.
- **Job Details Page**: View details and apply for jobs, including assessments.
- **Candidate Dashboard**: View saved jobs, applied jobs, and job statuses.
- **Recruiter Dashboard**: Manage job postings, view applicants, and update hiring status.
- **Application Management**: Track application progress (e.g., applied, interviewing, hired, rejected).




## Contact 

If you have any doubt or want to contribute feel free to email me or hit me up on [Email](belwalshaurya820@gmail.com).

