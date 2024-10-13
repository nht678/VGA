import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import LoadingPage from 'src/pages/loading';

import DashboardLayout from 'src/layouts/dashboard';
import UniversityView from 'src/sections/university/view/university-view';

export const Dashboard = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Hello = lazy(() => import('src/pages/test'));
export const UploadFile = lazy(() => import('src/pages/uploadfile'));
export const CounterComponent = lazy(() => import('src/sections/test'));
export const Homepage = lazy(() => import('src/pages/homepage'));
export const Header = lazy(() => import('src/pages/header'));
export const News = lazy(() => import('src/pages/news'));
export const EventQuiz = lazy(() => import('src/pages/eventquiz'));
export const EditQuiz = lazy(() => import('src/pages/quizdetail'));
export const MyQuiz = lazy(() => import('src/pages/myquiz'));
export const NewsDetail = lazy(() => import('src/pages/newsdetail'));
export const NewsUniversity = lazy(() => import('src/pages/newsuniversity'));
export const Profile = lazy(() => import('src/pages/profile'));
export const Signin = lazy(() => import('src/pages/signin'));
export const HighSchoolView = lazy(() => import('src/pages/highschool'));
export const Logout = lazy(() => import('src/pages/logout'));
export const ConsultantView = lazy(() => import('src/pages/consultant'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Homepage />
        </Suspense>
      ),
      index: true
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // { element: <IndexPage />, index: true },
        { path: 'students', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'upload', element: <UploadFile /> },
        { path: 'counter', element: <CounterComponent /> },
        // {path: 'homepage', element: <Homepage />},
        { path: 'eventquiz', element: <EventQuiz /> },
        { path: 'editquiz', element: <EditQuiz /> },
        { path: 'myquiz', element: <MyQuiz /> },
        { path: 'newsuniversity', element: <NewsUniversity /> },
        { path: '/managers', element: <Dashboard /> },
        { path: 'highschool', element: <HighSchoolView /> },
        { path: 'consultants', element: <ConsultantView /> },
        { path: 'unversity', element: <UniversityView /> }

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

    {
      path: 'news',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <News />
        </Suspense>
      )
    },
    { path: 'hello', element: <Hello /> },
    {
      path: 'newsdetail', element: (
        <Suspense fallback={<LoadingPage />}>
          <NewsDetail />
        </Suspense>
      )
    },
    {
      path: 'profile', element:
        (
          <Suspense fallback={<LoadingPage />}>
            <Profile />
          </Suspense>
        )
    },
    {
      path: 'signin',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Signin />
        </Suspense>
      )
    },
    {
      path: 'logout',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Logout />
        </Suspense>
      )
    },
  ]);
  return routes;
}
