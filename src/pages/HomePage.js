import React from "react";
import NavBarComponenet from "../common_components/NavBarComponent";
import MainPage from "./MainPage";
import SelectActionPage from "./SelectActionPage";
import InputDataPage from "./InputDataPage";
import ResultPage from "./ResultPage";
import GeneratedTestCasesPage from "./GeneratedTestCasesPage";


const HomePage = () => { 
    const [step, setStep] = React.useState(0);
    const [data, setData] = React.useState({"file_path": null, "requirement_id": [], "code_file_path": null ,"language": null});
    const [requirements, setRequirements] = React.useState("");
    const [projectName, setProjectName] = React.useState("");
    const [coverage, setCoverage] = React.useState('large');
    const [userStories, setUserStories] = React.useState([]);

    const handleContinue = () => {
        if(step < 5){
            setStep(step+1);
        }
    };

    const handleBack = () => {
        if(step > 0){
            setStep(step-1);
        }
    }

    const handleCancel = () => {
        setStep(0);
    }

    const getPageDesign = () => {
        switch(step){
            case 0:
                return <MainPage continueFunction={handleContinue} projectName={projectName} setProjectName={setProjectName}/>;
            case 1:
                return <SelectActionPage continueFunction={handleContinue} backFunction={handleBack} project={projectName} getType={setCoverage}/>;
            case 2:
                return <ResultPage project={projectName} type={coverage} continueFunction={handleContinue} backFunction={handleBack} getOutput={setRequirements}/>;
            case 3:
                return <InputDataPage requirements={requirements} setStories={setUserStories} continueFunction={handleContinue} backFunction={handleBack}/>;
            case 4:
                return <GeneratedTestCasesPage selectedStories={userStories} handleDone={handleCancel} handleBack={handleBack}/>
            default:
                return <h1>Page Not Found</h1>;
        }
    }

    return (
        <>
            <NavBarComponenet/>
            <div className="h-full w-full">
                {getPageDesign()}
            </div>
        </>
        
    );
}

export default HomePage;