import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import HeaderComponent from "../common_components/HeaderComponent";
import { Chip } from "@mui/material";
import { analyzeProject } from "../services/api_services";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { saveAs } from 'file-saver';

const SelectActionPage = ({ continueFunction, backFunction, project, getType }) => {

    const [ type, setType ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ imagePath, setImgPath ] = useState(null);
    const [ imgURL, setImgURl ] = useState(null);

    const updateAction = (act) => {
        if(act === type){
            setType('');
        } else {
            setType(act);
            getType(act);
        }
    }

    React.useEffect(()=>{
        console.log(project);
        const getImagePath = async() => {
            try{
                const response = await analyzeProject(project);
                console.log(response);// This should be an ArrayBuffer or Blob

                const blob = new Blob([response], { type: 'image/png' });
                const objURL = URL.createObjectURL(blob);

                setImgURl(objURL);

                setImgPath(blob); 
            } catch (err){
                console.log('unable analyze project', err);
            } finally {
                setLoading(false);
            }
        }

        getImagePath();
    },[]);

    const downloadGraph = () => {
        if (!imagePath) {
          console.error("No image to download.");
          return;
        }
        // saveAs(imagePath, 'ontology_graph');
        const link = document.createElement('a');
        link.href = imgURL;  // This is the Blob URL
        link.download = 'ontology_graph.png';  // Filename for the download
        document.body.appendChild(link);  // Append link to body
        link.click();  // Trigger the download
        document.body.removeChild(link);  // Clean up the link
      };
    

    return (
        <div className="flex flex-col justify-start items-start gap-4 h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px]">
            <HeaderComponent title={"Code Analysis Completed"} subtitle={"Ontology graph representing code relationship has been generated"}/>
            <div className="flex flex-col w-full h-max justify-start items-start gap-1">
                <h1>Click here to download and view the Ontology graph</h1>
                {/* {imgURL && <img src={imgURL} alt="Blob" style={{ width:"200px", height:"auto" }}/>} */}
                <Button variant="text" onClick={()=> downloadGraph()}>Download</Button>
            </div>
            <div className="flex flex-col w-full h-max justify-start items-start gap-2">
                <h1>Select type of coverage to generate requirements</h1>
                <div className="flex flex-row h-max w-full justify-start items-center gap-2">
                    <Chip label="Small" variant={type==='small'? "filled" : "outlined"} onClick={()=>updateAction('small')} style={{ minWidth: '6rem', minHeight: '4rem', backgroundColor: type === 'small' ? '#1f85c8' : 'transparent', color:type === 'small' ? 'white' : 'black' }}/> 
                    <Chip label="Medium" variant={type==='medium'? "filled" : "outlined"} onClick={()=>updateAction('medium')} style={{ minWidth: '6rem', minHeight: '4rem', backgroundColor: type === 'medium' ? '#1f85c8' : 'transparent', color:type === 'medium' ? 'white' : 'black' }}/>
                    <Chip label="Large" variant={type==='large'? "filled" : "outlined"} onClick={()=>updateAction('large')} style={{ minWidth: '6rem', minHeight: '4rem', backgroundColor: type === 'large' ? '#1f85c8' : 'transparent', color:type === 'large' ? 'white' : 'black' }}/>
                </div>
            </div>
            
            <div className="flex flex-row w-full h-max mt-16">
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