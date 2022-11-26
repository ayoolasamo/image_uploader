import React from "react";
import img from "../image.svg";
import { useState, useEffect } from "react";
import { ToastContainer, toast,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageKit from "imagekit";
import Loader from "./loader";
import FinalImage from "./finalImage";


const Imageuploadcard = () =>{
    const [path,setPath] = useState('');
	const [url,setUrl] = useState('');
	const [uploading,setUploading] = useState(false);
	const [imgurl,setImgurl] = useState('');
	const [drag,setDrag] = useState(false);
    
    var imagekit = new ImageKit({
        
        publicKey : "public_tvK69a2KBuXMr7i2LXr4RMr3Bkw=",
	    urlEndpoint : "https://ik.imagekit.io/ayoolasamo",
        privateKey : "private_WIPUkRnvbbYdLO3Q042On0yKIYo=",
    });

    const pathcheck = (path) =>{
        if(path){
			if(path.split('.').includes('jpg')){
				return true;
			}else if(path.split('.').includes('jpeg')){
				return true;
			}else if(path.split('.').includes('png')){
				return true;
			}
		}
    }

    useEffect(()=>{
        const dropArea =  document.getElementById("drag-area");
        const dragText = document.getElementById("drag-text");
        const input = document.getElementById("file");

        dropArea.onclick =()=>{
            input.click();
        }
        
        dropArea.addEventListener("dragover", (event)=>{
            event.preventDefault();
            dropArea.classList.add("active");
            dragText.textContent = "Release to Upload File";
        });

        dropArea.addEventListener("dragleave",()=>{
            dropArea.classList.remove("active");
            dragText.textContent = "drag and drop image here";
        } )

        dropArea.addEventListener("drop",(event)=>{
            event.preventDefault();
            showFile(event.dataTransfer.files[0]);
        });
    },[])

    function showFile(file){
        const dropArea =  document.getElementById("drag-area");
        const dragText = document.getElementById("drag-text");
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/png", "image/jpg"];

        if (validExtensions.includes(fileType)){
            let fileReader = new FileReader();
            fileReader.onload=()=>{
                let fileURL = fileReader.result;
                setUrl(fileURL);
                setDrag(true);
            }
            fileReader.readAsDataURL(file);
        }
        else{
            toast("This is not an image file",toastOption);
            dropArea.classList.remove("active");
            dragText.textContent = "drag and drop image here";
        }
    }   

    useEffect(()=>{
        const imageInput = document.getElementById("file");
        if (imageInput){
            imageInput.addEventListener('change',()=>{
                const reader = new FileReader();

                reader.addEventListener('load',()=>{
                    let uploadedImage = reader.result;
                    setUrl(uploadedImage);
                });
                reader.readAsDataURL(imageInput.files[0]);
            })
        }
    },[path])
    

    const upload2=()=>{
        setUploading(true)
				// e.preventDefault();
				imagekit.upload({
			    file : url, //required
			    fileName : "imageuploaded",   //required
			    extensions: [
			        {
			            name: "google-auto-tagging",
			            maxTags: 5,
			            minConfidence: 95
			        }
			    ]
				}).then(response => {
				    setImgurl(response.url);
				    setUploading(false)
				}).catch(error => {
				    console.log(error.message);
				});
    }
    const upload = () =>{
		if(url.length > 2 && !drag){
			if(pathcheck(path)){
				setUploading(true)
				// e.preventDefault();
				imagekit.upload({
			    file : url, 
			    fileName : "imageuploaded",   //required
			    extensions: [
			        {
			            name: "google-auto-tagging",
			            maxTags: 5,
			            minConfidence: 95
			        }
			    ]
				}).then(response => {
				    setImgurl(response.url);
				    setUploading(false)
				}).catch(error => {
				    console.log(error.message);
				});
			}else{
				toast('Please Select an Image',toastOption);
			}  
		}else{
			if(url.length>2){
				upload2()
			}
		}
	}
    if(uploading){
        return(
           <Loader />
        )
    }
    if(imgurl){
        return(
            <FinalImage  imgurl={imgurl}/>
        )
        
    }
const toastOption={
    position:"bottom-right",
    autoClose:8800,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
}
  
        return(
            <form className="imageuploadcard  shadow p-4 text-center col-11 col-md-8 col-lg-5">
                <h3 className="title text-center">Upload your image</h3>
                <h7 className="text-center">File should be Jpeg, Png,...</h7>
                <div className="imagecontainer p-5 my-4 col-9 m-auto" id="drag-area" >
                
                    <img alt="ViewedImage " src={url ? url : img  } className="image  my-3 col-6" ></img>
                    {
					url ?
					""
					:
                    <p id="drag-text" className="text"> drag and drop image here </p>		
				}	
                    <input className="inputfile" type={url ? "disabled" :"file"} accept="image/*" id="file"  onClick={upload}
                    value ={path}
                    onChange={(e)=>setPath(e.target.value)}
                    ></input>
                   
                </div>
                
                <p>
                {
                    url ? <span className="text">preview</span> :<span className="text">or</span>
                }
                </p>
            
                
                <label className="label p-2" for="file">{url ? "Get CDN":"choose a file"}</label>
                <ToastContainer/>
                
            </form>
          
        )
}

export default Imageuploadcard;