import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
export default function NavBar() {
  function goToMyLinkedIn() {
    window.open('https://www.linkedin.com/in/ankur2491/', '_blank', 'noopener,noreferrer');
  }
  function goToMyGitHub() {
    window.open('https://github.com/ankur2491', '_blank', 'noopener,noreferrer');
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Word-Chain
          </Typography>
          <Tooltip title="Connect with me">
            <LinkedInIcon sx={{ cursor: 'pointer' }}
              onClick={goToMyLinkedIn}
            >
            </LinkedInIcon>
          </Tooltip>
                    {/* <Tooltip title="My GitHub">
            <GitHubIcon sx={{ cursor: 'pointer' }}
              onClick={goToMyGitHub}
            >
            </GitHubIcon>
          </Tooltip> */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}