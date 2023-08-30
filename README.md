# Ticket management system

This project is divided into the frontend (React) and very minimal backend (NEXTJS API - Yes it's overengineering
 but couldn't deploy a simple express app to vercel. Come to think of it I think we should have just used NEXTJS for the whole thing)

## TO RUN:
On Base folder run (using Vite)
```bash
npm run dev
```

on server folder run the same command

Goodluck dealing with CORS errors
## Tasks

### Kerama
- signin - [auth/signin]
- sigup - [auth/signup]
- HomePage - [/]
- New Tickets form - [] - submission
- Ticketing page - [/tickets] - retrival of data - useEffects - react-query

### Kibet
- Postgres sql (Supabase) - tables za tickets, authentication
- Email - Sendgrid - Resend labs
- api endpoints za saving tickets
- retrieving tickets
- user based
