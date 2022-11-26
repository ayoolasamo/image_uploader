import React from 'react';
import { ToastContainer, toast,} from 'react-toastify';
import img from "../image.svg";


const FinalImage =({ imgurl})=>{
    const toastOption={
        position:"bottom-right",
        autoClose:6800,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }

    const copylink =()=>{
        var copyText= document.getElementById("imageinput");
        copyText.select();
	  	copyText.setSelectionRange(0, 99999); 
		navigator.clipboard.writeText(copyText.value);
		toast.success('Link copied to clipboard',toastOption)
    }
    return(
        <div className="imageuploadcard shadow p-4 text-center col-11 col-md-8 col-lg-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <h5 className='my-4'>Uploaded Succesfully</h5>
        <div className="" id="drag-area" >
            <img  alt="Viewed-Image" src={img} className="image  rounded my-3 col-11 col-md-8 col-lg-8" ></img>
        </div>
        <div className='border rounded  col-12  col-md-8 col-lg-9 m-auto '>
            <input className="urlinput" id="imageinput" value ={imgurl}/>
            <button className="label " style={{float:'right'}} onClick={copylink}>Copy link</button> 
             
        </div>
        <ToastContainer/>    
    </div>

    )
}
export default FinalImage;