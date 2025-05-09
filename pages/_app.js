import '../styles/globals.css'
import Link from 'next/link'
import React from 'react'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '../contexts/ThemeContext'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useTheme } from '../contexts/ThemeContext'
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material'

// Theme toggle button component
function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

// Navigation component
function Navigation() {
  const { darkMode } = useTheme();
  
  return (
    <AppBar position="static" color={darkMode ? "default" : "primary"}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Movie House
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/movies" style={{ color: 'inherit', textDecoration: 'none' }}>Movies</Link>
          <Link href="/genres" style={{ color: 'inherit', textDecoration: 'none' }}>Genres</Link>
          <Link href="/directors" style={{ color: 'inherit', textDecoration: 'none' }}>Directors</Link>
        </Box>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}

export default function MyApp({ Component, pageProps }) {
  // Use Context API for dark mode
  return (
    <ThemeProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

// Separate component to use the theme context
function AppContent({ Component, pageProps }) {
  const { darkMode } = useTheme();
  
  // Create Material-UI theme based on dark mode state
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <div className={darkMode ? "dark" : "light"}>
        <Navigation />
        <Container sx={{ mt: 4 }}>
          <Component {...pageProps} />
        </Container>
      </div>
    </MUIThemeProvider>
  );
} 