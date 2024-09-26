import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Grid from '@mui/system/Grid';

export default function EventQuizView() {

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );

    return (
        <Box >
            <Typography variant='h3'> Set Event Quiz</Typography>
            <Grid container spacing={2}>
                <Grid size={{ md: 4 }}>

                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        p: 1,
                        m: 1,
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        ...theme.applyStyles('dark', {
                            bgcolor: '#101010',
                            color: 'grey.300',
                        }),
                    })}
                    >
                        <Typography variant='h5' sx={{ mb: 1 }}>Title</Typography>
                        <TextField sx={{ mb: 2 }} id="outlined-basic" label="Add a description title" variant="outlined" />
                        <Typography variant='h5' sx={{ mb: 1 }}>Description</Typography>
                        <Textarea aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" />
                    </Box>
                </Grid>
                <Grid size={{ md: 8 }}>

                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        p: 1,
                        m: 1,
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        ...theme.applyStyles('dark', {
                            bgcolor: '#101010',
                            color: 'grey.300',
                        }),
                    })}
                    >
                        <Typography variant='h5' sx={{ mb: 1 }}>Title</Typography>
                        <TextField sx={{ mb: 2 }} id="outlined-basic" label="Add a description title" variant="outlined" />
                        <Typography variant='h5' sx={{ mb: 1 }}>Description</Typography>
                        <Textarea aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" />
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
}