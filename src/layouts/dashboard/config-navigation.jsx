

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import SvgColor from 'src/components/svg-color';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ReportIcon from '@mui/icons-material/Report';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import QuizIcon from '@mui/icons-material/Quiz';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CategoryIcon from '@mui/icons-material/Category';
import BuildIcon from '@mui/icons-material/Build';





// ----------------------------------------------------------------------

const NavConfigComponent = () => {
  const [navConfig, setNavConfig] = useState([]);
  const navigate = useNavigate();
  const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');


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
            { title: 'Thống kê', path: '/dashboard', icon: <DashboardIcon /> },
            { title: 'Giao dịch', path: '/transactionsAdmin', icon: <AccountBalanceIcon /> },
          ]
        },
        {
          title: 'Tài khoản', path: '#1', children: [
            { title: 'Trường đại học', path: '/universityAccount', icon: <SchoolIcon /> },
            { title: 'Trường cấp 3', path: '/highschoolAccount', icon: <LocationCityIcon /> },
            { title: 'Tư vấn viên', path: '/consultants', icon: <SupervisorAccountIcon /> },
            { title: 'Học sinh', path: '/userAccount', icon: <PersonIcon /> },
          ]
        },
        {
          title: 'Xử lý yêu cầu', path: '#5', children: [
            { title: 'Tố cáo', path: '/report', icon: <ReportIcon /> },
            { title: 'Yêu cầu rút tiền', path: '/withdrawalRequest', icon: <MonetizationOnIcon /> }
          ]
        },
        {
          title: 'Quản lý cấp độ tư vấn viên', path: '#2', children: [
            { title: 'Cấp độ tư vấn viên', path: '/consultantsLevel', icon: <SupervisorAccountIcon /> },
          ]
        },
        {
          title: 'Quản lý bài kiểm tra', path: '#3', children: [
            { title: 'Bài kiểm tra', path: '/testlesson', icon: <QuizIcon /> },
          ]
        },
        {
          title: 'Quản lý ngành nghề', path: '#4', children: [
            { title: 'Ngành học', path: '/major', icon: <SchoolIcon /> },
            { title: 'Nghề nghiệp', path: '/occupation', icon: <WorkIcon /> },
            { title: 'Phương thức tuyển sinh', path: '/admissionMedthod', icon: <HowToRegIcon /> },
            { title: 'Trình độ học vấn đầu vào', path: '/entryLevelEducation', icon: <AccountTreeIcon /> },
            { title: 'Nhóm ngành chính', path: '/MajorCategory', icon: <CategoryIcon /> },
            { title: 'Nhóm nghề nghiệp', path: '/occupationgroup', icon: <BusinessIcon /> },
            { title: 'Kĩ năng Công việc', path: '/workSkill', icon: <BuildIcon /> },
          ]
        },
      ] : role === '3' ? [
        { title: 'Học sinh', path: '/students', icon: <PersonIcon /> },
        { title: 'Giao dịch', path: '/transactions', icon: <AccountBalanceIcon /> },
      ] : role === '5' ? [
        { title: 'Thống kê', path: '/dashboarduni', icon: <DashboardIcon /> },
        { title: 'Tư vấn viên', path: '/consultantAccount', icon: <SupervisorAccountIcon /> },
        { title: 'Thông tin tuyển sinh', path: '/admissionInformations', icon: <InfoIcon /> },
        { title: 'Tin tức', path: '/newsuni', icon: <ArticleIcon /> },
        { title: 'Giao dịch', path: '/transactionsuniversity', icon: <MonetizationOnIcon /> },
      ] : [];

    setNavConfig(config);
  }, [role, token]);

  const renderTree = (nodes) =>
    nodes.map((node, index) => (
      <TreeItem
        itemId={node.path || `item-${index}`}
        key={node.title}
        // label={node.title}
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {node.icon && node.icon} {/* Render icon nếu tồn tại */}
            <span>{node.title}</span>
          </div>
        }
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


