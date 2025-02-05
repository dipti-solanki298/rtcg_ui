/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import HeaderComponent from "../common_components/HeaderComponent";
import CodeEditorComponent from "../common_components/CodeEditorComponent";
import { Button, CircularProgress } from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { generateDocs } from "../services/api_services";
import DialogComponent from "../common_components/DialogComponent";



const ResultPage = ({project, type, continueFunction, backFunction, getOutput}) => {
    const [codeLog, setCodeLog] = React.useState({"actual_code": "", "modified_code": "", "feedback": ""});
    const [output, setOutput] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dial, setDial] = React.useState(false);

    React.useEffect(() => {
        const getRequirement = async () => {
            try{
                // const response = await generateDocs(type, project);
                setOutput("");
                getOutput("");
            } catch (err) {
                console.log('Unexpected Error Occurred', err);
            } finally {
                setIsLoading(false);
            }
        }
        getRequirement();
        console.log("placeholder");
    }, []);

    const handleCodeChange = (code) => {
        setOutput(code);
        if(code !== codeLog.actual_code){
            setCodeLog({...codeLog, "modified_code": code});
        } 
    }

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'srs_doc.rtf';
        link.click();
    };

    const handleClose = () => setDial(false);

    const handleContinue = () => {
        setDial(true);
    }

    const getFeedBack = (feedback) => {
        setDial(false);
        continueFunction();
    }

    return (
    <div className="flex flex-col justify-evenly items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px]">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <CircularProgress />
          {!output && <h1>Generating results, this may take a few seconds...</h1>}
        </div>
      ) : (
        <>
          <HeaderComponent title={'Generated Requirements'} subtitle={'Based on the provided codebase the SRS document is generated'} />
          <CodeEditorComponent isOutput={true} label="Requirements Document Generated" value={output} valueChangeFunction={handleCodeChange} />
          <div className="flex flex-row w-full justify-between items-center h-max mt-2">
            <div className="flex flex-row w-max justify-start items-center h-max gap-2">
                <Button variant="contained" onClick={()=>handleContinue()} style={{ backgroundColor: '#1c287d', marginRight: '10px', marginTop: '4px' }}>
                    Generate User Stories
                </Button>
                <Button variant="contained" onClick={()=>backFunction()} style={{ backgroundColor: '#9499a5', marginRight: '10px', marginTop: '4px' }}>
                    Back
                </Button>
            </div>
            <Button variant="text" onClick={handleDownload} startIcon={<SaveAltIcon/>}>Download</Button>
          </div>
          <DialogComponent open={dial} closeFunction={handleClose} proceedFunction={getFeedBack}/>
        </>
      )}
    </div>
    );
}

export default ResultPage;