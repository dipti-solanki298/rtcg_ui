import React, { useState } from "react";
import Button from '@mui/material/Button';
import HeaderComponent from "../common_components/HeaderComponent";
import { analyzeProject } from "../services/api_services";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const SelectActionPage = ({ continueFunction, backFunction, project, llmChoice, getDocumentsList, getMetaDocumentation }) => {

    const [ loading, setLoading ] = useState(true);
    const [ imgURL, setImgURl ] = useState(null);


    React.useEffect(()=>{
        console.log(project);
        const getImagePath = async() => {
            try{
                const response = await analyzeProject(project, llmChoice);
                console.log(response);// This should be an ArrayBuffer or Blob
                getDocumentsList(response.document_list);
                getMetaDocumentation(response.meta_documentation);
                setImgURl(response.uml_image_url);
                // const blob = new Blob([response], { type: 'image/png' });
                // const objURL = URL.createObjectURL(blob);

                // setImgURl(objURL);

                // setImgPath(blob); 
            } catch (err){
                console.log('unable analyze project', err);
            } finally {
                setLoading(false);
            }
        }

        getImagePath();
    },[]);

    const downloadGraph = () => {
        const link = document.createElement('a');
        link.href = imgURL;  // This is the Blob URL
        link.download = 'uml_diagram.png';  // Filename for the download
        document.body.appendChild(link);  // Append link to body
        link.click();  // Trigger the download
        document.body.removeChild(link);  // Clean up the link
      };
    

    return (
        <div className="flex flex-col justify-start items-start gap-4 h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px]">
            <HeaderComponent title={"Code Analysis Completed"} subtitle={"UML diagram has been generated"}/>
            <div className="flex flex-col w-full h-max justify-start items-start gap-1">
                {imgURL && <img src={imgURL} alt="Blob" style={{ width:"auto", height:"auto" }}/>}
                {/* <Button variant="text" onClick={()=> downloadGraph()}>Download</Button> */}
            </div>
            <div className="flex flex-col w-full h-max justify-start items-start gap-1">
                <h1>Please click continue to generate the test case scenarios</h1>
            </div>
            <div className="flex flex-row w-full h-max mt-4">
                <Button variant="contained" style={{ backgroundColor: '#1c287d', marginRight: '10px'}} onClick={()=>continueFunction()}>
                    Continue
                </Button>   
                <Button variant="contained" style={{ backgroundColor: '#9499a5'}} onClick={()=>backFunction()}>
                    Back
                </Button>
            </div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default SelectActionPage;