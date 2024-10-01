import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
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

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'test', element: <Hello /> },
        { path: 'upload', element: <UploadFile /> },
        { path: 'counter', element: <CounterComponent /> },
        // {path: 'homepage', element: <Homepage />},
        { path: 'eventquiz', element: <EventQuiz /> },
        { path: 'editquiz', element: <EditQuiz /> },
        { path: 'myquiz', element: <MyQuiz /> },
        { path: 'newsuniversity', element: <NewsUniversity /> },

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
    { path: 'homepage', element: <Homepage /> },
    { path: 'news', element: <News /> },
    { path: 'hello', element: <Hello /> },
    { path: 'newsdetail', element: <NewsDetail /> },


  ]);

  return routes;
}