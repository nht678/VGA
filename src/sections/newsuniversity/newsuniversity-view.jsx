import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Box from '@mui/material/Box';


export default function NewsUniversityView() {
    return (
        <Box>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image="https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA"
                            sx={{ height: 210, objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Enthusiasm for Chinese dramas grants student full scholarship to elite China university
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China&#39;s top-ranked institution.
                            </Typography>

                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', backgroundColor: 'rgba(232,223,249,1)' }}>
                            <Button size="small">Edit</Button>
                            <Button size="small">Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image="https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA"
                            sx={{ height: 210, objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Enthusiasm for Chinese dramas grants student full scholarship to elite China university
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China&#39;s top-ranked institution.
                            </Typography>

                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', backgroundColor: 'rgba(232,223,249,1)' }}>
                            <Button size="small">Edit</Button>
                            <Button size="small">Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image="https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA"
                            sx={{ height: 210, objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Enthusiasm for Chinese dramas grants student full scholarship to elite China university
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China&#39;s top-ranked institution.
                            </Typography>

                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', backgroundColor: 'rgba(232,223,249,1)' }}>
                            <Button size="small">Edit</Button>
                            <Button size="small">Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image="https://i1-english.vnecdn.net/2024/09/24/bac-kinh2-5864-1726731925-3884-1727171062.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=kuoO7VFNNqx4FYxIS8wUUA"
                            sx={{ height: 210, objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Enthusiasm for Chinese dramas grants student full scholarship to elite China university
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                A Vietnamese student transformed her passion for Chinese historical dramas and literature into a full scholarship at Peking University, China&#39;s top-ranked institution.
                            </Typography>

                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', backgroundColor: 'rgba(232,223,249,1)' }}>
                            <Button size="small">Edit</Button>
                            <Button size="small">Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
