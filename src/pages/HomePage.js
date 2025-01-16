import React from "react";
import NavBarComponenet from "../common_components/NavBarComponent";
import MainPage from "./MainPage";
import SelectActionPage from "./SelectActionPage";
import InputDataPage from "./InputDataPage";
import ResultPage from "./ResultPage";


const HomePage = () => { 
    const [step, setStep] = React.useState(0);
    const [data, setData] = React.useState({"file_path": null, "requirement_id": [], "code_file_path": null ,"language": null});
    const [action, setAction] = React.useState(null);

    const handleContinue = () => {
        if(step < 4){
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
                return <MainPage continueFunction={handleContinue} data={data} setData={setData}/>;
            case 1:
                return <SelectActionPage continueFunction={handleContinue} backFunction={handleBack} act={action} setAct={setAction}/>;
            case 2:
                return <InputDataPage action={action} data={data} setData={setData} continueFunction={handleContinue} backFunction={handleBack}/>;
            case 3:
                return <ResultPage action={action} data={data} handleReset={handleCancel}/>;
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