
import React from 'react';
import { Box, styled } from '@mui/system';
import Grid from '@mui/system/Grid';
import { Image } from 'antd';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { TextField } from '@mui/material';
import DeleteDialog from '../../pages/delete';

export default function QuizDetailView() {
    const [open, setOpen] = React.useState('');

    const handleClickOpen = (Typedialog) => {
        setOpen(Typedialog);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
        <Box sx={{ mt: 5, mb: 5 }}>

            <Grid container spacing={2}>
                <Grid size={{ md: 3 }}>
                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        height: 400,
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
                        <Image
                            width={'100%'}
                            height={200}
                            src="error"
                        />
                        <Typography sx={{ my: 2 }} variant='h5'>Quiz title name</Typography>
                        <Typography variant='body1'>Quiz description</Typography>
                        <Button sx={{ mt: 2, width: '100%', height: 50 }} variant="contained">Save</Button>
                        <Grid sx={{ mt: 2, justifyContent: 'center' }} container spacing={2} >
                            <Grid item xs={6}>
                                <Button sx={{ width: '100%', height: 20 }} variant="contained">Edit info</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={() => handleClickOpen('SetTimeLimit')} sx={{ width: '100%', height: 20 }} variant="contained">Time limit</Button>
                            </Grid>
                        </Grid>

                    </Box>

                </Grid>
                <Grid size={{ md: 8 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={(theme) => ({
                            boxShadow: 10,
                            bgcolor: '#fff',
                            color: 'grey.800',
                            height: 50,
                            width: 200,
                            p: 1,
                            m: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            ...theme.applyStyles('dark', {
                                bgcolor: '#101010',
                                color: 'grey.300',
                            }),
                        })}
                        >
                            <Typography variant='h5'>0 Question</Typography>
                        </Box>
                        <Button onClick={() => handleClickOpen('CreateQuestion')} sx={{
                            boxShadow: 10,
                            height: 50,
                            width: 200,
                            p: 1,
                            m: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            fontSize: '0.875rem',

                        }} variant="contained">Add Question</Button>

                        <Dialog
                            open={open === 'CreateQuestion'}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            fullWidth
                            maxWidth="md"
                        >
                            <DialogTitle id="alert-dialog-title">
                                <Box sx={{
                                    height: 150, display: 'flex', alignItems: 'center', '&:hover': {
                                        border: '3px solid blue',
                                    },
                                }}>
                                    <Textarea
                                        sx={{
                                            width: '100%',
                                            border: 'none', // Ẩn viền mặc định
                                            boxShadow: 'none', // Ẩn shadow nếu có
                                            outline: 'none', // Ẩn outline khi focus
                                            textAlign: 'center', // Căn giữa theo chiều ngang
                                            resize: 'none',
                                            '&:focus': {
                                                border: 'none', // Hiển thị viền màu xanh khi focus
                                                boxShadow: 'none', // Không có bóng khi focus
                                            },

                                        }}
                                        aria-label="minimum height"
                                        minRows={1}
                                        placeholder="Question text"
                                    />
                                </Box>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <Grid sx={{ mb: 2 }} container spacing={2}>
                                        <Grid sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#ffa31e',
                                            height: 130,
                                            borderRadius: 2,
                                            '&:hover': {
                                                border: '3px solid blue',
                                            },
                                        }}
                                            size={{ md: 6 }}>
                                            <Checkbox
                                                {...label}
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 32 }, // Điều chỉnh kích thước icon
                                                    color: 'white'
                                                }}
                                            />
                                            <Textarea
                                                sx={{
                                                    backgroundColor: '#ffa31e',
                                                    border: 'none', // Ẩn viền mặc định
                                                    boxShadow: 'none', // Ẩn shadow nếu có
                                                    outline: 'none', // Ẩn outline khi focus
                                                    textAlign: 'center', // Căn giữa theo chiều ngang
                                                    resize: 'none',
                                                    // lineHeight: '5px', // Căn giữa theo chiều dọc (điều chỉnh để phù hợp với chiều cao Textarea)

                                                    '&:focus': {
                                                        border: 'none', // Hiển thị viền màu xanh khi focus
                                                        boxShadow: 'none', // Không có bóng khi focus
                                                    },
                                                    '&::placeholder': {
                                                        textAlign: 'center', // Căn giữa placeholder theo chiều ngang
                                                        color: '#D3D3D3'
                                                    },
                                                }}
                                                aria-label="minimum height"
                                                minRows={1}
                                                placeholder="Answer 1"
                                            />
                                        </Grid>

                                        <Grid sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#3378ff',
                                            height: 130,
                                            borderRadius: 2,
                                            '&:hover': {
                                                border: '3px solid blue',
                                            },
                                        }}
                                            size={{ md: 6 }}>
                                            <Checkbox
                                                {...label}
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 32 }, // Điều chỉnh kích thước icon
                                                    color: 'white'
                                                }}
                                            />
                                            <Textarea
                                                sx={{
                                                    backgroundColor: '#3378ff',
                                                    border: 'none', // Ẩn viền mặc định
                                                    boxShadow: 'none', // Ẩn shadow nếu có
                                                    outline: 'none', // Ẩn outline khi focus
                                                    textAlign: 'center', // Căn giữa theo chiều ngang
                                                    resize: 'none',
                                                    // lineHeight: '5px', // Căn giữa theo chiều dọc (điều chỉnh để phù hợp với chiều cao Textarea)

                                                    '&:focus': {
                                                        border: 'none', // Hiển thị viền màu xanh khi focus
                                                        boxShadow: 'none', // Không có bóng khi focus
                                                    },
                                                    '&::placeholder': {
                                                        textAlign: 'center', // Căn giữa placeholder theo chiều ngang
                                                        color: '#D3D3D3'
                                                    },
                                                }}
                                                aria-label="minimum height"
                                                minRows={1}
                                                placeholder="Answer 2"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#ff462b',
                                            height: 130,
                                            borderRadius: 2,
                                            '&:hover': {
                                                border: '3px solid blue',
                                            },
                                        }}
                                            size={{ md: 6 }}>
                                            <Checkbox
                                                {...label}
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 32 }, // Điều chỉnh kích thước icon
                                                    color: 'white'
                                                }}
                                            />
                                            <Textarea
                                                sx={{
                                                    backgroundColor: '#ff462b',
                                                    border: 'none', // Ẩn viền mặc định
                                                    boxShadow: 'none', // Ẩn shadow nếu có
                                                    outline: 'none', // Ẩn outline khi focus
                                                    textAlign: 'center', // Căn giữa theo chiều ngang
                                                    resize: 'none',
                                                    // lineHeight: '5px', // Căn giữa theo chiều dọc (điều chỉnh để phù hợp với chiều cao Textarea)

                                                    '&:focus': {
                                                        border: 'none', // Hiển thị viền màu xanh khi focus
                                                        boxShadow: 'none', // Không có bóng khi focus
                                                    },
                                                    '&::placeholder': {
                                                        textAlign: 'center', // Căn giữa placeholder theo chiều ngang
                                                        color: '#D3D3D3'
                                                    },
                                                }}
                                                aria-label="minimum height"
                                                minRows={1}
                                                placeholder="Answer 3"
                                            />
                                        </Grid>
                                        <Grid sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#00cf77',
                                            height: 130,
                                            borderRadius: 2,
                                            '&:hover': {
                                                border: '3px solid blue',
                                            },
                                        }}
                                            size={{ md: 6 }}>
                                            <Checkbox
                                                {...label}
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 32 }, // Điều chỉnh kích thước icon
                                                    color: 'white'
                                                }}
                                            />
                                            <Textarea
                                                sx={{
                                                    backgroundColor: '#00cf77',
                                                    border: 'none', // Ẩn viền mặc định
                                                    boxShadow: 'none', // Ẩn shadow nếu có
                                                    outline: 'none', // Ẩn outline khi focus
                                                    textAlign: 'center', // Căn giữa theo chiều ngang
                                                    resize: 'none',
                                                    // lineHeight: '5px', // Căn giữa theo chiều dọc (điều chỉnh để phù hợp với chiều cao Textarea)

                                                    '&:focus': {
                                                        border: 'none', // Hiển thị viền màu xanh khi focus
                                                        boxShadow: 'none', // Không có bóng khi focus
                                                    },
                                                    '&::placeholder': {
                                                        textAlign: 'center', // Căn giữa placeholder theo chiều ngang
                                                        color: '#D3D3D3'
                                                    },
                                                }}
                                                aria-label="minimum height"
                                                minRows={1}
                                                placeholder="Answer 4"
                                            />
                                        </Grid>
                                    </Grid>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose} autoFocus>
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        height: 100,
                        width: '100%',
                        p: 1,
                        m: 1,
                        display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        ...theme.applyStyles('dark', {
                            bgcolor: '#101010',
                            color: 'grey.300',
                        }),
                    })}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <Button sx={{ mb: 1, width: 70, height: 40 }} variant="contained"><EditIcon />Edit</Button>
                            <Button sx={{ width: 70, height: 40 }} variant="contained" onClick={() => handleClickOpen('Delete')}><DeleteIcon /> Delete</Button>
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='h5'>Question 1</Typography>
                            <Typography variant='body1'>Question Content</Typography>
                        </Box>

                    </Box>
                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        height: 100,
                        width: '100%',
                        p: 1,
                        m: 1,
                        display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        ...theme.applyStyles('dark', {
                            bgcolor: '#101010',
                            color: 'grey.300',
                        }),
                    })}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <Button sx={{ mb: 1, width: 70, height: 40 }} variant="contained"><EditIcon />Edit</Button>
                            <Button sx={{ width: 70, height: 40 }} variant="contained"><DeleteIcon /> Delete</Button>
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='h5'>Question 1</Typography>
                            <Typography variant='body1'>Question Content</Typography>
                        </Box>

                    </Box>
                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        height: 100,
                        width: '100%',
                        p: 1,
                        m: 1,
                        display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        ...theme.applyStyles('dark', {
                            bgcolor: '#101010',
                            color: 'grey.300',
                        }),
                    })}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <Button sx={{ mb: 1, width: 70, height: 40 }} variant="contained"><EditIcon />Edit</Button>
                            <Button sx={{ width: 70, height: 40 }} variant="contained"><DeleteIcon /> Delete</Button>
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant='h5'>Question 1</Typography>
                            <Typography variant='body1'>Question Content</Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Dialog
                    open={open === 'SetTimeLimit'}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    width="50%"
                >
                    <DialogTitle id="alert-dialog-title" sx={{ wordWrap: 'break-word' }}>
                        <Typography variant='h5'>Set the time limit for all  <br /> questions (in seconds):</Typography >
                    </DialogTitle>
                    <DialogContent >
                        <DialogContentText id="alert-dialog-description">
                            <Grid container spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
                                <Grid sx={{ mr: 1 }} size={{ md: 1 }}>
                                    <AccessAlarmIcon />
                                </Grid>
                                <Grid size={{ md: 10 }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Time limit"
                                        variant="outlined"
                                        fullWidth

                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <DeleteDialog open={open} onClose={handleClose} />
            </Box>
        </Box >
    );
}