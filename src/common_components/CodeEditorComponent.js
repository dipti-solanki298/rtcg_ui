import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror'; 
import IconButton from '@mui/material/IconButton'; 
import Snackbar  from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { EditorView } from '@codemirror/view';
import { compileCode } from '../services/api_services';

const CodeEditorComponent = ({ label="Code Editor", value, valueChangeFunction, isOutput=false, readOnly=false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(value);
  const [opflag, setOpflag] = useState(false);
  const [errflag, setErrflag] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const errorPattern = /File "([^"]+)", line (\d+)\n\s*(.*)\n\s*\^+\n([a-zA-Z]+Error): (.*)\n/;

  const handleCodeChange = (value) => {
    setCode(value);
    valueChangeFunction(value);
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const parseError = (error) => {
    const match = error.match(errorPattern);
    if (match) {
      setError(
        {
          line: parseInt(match[2], 10), // Line number
          problematicCode: match[3].trim(), // The problematic code
          errorType: match[4], // Error type (e.g., SyntaxError)
          errorDescription: match[5], // Detailed error message
        }
      );
      setErrflag(true);
    };
  };

 
  return (
    <div className='flex flex-col justify-start items-start w-full h-max mt-2 border border-1 border-black rounded-md' style={{ overflow: 'auto' }}>
        <div className='flex flex-row justify-between items-center w-full h-max p-2 px-4' style={{ borderBottom: '1px solid black' }}>
            <h1>{label}</h1>
            {
                isOutput && <div className='flex flex-box px-2 py-1 rounded-md' style={{ backgroundColor: "#ccf0d1" }}> <h1 style={{ color: "#026611"}}>Completed</h1> </div>
            }
            <div className='flex flex-row gap-2'>
              {!readOnly && <IconButton onClick={toggleEdit}>
                {isEditing ? <SaveIcon/> : <EditIcon/>}
              </IconButton>}
            </div>
        </div>
        <div className='flex w-full overflow-hidden'>
          <div className='flex-grow'>
          <CodeMirror 
                  value={code}
                  height='300px'
                  lineWrapping={true}
                  overflow='auto'
                  width='100%'
                  onChange={(val) => handleCodeChange(val)}
                  editable={readOnly ? false : isEditing}
                  extensions={[ EditorView.lineWrapping]}
                  theme={"light"}
            />
          </div>
        </div>
        <Snackbar open={opflag} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <div className='flex flex-col justify-start items-start w-[300px] opacity-50 h-max p-1 pl-4 rounded-md border border-1 shadow-md' style={{ backgroundColor: "#ccf0d1", borderColor: "#09e327" }}>
              <div className='flex flex-row justify-between items-center w-full h-max'>
                <h1 className='text-base font-semibold' style={{ color: "#02470c" }}>Code Compiled Successfully!</h1>
                <IconButton onClick={()=>setOpflag(false)}>
                  <CloseIcon/>
                </IconButton>
              </div>
              <p className='text-sm font-thin mb-2' style={{ color: "#02470c" }}>
                <span className='font-semibold'>Output:</span> {output}
              </p>
            </div>
        </Snackbar>
        <Snackbar open={errflag} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <div className='flex flex-col justify-start items-start w-[300px] opacity-50 h-max p-1 pl-4 rounded-md border border-1 shadow-md' style={{ backgroundColor: "#f0cccf", borderColor: "#e30909" }}>
                <div className='flex flex-row justify-between items-center w-full h-max'>
                  <h1 className='text-base font-semibold' style={{ color: "#700c02" }}>Compilation Error!</h1>
                  <IconButton onClick={()=>setErrflag(false)}>
                    <CloseIcon/>
                  </IconButton>
                </div>
                <p className='text-sm font-thin mb-2' style={{ color: "#700c02" }}>
                  <span className='font-semibold'>Error Type:</span> {error.errorType} <br/>
                  <span className='font-semibold'>Line:</span> {error.line} <br/>
                  <span className='font-semibold'>Problematic Code:</span> <br/> {error.problematicCode} <br/>
                  <span className='font-semibold'>Error Description:</span> {error.errorDescription}
                </p>
          </div>
        </Snackbar>
    </div>
  );
};

export default CodeEditorComponent;
