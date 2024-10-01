import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid2';
import Grid from '@mui/system/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from 'src/components/iconify';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { UploadOutlined } from '@ant-design/icons';
import { Button as AntButton, message, Upload, Calendar } from 'antd';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

import { Dialog as DialogTw, DialogBackdrop, DialogPanel, DialogTitle as DialogTitleTw } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

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
const fakedata = [
    {
        id: 1,
        title: "Enthusiasm for Chinese dramas grants student full scholarship to elite China university",
        content: "A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China's top-ranked institution.",
        image: "https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA",
    },
    {
        id: 2,
        title: "Enthusiasm for Chinese dramas grants student full scholarship to elite China university",
        content: "A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China's top-ranked institution.",
        image: "https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA",
    },
    {
        id: 3,
        title: "Enthusiasm for Chinese dramas grants student full scholarship to elite China university",
        content: "A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China's top-ranked institution.",
        image: "https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA",
    },
    {
        id: 4,
        title: "Enthusiasm for Chinese dramas grants student full scholarship to elite China university",
        content: "A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China's top-ranked institution.",
        image: "https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA",
    },
    {
        id: 4,
        title: "Enthusiasm for Chinese dramas grants student full scholarship to elite China university",
        content: "A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China's top-ranked institution.",
        image: "https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA",
    },


];


export default function NewsUniversityView() {
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (dialogType) => {
        setOpen(dialogType);
    };

    const handleClose = () => {
        setOpen(null);
    };
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
                <Typography variant="h4" sx={{ mt: 5, mb: 5 }}>News University</Typography>
                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen('Create')}>
                    New News
                </Button>
            </Stack>
            <Grid container spacing={2} sx={{ mx: 4 }}>
                {fakedata.map((news) => (
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
                                <Button size="small">Edit</Button>
                                <Button size="small" onClick={() => handleClickOpen('Delete')}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Box>
                    <Dialog
                        open={open === 'Create'}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    // fullWidth
                    // maxWidth="md"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Create News
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container spacing={2} >
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" component="div">
                                            Title
                                        </Typography>
                                        <Textarea aria-label="minimum height" minRows={3} placeholder="Write title here" />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 12 }}>
                                        <Typography variant="h6" component="div">
                                            Content
                                        </Typography>
                                        <Textarea aria-label="minimum height" minRows={3} placeholder="Write content here" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                        <Typography variant="h6" component="div">
                                            Image
                                        </Typography>
                                        <Upload {...props}>
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
                                                <Input {...getInputProps()} />
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
                                        <Calendar fullscreen={false} />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="h6" component="div">
                                                Author
                                            </Typography>
                                            <Layout >
                                          
                                                <AutocompleteWrapper>
                                                    <AutocompleteRoot
                                                        {...getRootProps()}
                                                        className={focused ? 'Mui-focused' : ''}
                                                    >
                                                        <Input {...getInputProps()} />
                                                    </AutocompleteRoot>
                                                    {groupedOptions.length > 0 && (
                                                        <Listbox {...getListboxProps()}>
                                                            {groupedOptions.map((option, index) => (
                                                                <Option {...getOptionProps({ option, index })}>{option}</Option>
                                                            ))}
                                                        </Listbox>
                                                    )}
                                                </AutocompleteWrapper>
                                            </Layout>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Typography variant="h6" component="div">
                                                Source
                                            </Typography>
                                            <TextField id="outlined-basic" label="Source" variant="outlined" />
                                        </Grid> */}
                                </Grid>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClose} autoFocus>
                                Create News
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <DialogTw open={open === 'Delete'} onClose={setOpen} className="relative z-10">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                        />

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <DialogPanel
                                    transition
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                                >
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                            </div>
                                            <div className="sm:ml-4 sm:mt-0 sm:text-left">
                                                <DialogTitleTw as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Delete
                                                </DialogTitleTw>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want  your news? All of your data this new will be permanently removed.
                                                        This action cannot be undone.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className=" mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            data-autofocus
                                            onClick={() => setOpen(false)}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </DialogTw>
                </Box>

            </Grid>
        </Box>

    );
}
