import { Helmet } from 'react-helmet-async';

import { UploadFile } from 'src/sections/uploadfile/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UploadFile />
    </>
  );
}
