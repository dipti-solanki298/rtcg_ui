import React from "react";
import NavBarComponenet from "../common_components/NavBarComponent";
import MainPage from "./MainPage";
import SelectActionPage from "./SelectActionPage";
import InputDataPage from "./InputDataPage";
import ResultPage from "./ResultPage";
import GeneratedTestCasesPage from "./GeneratedTestCasesPage";


const HomePage = () => { 
    const [step, setStep] = React.useState(0);
    const [llmChoice, setLlmChoice] = React.useState("openai");
    const [projectName, setProjectName] = React.useState("");
    const [documentList, setDocumentList] = React.useState([]);
    const [metaDocumentation, setMetaDocumentation] = React.useState(""); 
    const [scenarioList, setScenarioList] = React.useState([]);

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
                return <MainPage continueFunction={handleContinue} setLlmType={setLlmChoice} setProjectName={setProjectName}/>;
            case 1:
                return <SelectActionPage continueFunction={handleContinue} backFunction={handleBack} project={projectName} llmChoice={llmChoice} getDocumentsList={setDocumentList} getMetaDocumentation={setMetaDocumentation}/>;
            case 2:
                return <GeneratedTestCasesPage documentList={documentList} selectedLLM={llmChoice} getScenarioList={setScenarioList} continueFunction={handleContinue} handleBack={handleBack}/>
            case 3:
                return <InputDataPage generatedScenarios={scenarioList} selectedLLM={llmChoice} continueFunction={handleContinue} backFunction={handleBack}/>;
            case 4:
                return <ResultPage selectedLLM={llmChoice} metaDocs={metaDocumentation} doneFunction={handleCancel} backFunction={handleBack}/>;
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