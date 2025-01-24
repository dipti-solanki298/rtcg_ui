/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import HeaderComponent from "../common_components/HeaderComponent";
import CodeEditorComponent from "../common_components/CodeEditorComponent";
import { Button, CircularProgress } from "@mui/material";
import { generateCode, logCode, generateTestCode } from "../services/api_services";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CheckCircle, Cancel } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ResultPage = ({data, action, handleReset}) => {
    const [codeLog, setCodeLog] = React.useState({"actual_code": "", "modified_code": "", "feedback": ""});
    const [output, setOutput] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFeedback = (response) => {
        setCodeLog({...codeLog, "feedback": response});
        setOpen(false);
        console.log(`Feedback received: ${response}`);
        setIsLoading(true);
        const logData = async() => {  
            try{
                await logCode(codeLog);
                handleReset();
            } catch (error) {
                console.error(error);  
            } finally {
                setIsLoading(false);
            }
        }
        logData();  
      };
    

    React.useEffect(() => {
        const generateOutput = async () => {
            try{
                let response;
                if(action === "test"){
                    response = await generateTestCode(data);
                    setCodeLog({...codeLog, "actual_code":response.generated_testcase});
                    setOutput(response.generated_testcase);
                } else {
                    response = await generateCode(data);
                    setCodeLog({...codeLog, "actual_code":response.generated_code});
                    setOutput(response.generated_code);
                }
                
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        generateOutput();
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
        link.download = action==="test"? 'test_generated_output.py' : 'generated_output.py';
        link.click();
    };


    return (
    <div className="flex flex-col justify-evenly items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px]">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <CircularProgress />
          {!output && <h1>Generating results, this may take a few seconds...</h1>}
        </div>
      ) : (
        <>
          <HeaderComponent title={'Output Generated'} subtitle={'The output has been generated successfully'} />
          <CodeEditorComponent isOutput={true} label="Result Generated" value={output} valueChangeFunction={handleCodeChange} />
          <div className="flex flex-row w-full justify-between items-center h-max mt-2">
            <Button variant="contained" onClick={()=>handleOpen()} style={{ backgroundColor: '#1c287d', marginRight: '10px', marginTop: '4px' }}>
                Done
            </Button>
            <Button variant="text" onClick={handleDownload} startIcon={<SaveAltIcon/>}>Download</Button>
            <Dialog open={open} onClose={handleClose} disableBackdropClick={true} disableEscapeKeyDown={true}>
                <DialogTitle className="font-semibold">Feedback</DialogTitle>
                <DialogContent>
                <p>Please provide feedback for the generated output</p>
                </DialogContent>
                <DialogActions className="justify-center" style={{ justifyContent: "center", marginBottom: "12px" }}>
                {/* Accept Button */}
                <Button
                    onClick={() => handleFeedback("Accept")}
                    color="success"
                    variant="text"
                    startIcon={<CheckCircle />}
                >
                    Accept
                </Button>
                
                {/* Reject Button */}
                <Button
                    onClick={() => handleFeedback("Reject")}
                    color="error"
                    variant="text"
                    startIcon={<Cancel />}
                >
                    Reject
                </Button>
                </DialogActions>
            </Dialog>
          </div>
          
        </>
      )}
    </div>
    );
}

export default ResultPage;