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
export const Profile = lazy(() => import('src/pages/profile'));
export const Signin = lazy(() => import('src/pages/signin'));
export const HighSchoolView = lazy(() => import('src/pages/highschool'));
export const Logout = lazy(() => import('src/pages/logout'));
export const ConsultantView = lazy(() => import('src/pages/consultant'));
export const ConsultantLevelView = lazy(() => import('src/pages/consultantlevel'));
export const Transaction = lazy(() => import('src/pages/transaction'));
export const TransactionUniversityPage = lazy(() => import('src/pages/transactionuniversity'));
export const Wallet = lazy(() => import('src/pages/wallet'));
export const AdmissionInformationsPage = lazy(() => import('src/pages/admissionInformations'));
export const MajorPage = lazy(() => import('src/pages/major'));
export const OccupationPage = lazy(() => import('src/pages/occupation'));
export const AdmissionMethodPage = lazy(() => import('src/pages/admissionMethod'));
export const EntryLevelEducationPage = lazy(() => import('src/pages/entryLevelEducation'));
export const MajorCategoryPage = lazy(() => import('src/pages/majorCategory'));
export const OccupationalGroupPage = lazy(() => import('src/pages/occupationalGroup'));
export const WorkSkillPage = lazy(() => import('src/pages/workSkill'));
export const NewsForUniversity = lazy(() => import('src/pages/newsforUniversity'));
export const TransactionAdmin = lazy(() => import('src/pages/transactionAdmin'));
export const PaymentPage = lazy(() => import('src/pages/payment'));
export const SigninPayment = lazy(() => import('src/sections/payment/signinpayment'));
export const PaymentBegin = lazy(() => import('src/sections/payment/paymentbegin'));
export const PaymentSuccess = lazy(() => import('src/sections/payment/Success'));
export const Notification = lazy(() => import('src/pages/notification'));
export const ConsultantAccountView = lazy(() => import('src/sections/adminAccount/consultant/view/consultantaccount-view'));
export const HighSchoolAccountView = lazy(() => import('src/sections/adminAccount/highschool/view/highschoolaccount-view'));
export const UserAccountView = lazy(() => import('src/sections/adminAccount/user/view/userAccount-view'));
export const UniversityAccountView = lazy(() => import('src/sections/adminAccount/university/view/universityAccount-view'));
export const TestLesson = lazy(() => import('src/pages/testlesson'));
export const WithdrawalRequest = lazy(() => import('src/pages/withdrawalRequest'));

export const EmptyPage = lazy(() => import('src/pages/emptypage'));

// ----------------------------------------------------------------------

export default function Router() {
  let role = localStorage.getItem('role');
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
        { path: 'students', element: role === '3' || role === '1' ? <UserPage /> : <Navigate to="/404" replace /> },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
        // { path: 'upload', element: <UploadFile /> },
        // { path: 'counter', element: <CounterComponent /> },
        // { path: 'eventquiz', element: <EventQuiz /> },
        // { path: 'editquiz', element: <EditQuiz /> `},
        // { path: 'myquiz', element: <MyQuiz /> },
        { path: '/dashboard', element: role === '1' ? <Dashboard /> : <Navigate to="/404" replace /> },
        { path: 'transactions', element: role === '3' || role === "1" || role === "5" ? <Transaction /> : <Navigate to="/404" replace /> },
        { path: '/managers', element: < EmptyPage /> }, // Đây là thành phần chính cho managers
        { path: 'highschool', element: role === '1' ? <HighSchoolView /> : <Navigate to="/404" replace /> },
        { path: 'major', element: role === '1' ? <MajorPage /> : <Navigate to="/404" replace /> },
        { path: 'admissionMedthod', element: role === '1' ? <AdmissionMethodPage /> : <Navigate to="/404" replace /> },
        { path: 'entryLevelEducation', element: role === '1' ? <EntryLevelEducationPage /> : <Navigate to="/404" replace /> },
        { path: 'MajorCategory', element: role === '1' ? <MajorCategoryPage /> : <Navigate to="/404" replace /> },
        { path: 'occupationgroup', element: role === '1' ? <OccupationalGroupPage /> : <Navigate to="/404" replace /> },
        { path: 'workSkill', element: role === '1' ? <WorkSkillPage /> : <Navigate to="/404" replace /> },
        { path: 'transactionsAdmin', element: role === '1' ? <TransactionAdmin /> : <Navigate to="/404" replace /> },
        { path: 'consultants', element: role === '5' || role === '1' ? <ConsultantView /> : <Navigate to="/404" replace /> },
        { path: 'newsuni', element: role === '5' ? <NewsForUniversity /> : <Navigate to="/404" replace /> },
        { path: 'occupation', element: role === '1' ? <OccupationPage /> : <Navigate to="/404" replace /> },
        { path: 'admissionInformations', element: role === '5' ? <AdmissionInformationsPage /> : <Navigate to="/404" replace /> },
        { path: 'transactionsuniversity', element: role === '5' ? <TransactionUniversityPage /> : <Navigate to="/404" replace /> },
        { path: 'university', element: role === '1' ? <UniversityView /> : <Navigate to="/404" replace /> },
        { path: 'consultantAccount', element: role === '1' ? <ConsultantAccountView /> : <Navigate to="/404" replace /> },
        { path: 'highschoolAccount', element: role === '1' ? <HighSchoolAccountView /> : <Navigate to="/404" replace /> },
        { path: 'consultantsLevel', element: role === '1' ? <ConsultantLevelView /> : <Navigate to="/404" replace /> },
        { path: 'userAccount', element: role === '1' ? <UserAccountView /> : <Navigate to="/404" replace /> },
        { path: 'universityAccount', element: role === '1' ? <UniversityAccountView /> : <Navigate to="/404" replace /> },
        { path: 'testlesson', element: role === '1' ? <TestLesson /> : <Navigate to="/404" replace /> },
        { path: 'withdrawalRequest', element: role === '1' ? <WithdrawalRequest /> : <Navigate to="/404" replace /> },

        // { path: 'wallet', element: role === '2' ? <Wallet /> : <Navigate to="/404" replace /> }

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'payment',
      element: < PaymentPage />,
    },
    {
      path: 'signinpayment',
      element: < SigninPayment />,
    },
    {
      path: 'paymentbegin',
      element: < PaymentBegin />,
    },
    {
      path: "Payment/result",
      element: <PaymentSuccess />
    },
    {
      path: 'notification',
      element: <Notification />
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
      path: '/newsdetail/:id', element: (
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
