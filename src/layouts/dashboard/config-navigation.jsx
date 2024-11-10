// import SvgColor from 'src/components/svg-color';

// // ----------------------------------------------------------------------

// const role = localStorage.getItem('role');
// const icon = (name) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

// const navConfig =
//   role === '1' ?
//     [
//       {
//         title: 'Thống kê',
//         path: '/managers',
//         icon: icon('ic_analytics'),
//       },

//       {
//         title: 'Tư vấn viên',
//         path: '/consultants',
//         icon: icon('ic_user'),
//       },
//       {
//         title: 'Trường đại học',
//         path: '/unversity',
//         icon: icon('ic_user'),
//       },

//       {
//         title: 'Trường cấp 3',
//         path: '/highschool',
//         icon: icon('ic_user'),
//       },

//     ] : role === '2' ? [
//       {
//         title: 'Thống kê',
//         path: '/managers',
//         icon: icon('ic_analytics'),
//       },
//       {
//         title: 'Học sinh',
//         path: '/students',
//         icon: icon('ic_user'),
//       }] : [];

// export default navConfig;

import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import SvgColor from 'src/components/svg-color';
// import NavItem from './nav';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector } from 'react-redux';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';


// ----------------------------------------------------------------------

const NavConfigComponent = () => {
  const [navConfig, setNavConfig] = useState([]);
  const [expandedAccount, setExpandedAccount] = useState(false);

  const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  // const role = localStorage.getItem('role');
  const { isAuthenticated } = useSelector((state) => state.accountReducer);


  useEffect(() => {

    const config =
      role === '1' ? [
        {
          title: 'Thống kê',
          path: '/dashboard',
          icon: icon('ic_analytics'),
        },

        {
          title: 'Cấp độ tư vấn viên',
          path: '/consultantsLevel',
          icon: icon('ic_user'),
        },

        {
          title: 'Trường đại học',
          path: '/university', // đã sửa chính tả
          icon: icon('ic_user'),
        },
        {
          title: 'Ngành học',
          path: '/major', // đã sửa chính tả
          icon: icon('ic_user'),
        },
        {
          title: 'Nghề nghiệp',
          path: '/occupation', // đã sửa chính tả
          icon: icon('ic_user'),
        },
        {
          title: 'Phương thức tuyển sinh',
          path: '/admissionMedthod', // đã sửa chính tả
          icon: icon('ic_user'),
        },
        {
          title: 'Trình độ học vấn đầu vào',
          path: '/entryLevelEducation', // đã sửa chính tả
          icon: icon('ic_user'),
        },
        {
          title: 'Nhóm ngành chính',
          path: '/MajorCategory', // đã sửa chính tả
          icon: icon('ic_user'),
        },
        {
          title: 'Nhóm nghề nghiệp',
          path: '/occupationgroup', // đã sửa chính tả
          icon: icon('ic_user'),
        },
        {
          title: 'Nhóm nghề nghiệp',
          path: '/workSkill', // đã sửa chính tả
          icon: icon('ic_user'),
        },


        // {
        //   title: 'Account',
        //   icon: icon('ic_user'), // Biểu tượng cho mục Account
        //   children: [ // Các mục con
        //     {
        //       title: 'Cấp độ tư vấn viên',
        //       path: '/consultantsLevel',
        //       icon: icon('ic_user'),
        //     },
        //     {
        //       title: 'Trường đại học',
        //       path: '/university',
        //       icon: icon('ic_user'),
        //     },
        //   ],
        // },
        {
          title: 'Trường cấp 3',
          path: '/highschool',
          icon: icon('ic_user'),
        },
      ] : role === '3' ? [
        // {
        //   title: 'Thống kê',
        //   path: '/dashboard',
        //   icon: icon('ic_analytics'),
        // },
        {
          title: 'Học sinh',
          path: '/students',
          icon: icon('ic_user'),
        },
        {
          title: 'Giao dịch',
          path: '/transactions',
          icon: icon('ic_user'),
        },
        // {
        //   title: 'Ví tiền',
        //   path: '/wallet',
        //   icon: icon('ic_user'),
        // },

      ] : role === '5' ? [
        {
          title: 'Tư vấn viên',
          path: '/consultants',
          icon: icon('ic_user'),
        },
        {
          title: 'Thông tin tuyển sinh',
          path: '/admissionInformations',
          icon: icon('ic_user'),
        },
        {
          title: 'Tin tức',
          path: '/news',
          icon: icon('ic_user'),
        },
      ] : [];

    setNavConfig(config);
  }, [token, role]); // Chạy một lần khi component mount

  const handleAccountClick = () => {
    setExpandedAccount((prev) => !prev); // Chuyển đổi trạng thái mở rộng
  };
  return (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
    // <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
    //   {navConfig.map((item) => (
    //     <div key={item.title}>
    //       <div onClick={item.title === 'Account' ? handleAccountClick : null}>
    //         <Typography>{item.title}</Typography>
    //         {item.children && expandedAccount && (
    //           <Stack sx={{ pl: 2 }}>
    //             {item.children.map((child) => (
    //               <NavItem key={child.title} item={child} />
    //             ))}
    //           </Stack>
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </Stack>

  );
};

export default NavConfigComponent;
function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};



// {
//   title: 'upload student',
//   path: '/upload',
//   icon: icon('ic_user'),
// },
// {
//   title: 'event quiz',
//   path: '/eventquiz',
//   icon: icon('ic_user'),
// },
// {
//   title: 'test edit quiz',
//   path: '/editquiz',
//   icon: icon('ic_user'),
// },
// {
//   title: 'my quiz',
//   path: '/myquiz',
//   icon: icon('ic_user'),
// },
// {
//   title: 'news',
//   path: '/newsuniversity',
//   icon: icon('ic_user'),
// },
// {
//   title: 'product',
//   path: '/products',
//   icon: icon('ic_cart'),
// },
// {
//   title: 'blog',
//   path: '/blog',
//   icon: icon('ic_blog'),
// },
// {
//   title: 'login',
//   path: '/login',
//   icon: icon('ic_lock'),
// },
// {
//   title: 'Not found',
//   path: '/404',
//   icon: icon('ic_disabled'),
// },