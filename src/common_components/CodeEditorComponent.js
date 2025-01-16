import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror'; 
import IconButton from '@mui/material/IconButton'; 
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const CodeEditorComponent = ({ label="Code Editor", value, valueChangeFunction, isOutput=false, readOnly=false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(value);
  const handleCodeChange = (value) => {
    setCode(value);
    valueChangeFunction(value);
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className='flex flex-col justify-start items-start w-full h-max mt-2 border border-1 border-black rounded-md' style={{ overflow: 'auto' }}>
        <div className='flex flex-row justify-between items-center w-full h-max p-2 px-4' style={{ borderBottom: '1px solid black' }}>
            <h1>{label}</h1>
            {
                isOutput && <div className='flex flex-box px-2 py-1 rounded-md' style={{ backgroundColor: "#ccf0d1" }}> <h1 style={{ color: "#026611"}}>Completed</h1> </div>
            }
            {!readOnly && <IconButton onClick={toggleEdit}>
                {isEditing ? <SaveIcon/> : <EditIcon/>}
            </IconButton>}
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
                  options={{
                      mode: 'python',
                      theme: 'light',
                      lineNumbers: true,
                  }}
            />
          </div>
        </div>
    </div>
  );
};

export default CodeEditorComponent;
