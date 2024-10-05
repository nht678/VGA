import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Grid from '@mui/system/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz, resetQuizStatus } from 'src/store/eventquiz/action';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

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
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    // set formdata
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        coverImage: '',
    });
    // useEffect use redux
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Dùng để điều hướng
    const { success, error } = useSelector((state) => state.quizReducer); // Lấy trạng thái từ store
    console.log(success, error);
    // handleCreateQuiz
    const handleCreateQuiz = () => {
        dispatch(createQuiz(formData));
    };
    // useEffect
    useEffect(() => {
        if (success) {
            // Hiển thị thông báo thành công và chuyển hướng
            alert('Quiz created successfully!'); // Tạm thời dùng alert, có thể thay bằng Snackbar
            navigate('/eventquiz'); // Điều hướng người dùng
            // Sau khi điều hướng, reset trạng thái thành công
            dispatch(resetQuizStatus());
        }

        if (error) {
            alert(`Error: ${error}`); // Hiển thị lỗi nếu có
        }
    }, [success, error, navigate]); // Thêm navigate vào dependency
    // return




    return (
        <Box >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography sx={{ mt: 5, mb: 5 }} variant='h4'> Set Event Quiz</Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid size={{ md: 4 }}>

                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        height: 300,
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
                        <Box sx={{
                            border: '2px dashed black',
                            m: 2,
                            height: '90%', // Chiếm toàn bộ chiều cao của Box
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', // Căn giữa theo chiều dọc
                            alignItems: 'center', // Căn giữa theo chiều ngang
                        }}>
                            <Typography variant='h5' sx={{ mb: 1 }}>Cover Image</Typography>
                            <Typography variant='body2' sx={{ mb: 1 }}>Upload a cover image for the event quiz</Typography>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    // onChange={(event) => console.log(event.target.files)}
                                    onChange={(event) => setFormData({ ...formData, coverImage: event.target.files })}
                                    multiple
                                />
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ md: 8 }}>

                    <Box sx={(theme) => ({
                        boxShadow: 10,
                        bgcolor: '#fff',
                        color: 'grey.800',
                        height: 300,
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
                        {/* <TextField sx={{ mb: 2, width: '100%' }} id="outlined-basic" label="Add a description title" variant="outlined"  /> */}
                        <TextField
                            sx={{ mb: 2, width: '100%' }}
                            id="outlined-basic"
                            label="Add a description title"
                            variant="outlined"
                            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                        />
                        <Typography variant='h5' sx={{ mb: 1 }}>Description</Typography>
                        {/* <Textarea sx={{ width: '100%' }} aria-label="minimum height" minRows={4} placeholder="Description" /> */}
                        <textarea
                            aria-label="minimum height"
                            placeholder="Description"
                            style={{ width: '100%', height: '100px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 'bold' }}
                            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid sx={{ justifyContent: 'flex-end', mr: 2, mt: 5 }} container spacing={2}>
                {/* <Button sx={{ height: 50, width: 90 }} variant="contained">Create</Button> */}
                <Button
                    sx={{ height: 50, width: 90 }}
                    variant="contained"
                    onClick={() => handleCreateQuiz()}  // Gọi hàm handleCreateQuiz
                >
                    Create
                </Button>
            </Grid>

        </Box>
    );
}