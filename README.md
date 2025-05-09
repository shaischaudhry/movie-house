# Movie House - Next.js Application

A modern web application for browsing movies, genres, and directors built with Next.js and Material-UI. This application includes backend APIs, database integration, and dark mode support.

## Features

- Browse trending movies on the home page
- View all movies with genre filtering
- Explore movies by genre
- View detailed information about movies and directors
- Dark mode support with localStorage persistence
- REST API for data access
- MongoDB database integration

## Project Structure

- `/pages` - Next.js pages including API routes
- `/components` - React components
- `/models` - MongoDB models
- `/lib` - Database connection and utility functions
- `/contexts` - React Context providers including theme
- `/styles` - Global CSS styles
- `/data` - Initial JSON data

## API Routes

- **Movies**
  - GET `/api/movies` - Get all movies
  - GET `/api/movies/[id]` - Get movie details

- **Genres**
  - GET `/api/genres` - Get all genres
  - GET `/api/genres/[id]/movies` - Get movies by genre

- **Directors**
  - GET `/api/directors` - Get all directors
  - GET `/api/directors/[id]` - Get director details and their movies

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up MongoDB (local or MongoDB Atlas)
4. Create a `.env.local` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/moviehouse
   ```
5. Seed the database:
   ```
   npm run seed
   ```
6. Run the development server:
   ```
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 15
- React 19
- Material-UI 5
- MongoDB with Mongoose
- React Context API for state management
- Tailwind CSS for additional styling

## Assignment Submission

This project was created for the Advanced Programming assignment. It demonstrates the use of modern web technologies and responsive design principles.
