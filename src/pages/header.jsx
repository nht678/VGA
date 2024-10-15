import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signoutUser } from '../store/account/action';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Trang chủ', href: '/', current: false },
    { name: 'Tin tức', href: '/news', current: false },
    { name: 'Quản lý', href: '/managers', current: false },
    // { name: 'Thống ', href: '#', current: false },
]
const userNavigation = [
    { name: 'Hồ sơ của bạn', href: '/profile' },
    { name: 'Đăng nhập', href: '/signin' },
    { name: 'Đăng xuất', onClick: 'logout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(3),
//         width: '40%',
//     },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',

// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '60ch',
//         },
//     },
// }));

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.accountReducer);

    const handleLogout = () => {
        dispatch(signoutUser());
        if (isAuthenticated) {
            navigate('/signin', { replace: true });
            message.success('Sign out successfully');
        }
    }
    // React.useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/signin', { replace: true });
    //         message.success('Sign out successfully');
    //     }
    // }, [isAuthenticated, navigate]);
    return (
        // <Box>
        //     <Box sx={{ flexGrow: 1 }}>
        //         <AppBar position="static">
        //             <Toolbar sx={{ justifyContent: "space-around" }}>

        //                 <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        //                     {/* AdbIcon vẫn sử dụng sx */}
        //                     {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

        //                     {/* Đặt Image từ Ant Design với style */}
        //                     {/* <Image
        //                         style={{ marginRight: 10 }}
        //                         width={30}
        //                         height={30}
        //                         src="/assets/images/avatars/Picture2.png" // Đảm bảo đây là một URL hợp lệ
        //                         fallback="https://fallback-image-url.com/fallback.png" // Ảnh fallback nếu không load được
        //                     /> */}
        //                     <Link href='#'>
        //                         <img
        //                             style={{ width: 40, height: 40, marginRight: 10 }}
        //                             src="/assets/images/avatars/Logo.png"
        //                             alt="avatar"
        //                         />
        //                     </Link>


        //                     <Typography
        //                         variant="h6"
        //                         noWrap
        //                         component="div"
        //                         sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2 }} // Sửa marginLeft ra khỏi display
        //                     >
        //                         VGA
        //                     </Typography>
        //                 </Box>


        //                 <Search>
        //                     <SearchIconWrapper>
        //                         <SearchIcon />
        //                     </SearchIconWrapper>
        //                     <StyledInputBase
        //                         placeholder="Search…"
        //                         inputProps={{ 'aria-label': 'search' }}
        //                     />
        //                 </Search>
        //                 {/* <Box sx={{ flexGrow: 1 }} /> */}
        //                 <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        //                     <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        //                         <Badge badgeContent={4} color="error">
        //                             <MailIcon />
        //                         </Badge>
        //                     </IconButton>
        //                     <IconButton
        //                         size="large"
        //                         aria-label="show 17 new notifications"
        //                         color="inherit"
        //                     >
        //                         <Badge badgeContent={17} color="error">
        //                             <NotificationsIcon />
        //                         </Badge>
        //                     </IconButton>
        //                     <IconButton
        //                         size="large"
        //                         edge="end"
        //                         aria-label="account of current user"
        //                         aria-controls={menuId}
        //                         aria-haspopup="true"
        //                         onClick={handleProfileMenuOpen}
        //                         color="inherit"
        //                     >
        //                         <AccountCircle />
        //                     </IconButton>
        //                 </Box>
        //                 <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        //                     <IconButton
        //                         size="large"
        //                         aria-label="show more"
        //                         aria-controls={mobileMenuId}
        //                         aria-haspopup="true"
        //                         onClick={handleMobileMenuOpen}
        //                         color="inherit"
        //                     >
        //                         <MoreIcon />
        //                     </IconButton>
        //                 </Box>
        //             </Toolbar>
        //         </AppBar>
        //         {renderMobileMenu}
        //         {renderMenu}
        //     </Box>
        //     <Box sx={{ flexGrow: 1 }}>
        //         <AppBar position="static" >
        //             <Box
        //                 sx={{
        //                     typography: 'body1',
        //                     '& > :not(style) ~ :not(style)': {
        //                         ml: 2,
        //                     },
        //                     display: { xs: 'none', md: 'flex' },
        //                     justifyContent: 'center',
        //                 }}
        //                 onClick={preventDefault}
        //             >
        //                 <Link to="/homepage" style={{ textDecoration: 'none', color: 'inherit' }}>
        //                     HomePage
        //                 </Link>
        //                 <Link to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>
        //                     News
        //                 </Link>
        //                 <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
        //                     Manages
        //                 </Link>
        //             </Box>
        //         </AppBar>
        //     </Box>
        // </Box>
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className=" w-full z-10   ">
                <Disclosure as="nav" className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {/* <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                        // src='/assets/images/avatars/Picture1.png'
                                        className="h-8 w-8"
                                    // style={{ filter: 'grayscale(100%)' }}
                                    /> */}
                                    <Link to="/">
                                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2, color: 'rgba(99,102,241,1)' }} >
                                            VGA
                                        </Typography>

                                    </Link>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name}>
                                                    {/* {item.onClick ? (
                                                        <Button
                                                            sx={{ border: 'none' }}
                                                            onClick={handleLogout}
                                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                        >
                                                            {item.name}
                                                        </Button>
                                                    ) : ( */}
                                                    <Link
                                                        to={item.href}
                                                        onClick={item.name === 'Sign out' ? handleLogout : null}
                                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    {/* )} */}
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>

                {/* <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">abc</div>
                </main> */}
            </div>
        </>

    );
}