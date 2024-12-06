import { Helmet } from 'react-helmet-async';

import UserView from 'src/sections/user/view/user-view'

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title>Học sinh</title>
      </Helmet>

      <UserView />
    </>
  );
}
