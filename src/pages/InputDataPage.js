import React from "react";
import HeaderComponent from "../common_components/HeaderComponent";
import { styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Chip, Button } from "@mui/material";
import CodeEditorComponent from "../common_components/CodeEditorComponent";

// const testAction="test";
const InputDataPage = ({action, data, setData, continueFunction, backFunction}) => {
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
    const [language, setLanguage] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [code, setCode] = React.useState("");

    const handleLanguage = (selection) => {
        if(selection === language){
            setLanguage(null);
            setData({...data, "language": null});
        } else {
            setLanguage(selection);
            setData({...data, "language": selection});
        }
    }

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        setData({...data, "code_file_path": `C:/Users/I7997/Downloads/${event.target.files[0].name}`});
        const reader = new FileReader();
        reader.onload = () => {
            setCode(reader.result);  // Store file content in the state
        };
        reader.readAsText(event.target.files[0]);
    }

    return (
        <div className="flex flex-col justify-start items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px] gap-2">
            <HeaderComponent title="Input Data" subtitle="Please input the data for the selected action"/>
            <div className="flex flex-col mt-4 w-full h-max gap-2">
                <h1>Select Language:</h1>
                <div className="flex flex-row justify-start items-center w-full h-max gap-2">
                    <Chip label="Python" variant={language==='python'? "filled" : "outlined"} color="primary" className="my-2" onClick={()=>handleLanguage('python')} style={{ minWidth: 75 }}/>
                    <Chip label="C" variant={language==='c'? "filled" : "outlined"} color="primary"  className="my-2" onClick={()=>handleLanguage('c')} style={{ minWidth: 75 }}/>
                </div>
            </div>
            {(language && action==="test") && <div className="flex flex-row justify-start mt-4 w-full h-max gap-2">
                {file===null? <Button component="label" role={undefined} variant="contained" startIcon={<CloudUploadIcon/>} style={{ backgroundColor: '#8c44a0'}}>
                    Upload code
                    <VisuallyHiddenInput
                        accept={language==='python'? ".py" : ".c"}
                        type="file"
                        onChange={(event) => handleFileUpload(event)}
                    />
                </Button>
                :
                <Button component="label" role={undefined} variant="outlined"  startIcon={<AssignmentOutlinedIcon/>} style={{ color: '#8c44a0', borderColor: '#8c44a0'}}>
                    {file.name}
                    <VisuallyHiddenInput
                        accept={language==='python'? ".py" : ".c"}
                        type="file"
                        onChange={(event) => handleFileUpload(event)}
                    />
                </Button>}
            </div>}
            {(code!=="") && <CodeEditorComponent label={file.name} value={code}/>}
            <div className="flex flex-row w-full h-max mt-8">
                <Button variant="contained" disabled={language===null} style={{ backgroundColor: '#1c287d', marginRight: '10px'}} onClick={()=>continueFunction()}>
                    Generate
                </Button>   
                <Button variant="contained" style={{ backgroundColor: '#9499a5'}} onClick={()=>backFunction()}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default InputDataPage;