# Affiliate dashboard

Affiliate dashboard build with Supabase as a backend.

## Features

- [x] User can sign in with email and password
- [x] User can add API access informations for the ehub.cz
- [x] User can import campaigns and transactions from the ehub.cz
- [x] User can see table of campaigns
- [x] User can see chart of transactions in time
- [x] User can see list of expected transation confirmations

## Tech stack

This project was made using the followings Technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [Chart.js](https://www.chartjs.org/)
- [Formik](https://formik.org/)
- [Axios](https://github.com/axios/axios)
- [React Query](https://react-query.tanstack.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress](https://www.cypress.io/)

## Getting Started

- Install dependencies `yarn install`
- Create a new Supabase project
- Enter folder `frontend`
- Copy the env file `cp .env.example .env` and fill in the Supabase credentials
- Migrate database with `yarn prisma:push` and generate client with `yarn prisma:generate`
- Run development server `yarn dev`
- Create user in Supabase studio

## Testing

Testing setup include Jest and React testing library for unit and integration test and Cypress for e2e testing.

- Enter folder `frontend`
- Run `yarn test` for unit and integration test
- Run `yarn cypress` for e2e test
