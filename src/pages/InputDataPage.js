import React from "react";
import HeaderComponent from "../common_components/HeaderComponent";
import { Button, Box, CircularProgress, Backdrop } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { generateUserStories } from "../services/api_services";
import DialogComponent from "../common_components/DialogComponent";

const columns = [
    { field: 'task_id', headerName: 'Story ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    {
        field: 'story_explanation',
        headerName: 'Story Explanation',
        width: 300,
        editable: true,
        renderCell: (params) => (
          <div className="flex flex-box h-max overflow-auto whitespace-normal break-words">{params.value}</div>
        ),
        // Custom styling to ensure text wrapping
        headerClassName: 'font-bold',
      },
      { field: "preconditions",
        headerName: "Preconditions",
        width: 300, 
        renderCell: (params) => {
          const items = Array.isArray(params.value) 
          ? params.value.map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
          )) 
          : params.value.split('\n').map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
          ));
  
          return <ul className="list-inside list-disc">{items}</ul>;
        },
      },
      { field: "steps", 
        headerName: "Test Steps", 
        width: 350,
        renderCell: (params) => {
          const items = Array.isArray(params.value) 
          ? params.value.map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
          )) 
          : params.value.split('\n').map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
          ));
  
          return <ul className="list-inside list-disc">{items}</ul>;
          },
      },
      { field: "expected_result", headerName: "Expected Result", width: 300 },
      { field: "edge_cases", 
        headerName: "Edge Cases", 
        width: 300,
        renderCell: (params) => {
          const items = Array.isArray(params.value) 
          ? params.value.map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
          )) 
          : params.value.split('\n').map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
          ));
  
          return <ul className="list-inside list-disc">{items}</ul>;
        },
      },
    //   {
    //     field: 'acceptance_criteria',
    //     headerName: 'Acceptance Criteria',
    //     width: 400,
    //     flex: 1,
    //     renderCell: (params) => {
    //         const items = Array.isArray(params.value) 
    //         ? params.value.map((item, index) => (
    //             <li key={index} className="ml-4">{item}</li>
    //         )) 
    //         : params.value.split('\n').map((item, index) => (
    //             <li key={index} className="ml-4">{item}</li>
    //         ));

    //         return <ul className="list-inside">{items}</ul>;
    //     },
    //     headerClassName: 'font-bold',
    //   },
  ];
  
// const rows = [
//     {
//       id: 1757,
//       task_id: 1757,
//       title: 'Restrict Access to Sensitive Endpoints',
//       story_explanation:
//         'As a security officer, I want the system to restrict access to sensitive endpoints and data through authentication and authorization mechanisms so that only authorized users can access critical system functions.',
//       acceptance_criteria:
//         '- Sensitive endpoints require user authentication for access.\n- Authorization levels determine access to specific system functions.\n- Access attempts are logged for auditing purposes.\n- The system supports multi-factor authentication for enhanced security.',
//     },
//     {
//       id: 6412,
//       task_id: 6412,
//       title: 'Monitor Logs for Suspicious Activities',
//       story_explanation:
//         'As a security officer, I want the system to continuously monitor logs for suspicious activities and implement alerting mechanisms so that potential security breaches are detected and addressed promptly.',
//       acceptance_criteria:
//         '- The system analyzes logs in real-time for suspicious patterns.\n- Alerts are generated for activities that deviate from normal behavior.\n- Security personnel are notified immediately of potential threats.\n- Logs are stored securely for future forensic analysis.',
//     },
// ];
const InputDataPage = ({generatedScenarios, selectedLLM, continueFunction, backFunction}) => {
    const [isLoading, setLoading] = React.useState(true);
    const [rows, setRows] = React.useState({});
    const [dial, setDial] = React.useState(false);

    React.useEffect(()=>{
        const getRequirements = async () => {
            try{
                const response = await generateUserStories(generatedScenarios, selectedLLM);
                const rowsWithIds = response.list_of_user_stories.map((row, index) => ({
                    id: index, // Unique identifier for each row (you can replace `index` with a unique ID if available)
                    task_id: row.serial_number, // Mapping serial number to 'task_id' field
                    title: row.title, // Mapping the 'title' from the data to the grid column
                    story_explanation: row.story_explanation, // Mapping the explanation to the grid column
                    preconditions: row.acceptance_criteria[0]?.preconditions || [], // Extract preconditions from the acceptance criteria
                    steps: row.acceptance_criteria[0]?.steps || [], // Extract steps from the acceptance criteria
                    expected_result: row.acceptance_criteria[0]?.expected_result || '', // Extract expected result from the acceptance criteria
                    edge_cases: row.acceptance_criteria[0]?.edge_cases || [], // Extract edge cases from the acceptance criteria
                  }));
                setRows(rowsWithIds);
            } catch (error) {
                console.log("Unable to fetch user stories", error);
            } finally {
                setLoading(false);
            }
        }

        getRequirements();
    },[]);

    const handleDownload = () => {
        const escapeCsvValue = value => {
            const stringValue = String(value); 

            if (Array.isArray(value)) {
                return `"${value.join(',')}"`; 
            }
            if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
                return `"${stringValue.replace(/"/g, '""')}"`; 
            }
            return stringValue;
        };
        const csvRows = [];
        const headers = columns.map(col => col.headerName);
        csvRows.push(headers.join(','));
    
        rows.forEach(row => {
            const rowValues = columns.map(col => escapeCsvValue(row[col.field]));
            csvRows.push(rowValues.join(','));
        });
    
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'user_stories.csv';
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
        <div className="flex flex-col justify-start items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px] gap-2">
                <HeaderComponent title="Generated User Stories" subtitle="User stories generated based on test scenarios are listed below."/>
            <Box sx={{ height: "100%", width: '100%' }}>
                <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick={true}   // Disable row selection on click
                                checkboxSelection={false}        // Disable checkbox selection
                                disableColumnMenu={true}         // Disable column menu (sorting, filtering)
                                disableColumnFilter={true}       // Disable column filter
                                disableColumnSelector={true}     // Disable column selector
                                hideFooterSelectedRowCount={true}
                                getRowHeight={() => 'auto'}  // Hide footer selected row count
                                />
            </Box>
            <div className="flex flex-row w-full justify-between items-center h-max mt-2">
            <div className="flex flex-row w-max justify-start items-center h-max gap-2">
                <Button variant="contained" onClick={handleContinue} style={{ backgroundColor: '#1c287d', marginRight: '10px', marginTop: '4px' }}>
                    Generate Requirements Document
                </Button>
                <Button variant="contained" onClick={backFunction} style={{ backgroundColor: '#9499a5', marginRight: '10px', marginTop: '4px' }}>
                    Back
                </Button>
            </div>
            <Button variant="text" onClick={handleDownload} startIcon={<SaveAltIcon/>}>Download</Button>
          </div>
          <DialogComponent open={dial} closeFunction={handleClose} proceedFunction={getFeedBack}/>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default InputDataPage;