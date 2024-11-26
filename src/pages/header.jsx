import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import Typography from '@mui/material/Typography';

import { Link, useNavigate } from 'react-router-dom';
import { Image, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


import { List as ListMui, ListItemButton as ListItemButtonMui, ListItemText as ListItemTextMui, Menu as MenuMui, MenuItem as MenuItemMui } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { signoutUser } from '../store/account/action';
import notificationService from '../services/notifycation';




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
]
// let role = localStorage.getItem('role');

// const getNavigation = () => {
//     const navItems = [
//         { name: 'Trang chủ', href: '/', current: false },
//         { name: 'Tin tức', href: '/news', current: false },
//     ];

//     if (role === '1' || role === '2') {
//         navItems.push({ name: 'Quản lý', href: '/managers', current: false });
//     }

//     return navItems;
// };

// const navigation = getNavigation();

const userNavigation = [
    { name: 'Hồ sơ của bạn', href: '/profile' },
    { name: 'Đăng nhập', href: '/signin' },
    { name: 'Đăng xuất', onClick: 'logout' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const options = [
    'Show some love to MUI',
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
];

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.accountReducer);
    console.log('isAuthenticated1', isAuthenticated);
    const [isOpen, setIsOpen] = useState(false);
    console.log('isOpen', isOpen);

    const toggleList = () => {
        setIsOpen((prev) => !prev);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(signoutUser(accountId, navigate));
    };
    const accountId = localStorage.getItem('accountId');


    const [showAll, setShowAll] = useState(false);

    // Xử lý danh sách thông báo dựa vào trạng thái showAll

    const [notification, setNotification] = useState([]);
    const visibleNotifications = showAll ? notification : notification.slice(0, 5);
    const listRef = useRef(null);
    console.log('listRef', listRef);


    useEffect(() => {
        const fetchNotification = async () => {
            const response = await notificationService.getNotificationById(accountId);
            setNotification(response || []); // Đặt giá trị mặc định là mảng rỗng nếu không có dữ liệu
        };
        fetchNotification();
    }, [accountId]);

    let token = localStorage.getItem('token');
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');

    const accessToken = token;  // Token JWT của bạn

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/notification_hub`, {
                accessTokenFactory: () => accessToken
            })
            .withAutomaticReconnect()
            .build();

        // Kết nối SignalR
        connection.start()
            .then(() => {
                setStatus('Connected to SignalR');
                console.log('Connected to SignalR hub.');

                // Nhận thông báo từ server
                connection.on('ReceiveNotification', (notitfycation) => {
                    console.log('Received notification:', notitfycation);
                    setNotification(prevMessages => [...prevMessages, notitfycation]);
                });
            })
            .catch(err => {
                setStatus(`Connection failed: ${err}`);
                console.error(err);
            });

        // Clean up khi component unmount
        return () => {
            connection.stop();
        };
    }, [accessToken]);

    // Đóng thông báo khi click bên ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setIsOpen(false); // Đóng thông báo
                setShowAll(false); // Ẩn tất cả thông báo
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listRef, setIsOpen]);

    return (

        <>
            <div className=" w-full z-10 ">
                <Disclosure as="nav" className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
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
                            <div className="hidden md:block relative">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        onClick={toggleList}
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 cursor-pointer"
                                        />

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
                                                <MenuItem MenuItem key={item.name} >
                                                    <Link
                                                        to={item.href}
                                                        onClick={item.name === 'Đăng xuất' ? handleLogout : null}
                                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                                {isOpen && (
                                    <div ref={listRef} className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                                        <List sx={{ width: "460px", maxWidth: 460, bgcolor: "background.paper", maxHeight: '600px', overflowY: 'auto' }}>
                                            {visibleNotifications.map((item, index) => (
                                                <div
                                                    key={index}
                                                    style={{

                                                        backgroundColor: item.status === 0 ? "#f0f8ff" : "white", // Màu nền khi chưa đọc
                                                        transition: "background-color 0.3s", // Hiệu ứng hover
                                                    }}
                                                >
                                                    <ListItem
                                                        alignItems="flex-start"
                                                        sx={{
                                                            "&:hover": {
                                                                backgroundColor: "#e0e0e0", // Màu nền khi hover
                                                                cursor: "pointer",
                                                            },
                                                        }}
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                alt={item.name}
                                                                src={item.avatar || "/static/images/avatar/default.jpg"}
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item?.title}
                                                            secondary={
                                                                <>
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        sx={{
                                                                            color: "text.primary",
                                                                            display: "inline",
                                                                            fontWeight: item.status === 0 ? "bold" : "normal", // Chữ đậm nếu chưa đọc
                                                                        }}
                                                                    >
                                                                        {item?.message}
                                                                    </Typography>
                                                                </>
                                                            }
                                                        />

                                                    </ListItem>
                                                    {index < notification.length - 1 && (
                                                        <Divider variant="inset" component="li" />
                                                    )}
                                                </div>
                                            ))}
                                            {/* Nút Xem thêm */}
                                            {notification.length > 5 && !showAll && (
                                                <ListItem
                                                    button
                                                    onClick={() => setShowAll(true)}
                                                    sx={{
                                                        textAlign: "center",
                                                        "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
                                                    }}
                                                >
                                                    <Typography variant="body2" sx={{ color: "primary.main" }}>
                                                        Xem thêm
                                                    </Typography>
                                                </ListItem>
                                            )}

                                        </List>
                                    </div>
                                )}
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


                </Disclosure >

            </div >

        </>

    );
}