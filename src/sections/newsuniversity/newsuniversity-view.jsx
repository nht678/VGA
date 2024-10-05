import * as React from 'react';
import { Button as AntButton, message, Upload, Calendar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Stack,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box
} from '@mui/material';
import Grid from '@mui/system/Grid';
import { styled } from '@mui/system';
import Iconify from 'src/components/iconify';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { useAutocomplete } from '@mui/base/useAutocomplete';


import DeleteDialog from '../../pages/delete';
import { updateNews, deleteNews, createNews, getNews } from '../../store/news/action';

const options = ['Economy', 'Politics', 'Entertainment', 'Sports', 'Science', 'Education', 'Health'];


const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



export default function NewsUniversityView() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(null);
    const [currentNews, setCurrentNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null); // Tin tức hiện tại
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        category: '',
        date: '',
    });

    console.log('formData', formData);
    const [title, setTitle] = useState('');
    const handleClickOpen = (dialogType, news) => {
        setSelectedNews(news); // Lưu lại tin tức hiện tại
        setOpen(dialogType);
    };

    const handleClose = () => {
        setOpen(null);
    };
    const handleDelete = () => {
        if (selectedNews) {
            console.log('selectedNews', selectedNews);
            dispatch(deleteNews(selectedNews.id));
            handleClose(); // Đóng dialog
        }
    };

    const handleUpdate = () => {
        if (selectedNews) {
            dispatch(updateNews(selectedNews.id, formData));
            setFormData({
                title: '',
                content: '',
                image: '',
                category: '',
                date: '',
            });
            handleClose(); // Đóng dialog
        }
    };
    const handleCreate = () => {
        console.log('formData', formData);
        dispatch(createNews(formData));
        setFormData({
            title: '',
            content: '',
            image: '',
            category: '',
            date: '',
        });
        handleClose(); // Đóng dialog
    };
    const handlLogic = () => {
        if (open === 'Create') {
            handleCreate();
        } else if (open === 'Edit') {
            handleUpdate();
        } else if (open === 'Delete') {
            handleDelete();
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://65dc58f6e7edadead7ebb035.mockapi.io/news');
    //             console.log('data', response.data); // Sử dụng response.data
    //             setCurrentNews(response.data); // Cập nhật state
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData(); // Gọi hàm fetchData
    // }, []);
    // Thay đổi useEffect để gọi hàm lấy danh sách news từ store Redux , set currentNews từ store
    // const getnews = useSelector((state) => state.newsReducer);

    // Lấy dữ liệu news từ Redux store
    const News = useSelector((state) => state.newsReducer);
    console.log('news', News);

    // Khi component render, gọi action getNews để lấy dữ liệu
    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    // use useselector để lấy danh sách news từ store Redux


    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        focused,
    } = useAutocomplete({
        id: 'controlled-state-demo',
        options,
        value,
        onChange: (event, newValue) => setValue(newValue),
        inputValue,
        onInputChange: (event, newInputValue) => setInputValue(newInputValue),
    });
    const blue = {
        100: '#DAECFF',
        200: '#99CCF3',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0059B2',
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

    const AutocompleteWrapper = styled('div')`
        position: relative;
      `;

    const AutocompleteRoot = styled('div')(
        ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
            };
        display: flex;
        gap: 5px;
        padding-right: 5px;
        overflow: hidden;
        width: 250px;
      
        &.Mui-focused {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
        }
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus-visible {
          outline: 0;
        }
      `,
    );

    const Input = styled('input')(
        ({ theme }) => `
        font-size: 0.875rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: inherit;
        border: none;
        border-radius: inherit;
        padding: 8px 12px;
        outline: 0;
        flex: 1 0 auto;
      `,
    );

    const Listbox = styled('ul')(
        ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        max-width: 320px;
        border-radius: 12px;
        overflow: auto;
        outline: 0;
        max-height: 300px;
        z-index: 3;
        position: absolute;
        left: 0;
        right: 0;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
            };
        `,
    );

    const Option = styled('li')(
        ({ theme }) => `
        list-style: none;
        padding: 8px;
        border-radius: 8px;
        cursor: default;
      
        &:last-of-type {
          border-bottom: none;
        }
      
        &:hover {
          cursor: pointer;
        }
      
        &[aria-selected=true] {
          background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
          color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
        }
      
        &.Mui-focused,
        &.Mui-focusVisible {
          background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
          color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        }
      
        &.Mui-focusVisible {
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      
        &[aria-selected=true].Mui-focused,
        &[aria-selected=true].Mui-focusVisible {
          background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
          color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
        }
        `,
    );

    const Layout = styled('div')`
        display: flex;
        flex-flow: column nowrap;
        gap: 4px;
      `;

    const Pre = styled('pre')(({ theme }) => ({
        margin: '0.5rem 0',
        fontSize: '0.75rem',
        '& code': {
            backgroundColor: theme.palette.mode === 'light' ? grey[100] : grey[900],
            border: '1px solid',
            borderColor: theme.palette.mode === 'light' ? grey[300] : grey[700],
            color: theme.palette.mode === 'light' ? '#000' : '#fff',
            padding: '0.125rem 0.25rem',
            borderRadius: 3,
        },
    }));
    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 100%;
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
        <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" sx={{ mb: 5 }}>News University</Typography>
                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
                    New News
                </Button>
            </Stack>
            <Grid container spacing={2} sx={{ mx: 4 }}>
                {News.map((news) => (
                    <Grid size={{ md: 3 }} key={news.id}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardMedia
                                component="img"
                                alt={news.title}
                                image={news.image}
                                sx={{ height: 210, objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {news.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {news.content}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', backgroundColor: 'rgba(232,223,249,1)' }}>
                                <Button size="small" onClick={() => handleClickOpen('Edit', news)}>Edit</Button>
                                <Button size="small" onClick={() => handleClickOpen('Delete', news)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Box>
                    <Dialog
                        open={open === 'Create' || open === 'Edit'}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {open === 'Create' ? 'Create News' : 'Edit News'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" component="div">
                                            Title
                                        </Typography>
                                        <textarea
                                            aria-label="minimum height"
                                            placeholder="Write title here"
                                            style={{ width: '100%', height: '100px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 'bold' }}
                                            defaultValue={open === 'Edit' ? selectedNews.title : ''}
                                            // Sử dụng value thay vì defaultValue
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" component="div">
                                            Content
                                        </Typography>
                                        <textarea
                                            aria-label="minimum height"
                                            placeholder="Write content here"
                                            style={{ width: '100%', height: '100px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 'bold' }}
                                            defaultValue={open === 'Edit' ? selectedNews.content : ''} // Sử dụng giá trị của news hiện tại nếu đang chỉnh sửa
                                            onChange={(e) => setFormData({ ...formData, content: e.target.defaultValue })}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                        <Typography variant="h6" component="div">
                                            Image
                                        </Typography>
                                        <Upload {...props} onChange={(info) => setFormData({ ...formData, image: info.file.response.url })}>
                                            <AntButton icon={<UploadOutlined />}>Click to Upload</AntButton>
                                        </Upload>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                        <Typography variant="h6" component="div">
                                            Category
                                        </Typography>
                                        <AutocompleteWrapper>
                                            <AutocompleteRoot
                                                {...getRootProps()}
                                                className={focused ? 'Mui-focused' : ''}
                                            >
                                                <Input {...getInputProps()} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                                            </AutocompleteRoot>
                                            {groupedOptions.length > 0 && (
                                                <Listbox {...getListboxProps()}>
                                                    {groupedOptions.map((option, index) => (
                                                        <Option {...getOptionProps({ option, index })}>{option}</Option>
                                                    ))}
                                                </Listbox>
                                            )}
                                        </AutocompleteWrapper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Typography variant="h6" component="div">
                                            Date
                                        </Typography>
                                        <Calendar fullscreen={false} onChange={(date, dateString) => setFormData({ ...formData, date: dateString })} />
                                    </Grid>
                                    {/* Các trường khác nếu cần thiết */}
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handlLogic} autoFocus>
                                {open === 'Create' ? 'Create News' : 'Update News'}
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <DeleteDialog handleDelete={handleDelete} open={open} onClose={handleClose} />
                </Box>

            </Grid>
        </Box>

    );
}
