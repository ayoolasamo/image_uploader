import './App.css';
import React from 'react';
import Imageuploadcard from './components/imageUploadCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import FinalImage from './components/finalImage';
import Loader from './components/loader';


function App() {
  return (
    <div className="App">
    {/* <FinalImage/> */}
    <Imageuploadcard/>
    </div>
  );
}

export default App;
