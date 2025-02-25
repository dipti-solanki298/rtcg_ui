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
    const [lang, setLang] = React.useState("");
    const [documentList, setDocumentList] = React.useState([]);
    const [metaDocumentation, setMetaDocumentation] = React.useState(""); 
    const [scenarioList, setScenarioList] = React.useState([]);
    const labels = ['Upload Codebase', 'UML Diagram', 'Test Scenarios', 'User Stories', 'Requirements Document'];

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
                return <MainPage continueFunction={handleContinue} setLlmType={setLlmChoice} setProjectName={setProjectName} getlang={setLang}/>;
            case 1:
                return <SelectActionPage continueFunction={handleContinue} backFunction={handleBack} project={projectName} llmChoice={llmChoice} language={lang} getDocumentsList={setDocumentList} getMetaDocumentation={setMetaDocumentation}/>;
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

    const getBackground = (s, step) => {
        if (s < step) {
            return { backgroundColor: '#8c44a0' };  // Dark purple for completed steps
        } else if (s > step) {
            return { backgroundColor: '#b9bfc2' }; // Light gray for upcoming steps
        } else {
            return { backgroundImage: 'linear-gradient(to right, #8c44a0, #f6f5f4)' }; // Gradient for the current step
        }
    };

    return (
        <>
            <NavBarComponenet/>
            <div className="h-full w-full">
            <div className="flex flex-row mx-16 mt-24 gap-1">
                {labels.map((label, index) => { // Step is the index + 1 to match the label's step number
                    const bgColor = getBackground(index, step); // Get the background color for each container

                    return (
                    <div key={index} className="flex flex-col w-full h-max items-center">
                        <div className="w-[100%] h-5 gap-2 border border-1 rounded-md" style={bgColor}/> {/* Apply dynamic background */}
                        <p className="mt-1 text-center">{label}</p> {/* Label displayed below the container */}
                    </div>
                    );
                })}
            </div>
            {getPageDesign()}
            </div>
        </>
        
    );
}

export default HomePage;