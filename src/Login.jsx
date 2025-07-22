import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function Login() {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Welcome to Word Chain
                </Typography>
                <Typography variant="body2">
                    To begin, please enter your name below and click on play.
                </Typography>
                <br />
                <Grid container spacing={2}>
                    <Grid size={2}>
                        <TextField id="outlined-basic" label="enter your name" variant="outlined" size="small" />
                    </Grid>
                     <Grid size={2}>
                        <Button variant='contained' onClick={setUserName}>Play</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}