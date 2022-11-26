import * as React from 'react';

import LinearProgress from '@mui/material/LinearProgress';

export default function Loader() {
  return (
    
    <div className='col-6 col-lg-5   m-auto p-4  shadow loader'>
      <h5 className='p-2 my-2' style={{color:"#4F4F4F"}}>Uploading...</h5>
      <LinearProgress />
    </div>
   
  );
}


