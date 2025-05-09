import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Box, 
  Rating,
  Skeleton
} from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies');
        const data = await response.json();
        
        // Sort movies by rating and get top 3
        const sortedMovies = [...data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
          
        setTrendingMovies(sortedMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    }
    
    fetchMovies();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Trending Movies
        </Typography>
        <Button 
          component={Link}
          href="/genres"
          variant="contained"
          color="primary"
        >
          Browse Genres
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {loading ? (
          // Loading skeleton
          Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Skeleton variant="text" height={40} width="80%" />
                  <Skeleton variant="text" height={20} width="40%" />
                  <Skeleton variant="rectangular" height={100} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="text" width="30%" />
                    <Skeleton variant="text" width="20%" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          // Actual movie cards
          trendingMovies.map((movie) => (
            <Grid item xs={12} md={4} key={movie.id}>
              <Card sx={{ 
                height: '100%', 
                bgcolor: darkMode ? 'background.paper' : 'white',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {movie.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Released: {movie.releaseYear}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating 
                        value={movie.rating / 2} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {movie.rating}/10
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}