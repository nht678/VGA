import * as React from 'react';
import { jwtDecode } from 'jwt-decode';
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    let role = localStorage.getItem('role');
    let token = localStorage.getItem('token');
    let imageUrl = localStorage.getItem('imageUrl');

    const user = {
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl: role ? (imageUrl === 'null' ? 'https://th.bing.com/th/id/OIP.xyVi_Y3F3YwEIKzQm_j_jQHaHa?rs=1&pid=ImgDetMain' : imageUrl) : 'https://th.bing.com/th/id/OIP.xyVi_Y3F3YwEIKzQm_j_jQHaHa?rs=1&pid=ImgDetMain',
    }

    const userNavigation = role === '3' || role === '5'
        ? [
            { name: 'Hồ sơ của bạn', href: role === '3' ? '/profilehighschool' : '/profileuniversity' },
            { name: 'Đăng xuất', onClick: 'logout' },
        ]
        : role === '1' ?
            [
                { name: 'Đăng xuất', onClick: 'logout' },
            ] :
            [
                { name: 'Đăng nhập', href: '/signin' },
            ];
    const navigation = role ? [
        { name: 'Trang chủ', href: '/', current: false },
        { name: 'Tin tức', href: '/news', current: false },

        { name: 'Quản lý', href: '/managers', current: false },
    ] :
        [
            { name: 'Trang chủ', href: '/', current: false },
            { name: 'Tin tức', href: '/news', current: false },
        ];


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
    console.log("notification", notification);
    const visibleNotifications = showAll ? notification : notification.slice(0, 5);
    const listRef = useRef(null);
    const [status, setStatus] = useState('');
    const [messages, setMessages] = useState([]);
    const [changeStatus, setChangeStatus] = useState(false);

    // Hàm để xử lý khi click vào thông báo
    const handleNotificationClick = async (id) => {
        // Gửi PUT request để thay đổi status của thông báo thành đã đọc
        const response = await notificationService.changeStatusNotification(id);
        if (response) {
            // Cập nhật trạng thái của thông báo
            setNotification((prevNotifications) =>
                prevNotifications.map((item) =>
                    item.id === id ? { ...item, status: 1 } : item
                )
            );
            //     message.success('Đã đọc thông báo');
            //     // Chuyển hướng đến trang chi tiết thông báo
            // } else {
            //     message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };


    const fetchNotification = async () => {
        const response = await notificationService.getNotificationById(accountId);
        setNotification(response || []); // Đặt giá trị mặc định là mảng rỗng nếu không có dữ liệu
    };
    useEffect(() => {
        fetchNotification();
    }, [accountId, changeStatus]);





    const accessToken = token;  // Token JWT của bạn

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://vgacareerguidance.id.vn/notification_hub`, {
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
                    // setNotification(prevMessages => [...prevMessages, notitfycation]);
                    setNotification((prevMessages) => {
                        // Kiểm tra nếu thông báo mới không trùng `createdAt` với thông báo cũ
                        const isDuplicate = prevMessages.some(
                            (message1) =>
                                new Date(message1.createdAt).getTime() === new Date(notitfycation.createdAt).getTime()
                        );
                        if (!isDuplicate) {
                            setChangeStatus((prev) => !prev);
                        }

                        // Chỉ thêm vào nếu không trùng
                        return isDuplicate ? prevMessages : [...prevMessages, notitfycation];
                    });
                });
            })
            .catch(err => {
                setStatus(`Connection failed: ${err}`);
                console.error(err);
            });

        // Clean up khi component unmount
        return () => {
            connection.stop();
            console.log('connection stop');
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
                                    {
                                        role ? <Link to="/managers">
                                            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2, color: 'rgba(99,102,241,1)' }} >
                                                VGA
                                            </Typography>

                                        </Link>
                                            :
                                            <Link to="/">
                                                <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 2, color: 'rgba(99,102,241,1)' }} >
                                                    VGA
                                                </Typography>
                                            </Link>
                                    }

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
                                        <span className="sr-only">Xem thông báo</span>
                                        <BellIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 cursor-pointer"
                                        />
                                        {/* Badge thông báo */}
                                        {notification.filter(item => item.status === 0).length > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                                                {notification.filter(item => item.status === 0).length}
                                            </span>
                                        )}
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
                                                <div key={index}
                                                    style={{
                                                        backgroundColor: item.status === 0 ? "#f0f8ff" : "white", // Màu nền khi chưa đọc
                                                        transition: "background-color 0.3s", // Hiệu ứng hover
                                                    }}>
                                                    <button
                                                        type='submit'

                                                        onClick={() => handleNotificationClick(item.id)} // Gọi hàm khi click
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
                                                                    src={item.avatar}
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
                                                    </button>
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