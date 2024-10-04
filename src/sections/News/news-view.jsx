
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));
const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
            name: 'Michael Foster',
            role: 'Co-Founder / CTO',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    // More posts...
]

export default function NewsView() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        // <Box sx={{mt:10}}>
        //     <Grid sx={{justifyContent:'center'}} container spacing={2}>
        //         <Grid item xs={12} sm={6} md={4}>
        //             <Card sx={{ maxWidth: 345 }}>
        //                 <CardHeader
        //                     avatar={
        //                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //                             R
        //                         </Avatar>
        //                     }
        //                     action={
        //                         <IconButton aria-label="settings">
        //                             <MoreVertIcon />
        //                         </IconButton>
        //                     }
        //                     title="Shrimp and Chorizo Paella"
        //                     subheader="September 14, 2016"
        //                 />
        //                 <CardMedia
        //                     component="img"
        //                     height="194"
        //                     image="/assets/images/avatars/image_1.png"
        //                     alt="Paella dish"
        //                 />
        //                 <CardContent>
        //                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        //                         This impressive paella is a perfect party dish and a fun meal to cook
        //                         together with your guests. Add 1 cup of frozen peas along with the mussels,
        //                         if you like.
        //                     </Typography>
        //                 </CardContent>
        //                 <CardActions disableSpacing>
        //                     <IconButton aria-label="add to favorites">
        //                         <FavoriteIcon />
        //                     </IconButton>
        //                     <IconButton aria-label="share">
        //                         <ShareIcon />
        //                     </IconButton>
        //                     <ExpandMore
        //                         expand={expanded}
        //                         onClick={handleExpandClick}
        //                         aria-expanded={expanded}
        //                         aria-label="show more"
        //                     >
        //                         <ExpandMoreIcon />
        //                     </ExpandMore>
        //                 </CardActions>
        //                 <Collapse in={expanded} timeout="auto" unmountOnExit>
        //                     <CardContent>
        //                         <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
        //                             aside for 10 minutes.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        //                             medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        //                             occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        //                             large plate and set aside, leaving chicken and chorizo in the pan. Add
        //                             pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
        //                             stirring often until thickened and fragrant, about 10 minutes. Add
        //                             saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Add rice and stir very gently to distribute. Top with artichokes and
        //                             peppers, and cook without stirring, until most of the liquid is absorbed,
        //                             15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
        //                             mussels, tucking them down into the rice, and cook again without
        //                             stirring, until mussels have opened and rice is just tender, 5 to 7
        //                             minutes more. (Discard any mussels that don&apos;t open.)
        //                         </Typography>
        //                         <Typography>
        //                             Set aside off of the heat to let rest for 10 minutes, and then serve.
        //                         </Typography>
        //                     </CardContent>
        //                 </Collapse>
        //             </Card>
        //         </Grid>
        //         <Grid item xs={12} sm={6} md={4}>
        //             <Card sx={{ maxWidth: 345 }}>
        //                 <CardHeader
        //                     avatar={
        //                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //                             R
        //                         </Avatar>
        //                     }
        //                     action={
        //                         <IconButton aria-label="settings">
        //                             <MoreVertIcon />
        //                         </IconButton>
        //                     }
        //                     title="Shrimp and Chorizo Paella"
        //                     subheader="September 14, 2016"
        //                 />
        //                 <CardMedia
        //                     component="img"
        //                     height="194"
        //                     image="/assets/images/avatars/image_1.png"
        //                     alt="Paella dish"
        //                 />
        //                 <CardContent>
        //                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        //                         This impressive paella is a perfect party dish and a fun meal to cook
        //                         together with your guests. Add 1 cup of frozen peas along with the mussels,
        //                         if you like.
        //                     </Typography>
        //                 </CardContent>
        //                 <CardActions disableSpacing>
        //                     <IconButton aria-label="add to favorites">
        //                         <FavoriteIcon />
        //                     </IconButton>
        //                     <IconButton aria-label="share">
        //                         <ShareIcon />
        //                     </IconButton>
        //                     <ExpandMore
        //                         expand={expanded}
        //                         onClick={handleExpandClick}
        //                         aria-expanded={expanded}
        //                         aria-label="show more"
        //                     >
        //                         <ExpandMoreIcon />
        //                     </ExpandMore>
        //                 </CardActions>
        //                 <Collapse in={expanded} timeout="auto" unmountOnExit>
        //                     <CardContent>
        //                         <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
        //                             aside for 10 minutes.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        //                             medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        //                             occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        //                             large plate and set aside, leaving chicken and chorizo in the pan. Add
        //                             pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
        //                             stirring often until thickened and fragrant, about 10 minutes. Add
        //                             saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Add rice and stir very gently to distribute. Top with artichokes and
        //                             peppers, and cook without stirring, until most of the liquid is absorbed,
        //                             15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
        //                             mussels, tucking them down into the rice, and cook again without
        //                             stirring, until mussels have opened and rice is just tender, 5 to 7
        //                             minutes more. (Discard any mussels that don&apos;t open.)
        //                         </Typography>
        //                         <Typography>
        //                             Set aside off of the heat to let rest for 10 minutes, and then serve.
        //                         </Typography>
        //                     </CardContent>
        //                 </Collapse>
        //             </Card>
        //         </Grid>
        //         <Grid item xs={12} sm={6} md={4}>
        //             <Card sx={{ maxWidth: 345 }}>
        //                 <CardHeader
        //                     avatar={
        //                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //                             R
        //                         </Avatar>
        //                     }
        //                     action={
        //                         <IconButton aria-label="settings">
        //                             <MoreVertIcon />
        //                         </IconButton>
        //                     }
        //                     title="Shrimp and Chorizo Paella"
        //                     subheader="September 14, 2016"
        //                 />
        //                 <CardMedia
        //                     component="img"
        //                     height="194"
        //                     image="/assets/images/avatars/image_1.png"
        //                     alt="Paella dish"
        //                 />
        //                 <CardContent>
        //                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        //                         This impressive paella is a perfect party dish and a fun meal to cook
        //                         together with your guests. Add 1 cup of frozen peas along with the mussels,
        //                         if you like.
        //                     </Typography>
        //                 </CardContent>
        //                 <CardActions disableSpacing>
        //                     <IconButton aria-label="add to favorites">
        //                         <FavoriteIcon />
        //                     </IconButton>
        //                     <IconButton aria-label="share">
        //                         <ShareIcon />
        //                     </IconButton>
        //                     <ExpandMore
        //                         expand={expanded}
        //                         onClick={handleExpandClick}
        //                         aria-expanded={expanded}
        //                         aria-label="show more"
        //                     >
        //                         <ExpandMoreIcon />
        //                     </ExpandMore>
        //                 </CardActions>
        //                 <Collapse in={expanded} timeout="auto" unmountOnExit>
        //                     <CardContent>
        //                         <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
        //                             aside for 10 minutes.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        //                             medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        //                             occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        //                             large plate and set aside, leaving chicken and chorizo in the pan. Add
        //                             pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
        //                             stirring often until thickened and fragrant, about 10 minutes. Add
        //                             saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Add rice and stir very gently to distribute. Top with artichokes and
        //                             peppers, and cook without stirring, until most of the liquid is absorbed,
        //                             15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
        //                             mussels, tucking them down into the rice, and cook again without
        //                             stirring, until mussels have opened and rice is just tender, 5 to 7
        //                             minutes more. (Discard any mussels that don&apos;t open.)
        //                         </Typography>
        //                         <Typography>
        //                             Set aside off of the heat to let rest for 10 minutes, and then serve.
        //                         </Typography>
        //                     </CardContent>
        //                 </Collapse>
        //             </Card>
        //         </Grid>
        //         <Grid item xs={12} sm={6} md={4}>
        //             <Card sx={{ maxWidth: 345 }}>
        //                 <CardHeader
        //                     avatar={
        //                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //                             R
        //                         </Avatar>
        //                     }
        //                     action={
        //                         <IconButton aria-label="settings">
        //                             <MoreVertIcon />
        //                         </IconButton>
        //                     }
        //                     title="Shrimp and Chorizo Paella"
        //                     subheader="September 14, 2016"
        //                 />
        //                 <CardMedia
        //                     component="img"
        //                     height="194"
        //                     image="/assets/images/avatars/image_1.png"
        //                     alt="Paella dish"
        //                 />
        //                 <CardContent>
        //                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        //                         This impressive paella is a perfect party dish and a fun meal to cook
        //                         together with your guests. Add 1 cup of frozen peas along with the mussels,
        //                         if you like.
        //                     </Typography>
        //                 </CardContent>
        //                 <CardActions disableSpacing>
        //                     <IconButton aria-label="add to favorites">
        //                         <FavoriteIcon />
        //                     </IconButton>
        //                     <IconButton aria-label="share">
        //                         <ShareIcon />
        //                     </IconButton>
        //                     <ExpandMore
        //                         expand={expanded}
        //                         onClick={handleExpandClick}
        //                         aria-expanded={expanded}
        //                         aria-label="show more"
        //                     >
        //                         <ExpandMoreIcon />
        //                     </ExpandMore>
        //                 </CardActions>
        //                 <Collapse in={expanded} timeout="auto" unmountOnExit>
        //                     <CardContent>
        //                         <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
        //                             aside for 10 minutes.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        //                             medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        //                             occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        //                             large plate and set aside, leaving chicken and chorizo in the pan. Add
        //                             pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
        //                             stirring often until thickened and fragrant, about 10 minutes. Add
        //                             saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        //                         </Typography>
        //                         <Typography sx={{ marginBottom: 2 }}>
        //                             Add rice and stir very gently to distribute. Top with artichokes and
        //                             peppers, and cook without stirring, until most of the liquid is absorbed,
        //                             15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
        //                             mussels, tucking them down into the rice, and cook again without
        //                             stirring, until mussels have opened and rice is just tender, 5 to 7
        //                             minutes more. (Discard any mussels that don&apos;t open.)
        //                         </Typography>
        //                         <Typography>
        //                             Set aside off of the heat to let rest for 10 minutes, and then serve.
        //                         </Typography>
        //                     </CardContent>
        //                 </Collapse>
        //             </Card>
        //         </Grid>
        //     </Grid>
        // </Box>
        <Link to="/newsdetail">
            <div className="bg-white py-24 sm:py-32 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the news</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Learn how to grow your business with our expert advice.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.datetime} className="text-gray-500">
                                        {post.date}
                                    </time>
                                    <a
                                        href={post.category.href}
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        {post.category.title}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <a href={post.author.href}>
                                                <span className="absolute inset-0" />
                                                {post.author.name}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">{post.author.role}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </Link>

    );
}
