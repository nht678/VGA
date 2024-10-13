import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/managers',
    icon: icon('ic_analytics'),
  },
  {
    title: 'students',
    path: '/students',
    icon: icon('ic_user'),
  },
  {
    title: 'consultant',
    path: '/consultants',
    icon: icon('ic_user'),
  },
  {
    title: 'university',
    path: '/unversity',
    icon: icon('ic_user'),
  },
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
  {
    title: 'high school',
    path: '/highschool',
    icon: icon('ic_user'),
  },
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
];

export default navConfig;
