import React from "react";
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import Button from '@mui/material/Button';
import HeaderComponent from "../common_components/HeaderComponent";

const SelectActionPage = ({ continueFunction, backFunction, act, setAct }) => {

    const [action, setAction] = React.useState(act ?? null);

    const updateAction = (selection) => {
        if(selection === action){
            setAction(null);
            setAct(null);
        } else {
            setAction(selection);
            setAct(selection);
        }
    }

    return (
        <div className="flex flex-col justify-between items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px]">
            <HeaderComponent title={"Select Action"} subtitle={"Please select the action you want to perform"}/>
            <div className="flex flex-row justify-start items-center w-full h-max mt-8 ml-4">
                <div className="flex flex-col justify-evenly items-center w-40 h-32 border border-2 rounded-md p-4 mr-4 cursor-pointer" style={{borderColor: '#1f85c8', backgroundColor: action === 'code'? '#1f85c8' : 'white'}} onClick={()=>updateAction('code')}>
                    <CodeIcon style={{fontSize: '2rem', color: action === 'code'? 'white' : '#1f85c8' }}/>
                    <h1 className="font-semibold text-center" style={{ color: action === 'code'? 'white' : '#1f85c8' }}>Generate Code</h1>
                </div>
                <div className="flex flex-col justify-evenly items-center w-40 h-32 border border-2 rounded-md p-4 cursor-pointer" style={{borderColor: '#1f85c8', backgroundColor: action === 'test'? '#1f85c8' : 'white'}} onClick={()=>updateAction('test')}>
                    <BugReportIcon style={{fontSize: '2rem', color: action === 'test'? 'white' : '#1f85c8' }}/>
                    <h1 className="font-semibold text-center" style={{ color: action === 'test'? 'white' : '#1f85c8' }}>Generate Test Code</h1>
                </div>
            </div>
            <div className="flex flex-row w-full h-max mt-8">
                <Button variant="contained" disabled={action===null} style={{ backgroundColor: '#1c287d', marginRight: '10px'}} onClick={()=>continueFunction()}>
                    Continue
                </Button>   
                <Button variant="contained" style={{ backgroundColor: '#9499a5'}} onClick={()=>backFunction()}>
                    Back
                </Button>
            </div>
        </div>
    );
}

export default SelectActionPage;