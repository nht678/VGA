

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
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
  const navigate = useNavigate();
  const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  // const role = localStorage.getItem('role');
  const { isAuthenticated } = useSelector((state) => state.accountReducer);


  //   useEffect(() => {

  //     const config =
  //       role === '1' ? [
  //         {
  //           title: 'Thống kê',
  //           path: '/dashboard',
  //           icon: icon('ic_analytics'),
  //         },

  //         {
  //           title: 'Cấp độ tư vấn viên',
  //           path: '/consultantsLevel',
  //           icon: icon('ic_user'),
  //         },

  //         {
  //           title: 'Trường đại học',
  //           path: '/university', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Ngành học',
  //           path: '/major', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Nghề nghiệp',
  //           path: '/occupation', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Phương thức tuyển sinh',
  //           path: '/admissionMedthod', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Trình độ học vấn đầu vào',
  //           path: '/entryLevelEducation', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Nhóm ngành chính',
  //           path: '/MajorCategory', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Nhóm nghề nghiệp',
  //           path: '/occupationgroup', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Kĩ năng Công việc',
  //           path: '/workSkill', // đã sửa chính tả
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Giao dịch',
  //           path: '/transactionsAdmin',
  //           icon: icon('ic_user'),
  //         },

  //         {
  //           title: 'Trường cấp 3',
  //           path: '/highschool',
  //           icon: icon('ic_user'),
  //         },
  //       ] : role === '3' ? [
  //         // {
  //         //   title: 'Thống kê',
  //         //   path: '/dashboard',
  //         //   icon: icon('ic_analytics'),
  //         // },
  //         {
  //           title: 'Học sinh',
  //           path: '/students',
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Giao dịch',
  //           path: '/transactions',
  //           icon: icon('ic_user'),
  //         },
  //         // {
  //         //   title: 'Ví tiền',
  //         //   path: '/wallet',
  //         //   icon: icon('ic_user'),
  //         // },

  //       ] : role === '5' ? [
  //         {
  //           title: 'Tư vấn viên',
  //           path: '/consultants',
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Thông tin tuyển sinh',
  //           path: '/admissionInformations',
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Tin tức',
  //           path: '/news',
  //           icon: icon('ic_user'),
  //         },
  //         {
  //           title: 'Giao dịch',
  //           path: '/transactionsuniversity',
  //           icon: icon('ic_user'),
  //         },
  //       ] : [];

  //     setNavConfig(config);
  //   }, [token, role]); // Chạy một lần khi component mount


  //   return (
  //     <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
  //       {navConfig.map((item) => (
  //         <NavItem key={item.title} item={item} />
  //       ))}
  //     </Stack>

  //   );
  // };
  useEffect(() => {
    const config =
      role === '1' ? [
        {
          title: 'Thông tin thống kê', path: '#', children: [
            { title: 'Thống kê', path: '/dashboard' },
            { title: 'Giao dịch', path: '/transactionsAdmin' },
            { title: 'Yêu cầu rút tiền', path: '/withdrawalRequest' }

          ]
        },

        {
          title: 'Tài khoản', path: '#1', children: [
            { title: 'Trường đại học', path: '/universityAccount' },
            { title: 'Trường cấp 3', path: '/highschoolAccount' },
            { title: 'Tư vấn viên', path: '/consultantAccount' },
            { title: 'Học sinh', path: '/userAccount' },
          ]
        },
        {
          title: 'Quản lý cấp độ tư vấn viên', path: '#2', children: [
            { title: 'Cấp độ tư vấn viên', path: '/consultantsLevel' },
          ]
        },
        {
          title: 'Quản lý bài kiểm tra', path: '#3', children: [
            { title: 'Bài kiểm tra', path: '/testlesson' },
          ]
        },
        // {
        //   title: 'Quản lý tư vấn viên', path: '#2', children: [
        //     { title: 'Cấp độ tư vấn viên', path: '/consultantsLevel' },
        //     { title: 'Tư vấn viên', path: '/consultants' },
        //   ]
        // },
        {
          title: 'Quản lý ngành nghề', path: '#4', children: [
            { title: 'Ngành học', path: '/major' },
            { title: 'Nghề nghiệp', path: '/occupation' },
            { title: 'Phương thức tuyển sinh', path: '/admissionMedthod' },
            { title: 'Trình độ học vấn đầu vào', path: '/entryLevelEducation' },
            { title: 'Nhóm ngành chính', path: '/MajorCategory' },
            { title: 'Nhóm nghề nghiệp', path: '/occupationgroup' },
            { title: 'Kĩ năng Công việc', path: '/workSkill' },
          ]
        },

        // { title: 'Cấp độ tư vấn viên', path: '/consultantsLevel' },
        // { title: 'Ngành học', path: '/major' },
        // { title: 'Nghề nghiệp', path: '/occupation' },
        // { title: 'Phương thức tuyển sinh', path: '/admissionMedthod' },
        // { title: 'Trình độ học vấn đầu vào', path: '/entryLevelEducation' },
        // { title: 'Nhóm ngành chính', path: '/MajorCategory' },
        // { title: 'Nhóm nghề nghiệp', path: '/occupationgroup' },
        // { title: 'Kĩ năng Công việc', path: '/workSkill' },
      ] : role === '3' ? [
        { title: 'Học sinh', path: '/students' },
        { title: 'Giao dịch', path: '/transactions' },
      ] : role === '5' ? [
        {
          title: 'Quản lý tư vấn viên', path: '#2', children: [
            // { title: 'Cấp độ tư vấn viên', path: '/consultantsLevel' },
            { title: 'Tư vấn viên', path: '/consultants' },
          ]
        },
        { title: 'Thông tin tuyển sinh', path: '/admissionInformations' },
        { title: 'Tin tức', path: '/newsuni' },
        { title: 'Giao dịch', path: '/transactionsuniversity' },
      ] : [];

    setNavConfig(config);
  }, [role, token]);

  const renderTree = (nodes) =>
    nodes.map((node, index) => (
      <TreeItem
        itemId={node.path || `item-${index}`}
        key={node.title}
        nodeId={node.title}
        label={node.title}
        onClick={() => node.path && navigate(node.path)}
        style={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',

        }}
      >
        {node.children && renderTree(node.children)}
      </TreeItem>
    ));

  return (
    <SimpleTreeView>
      {renderTree(navConfig)} {/* Gọi hàm renderTree để tạo các TreeItem từ navConfig */}
    </SimpleTreeView>
  );
}

export default NavConfigComponent;
// function NavItem({ item }) {
//   const pathname = usePathname();

//   const active = item.path === pathname;

//   return (
//     <ListItemButton
//       component={RouterLink}
//       href={item.path}
//       sx={{
//         minHeight: 44,
//         borderRadius: 0.75,
//         typography: 'body2',
//         color: 'text.secondary',
//         textTransform: 'capitalize',
//         fontWeight: 'fontWeightMedium',
//         ...(active && {
//           color: 'primary.main',
//           fontWeight: 'fontWeightSemiBold',
//           bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
//           '&:hover': {
//             bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
//           },
//         }),
//       }}
//     >
//       <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
//         {item.icon}
//       </Box>

//       <Box component="span">{item.title} </Box>
//     </ListItemButton>
//   );
// }

// NavItem.propTypes = {
//   item: PropTypes.object,
// };


