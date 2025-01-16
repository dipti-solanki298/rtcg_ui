/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import HeaderComponent from "../common_components/HeaderComponent";
import CodeEditorComponent from "../common_components/CodeEditorComponent";
import { Button, CircularProgress } from "@mui/material";
import { generateCode, logCode, generateTestCode } from "../services/api_services";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const ResultPage = ({data, action, handleReset}) => {
    const [codeLog, setCodeLog] = React.useState({"actual_code": "", "modified_code": ""});
    const [output, setOutput] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

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
        link.download = 'generated_output.py';
        link.click();
    };

    const handleDone = () => {
        setIsLoading(true);
        const logData = async() => {  
            try{
                await logCode(codeLog);
            } catch (error) {
                console.error(error);  
            } finally {
                setIsLoading(false);
            }
        }
        logData();
        handleReset();
    }

    return (
    <div className="flex flex-col justify-evenly items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <CircularProgress />
        </div>
      ) : (
        <>
          <HeaderComponent title={'Output Generated'} subtitle={'The output has been generated successfully'} />
          <CodeEditorComponent isOutput={true} label="Result Generated" value={output} valueChangeFunction={handleCodeChange} />
          <div className="flex flex-row w-full justify-between items-center h-max mt-2">
            <Button variant="contained" onClick={()=>handleDone()} style={{ backgroundColor: '#1c287d', marginRight: '10px', marginTop: '4px' }}>
                Done
            </Button>
            <Button variant="text" onClick={handleDownload} startIcon={<SaveAltIcon/>}>Download</Button>
          </div>
          
        </>
      )}
    </div>
    );
}

export default ResultPage;