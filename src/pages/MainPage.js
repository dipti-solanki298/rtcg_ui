import React from "react";
import HeaderComponent from "../common_components/HeaderComponent";
import { Chip, Stack, styled } from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import TextfieldComponent from "../common_components/TextfieldComponent";
import { uploadFile } from "../services/api_services";

const MainPage = ({ continueFunction, setProjectName, setLlmType }) => { 
    const VisuallyHiddenInput = styled('input')({
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
    });
    
    const [file, setFile] = React.useState(null);
    const [showRequirements, setShowRequirements] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [llm, setLLM] = React.useState("");
    const [type, setType] = React.useState("");
    const [apiKey, setApiKey] = React.useState("");

    const handleUpload = async (event) => {
        console.log(event.target.files);
        setFile(event.target.files[0]);
        setIsLoading(true);
        try{
            await uploadFile(event.target.files[0]);
            setShowRequirements(true);
            setProjectName(event.target.files[0].name.split('.').slice(0, -1).join('.'));
        } catch {
            console.log("Error in fetching requirements");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTypeChange = (t) => {
        if(t === type){
            setType("");
        } else {
            setType(t);
        }
    }

    const handleLLM = (model) => {
        if(model === llm){
            setLLM("");
        } else {
            setLLM(model);
            setLlmType(model);
        }
    }
     
    const handleReset = () => {
        setFile(null);
        setShowRequirements(false);
    };

    return (
        <div className="flex flex-col justify-start items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px] gap-4">
                    <HeaderComponent title={"Welcome to iCodoc"} subtitle={"Please upload the codebase below"}/>
                    <div className="flex flex-col w-full h-max gap-1">
                        <h1 className="text-sm">Select LLM type: </h1>
                        <Stack direction="row" spacing={2}>
                            <Chip label="Open Source" variant={type==="opensource"? "filled" : "outlined"} color={type==="opensource"? "primary" : "default"} style={{ minWidth: "100px" }} onClick={()=>handleTypeChange("opensource")} clickable/>
                            <Chip label="Paid" variant={type==="paid"? "filled" : "outlined"} color={type==="paid"? "primary" : "default"} style={{ minWidth: "100px" }} onClick={()=>handleTypeChange("paid")} clickable/>
                        </Stack>
                    </div>
                    {
                        type==="opensource" && 
                        <div className="flex flex-col w-full h-max gap-1">
                            <h1 className="text-sm">Select model type: </h1>
                            <Stack direction="row" spacing={2}>
                                <Chip label="CodeStral" variant="default" style={{ minWidth: "100px" }} />
                                <Chip label="Code Llama" variant="default" style={{ minWidth: "100px" }} />
                                <Chip label="CodeQwen" variant={llm==="localhost"? "filled" : "outlined"} color={llm==="localhost"? "secondary" : "default"} style={{ minWidth: "100px" }} onClick={()=>handleLLM("localhost")} clickable/>
                            </Stack>
                        </div>
                    }
                    {
                        type==="paid" && 
                        <div className="flex flex-col w-full h-max gap-1">
                            <h1 className="text-sm">Select model type: </h1>
                            <Stack direction="row" spacing={2}>
                                <Chip label="OpenAI" variant={llm==="openai"? "filled" : "outlined"} color={llm==="openai"? "secondary" : "default"} style={{ minWidth: "100px" }} onClick={()=>handleLLM("openai")} clickable/>
                                <Chip label="Claude" variant="default" style={{ minWidth: "100px" }} />
                            </Stack>
                        </div>
                    }
                    {
                        type==="paid" &&  
                        <div className="flex flex-col w-full h-max gap-1">
                            <h1 className="text-sm">API key: </h1>
                            <TextfieldComponent value={apiKey} onChangeFunction={setApiKey} type="password"/>
                        </div>
                    }
                    <div className="flex flex-col justify-center items-center w-full h-60 border border-1 border-dashed rounded-md" style={{ borderColor: "#01014f", backgroundColor: "#ebebfa" }}>
                        <div className="flex flex-col w-full h-max justify-center items-center">
                            {file===null?
                            <div className="flex flex-col w-full h-max justify-center items-center gap-2">
                                <FolderZipOutlinedIcon color="#b3b3ba" style={{ color: "#8b8b94", fontSize: 48}}/>
                                <h1 style={{ color: "#8b8b94" }}>Upload the codebase as .zip here</h1>
                                <Button component="label" role={undefined} variant="contained" startIcon={<CloudUploadIcon/>} style={{ backgroundColor: '#1c287d'}}>
                                    Upload File
                                    <VisuallyHiddenInput
                                        accept=".zip"
                                        type="file"
                                        onChange={(event) => handleUpload(event)}
                                    />
                                </Button>
                            </div>  
                            :
                            <Button component="label" role={undefined} variant="outlined" startIcon={<AssignmentOutlinedIcon/>} style={{ color: '#2a4fa7', borderColor: '#2a4fa7'}} disabled>
                                {file.name}
                            </Button>}
                        </div>
                    </div>
                    {showRequirements && <div className="flex flex-col w-full h-max mt-2">
                        <div className="flex flex-row w-full h-max mt-4">
                            <Button variant="contained" style={{ backgroundColor: '#1c287d', marginRight: '10px'}} onClick={()=>continueFunction()}>
                                Analyze Code
                            </Button>   
                            <Button variant="contained" style={{ backgroundColor: '#9499a5'}} onClick={()=>handleReset()}>
                                Reset
                            </Button>
                        </div>
                    </div>}
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
    )
};

export default MainPage;