import React from "react";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import HeaderComponent from "../common_components/HeaderComponent";
import { generateTestCases } from "../services/api_services";
import DialogComponent from "../common_components/DialogComponent";

const columns = [
    { field: "task_id", headerName: "Task ID", width: 150 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "scenario_name", headerName: "Scenario Name", width: 200 },
    { field: "description", headerName: "Description", width: 350 },
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
    { field: "test_steps", 
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
  ];
  
//   const rows = [
//     {
//       id: 1,
//       task_id: 1942,
//       title: "Extract Requirement Details by ID from PDF",
//       scenario_name: "Valid Requirement ID Extraction",
//       description: "Verify that the system correctly extracts requirement details when a valid ID is provided.",
//       preconditions: "A PDF document containing requirements with known IDs is available.",
//       test_steps: "1. Input a valid requirement ID into the system.",
//       expected_result: "The system returns a list containing a dictionary with the details of the specified requirement.",
//       edge_cases: "- Requirement ID is located at the beginning, middle, or end of the document.",
//     },
//     {
//       id: 2,
//       task_id: 1942,
//       title: "Extract Requirement Details by ID from PDF",
//       scenario_name: "Multiple Valid ID Extraction",
//       description: "Verify that the system can extract details for multiple valid IDs simultaneously.",
//       preconditions: "A PDF document containing multiple requirements with known IDs is available.",
//       test_steps: "1. Input a list of multiple valid requirement IDs into the system.",
//       expected_result: "The system returns a list of dictionaries, each containing the details of the specified requirements.",
//       edge_cases: "- IDs are non-sequential or scattered throughout the document.",
//     },
//     {
//       id: 3,
//       task_id: 1942,
//       title: "Extract Requirement Details by ID from PDF",
//       scenario_name: "Invalid Requirement ID Handling",
//       description: "Verify that the system handles invalid requirement IDs gracefully.",
//       preconditions: "A PDF document is available.",
//       test_steps: "1. Input an invalid requirement ID into the system.",
//       expected_result: "The system returns an empty list or an error message indicating that no details were found for the specified ID.",
//       edge_cases: "- ID format is incorrect (e.g., special characters, too short/long).",
//     },
//     // Add the rest of the data here
//   ];
  

const GeneratedTestCasesPage = ({selectedStories, handleDone, handleBack}) => {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [dial, setDial] = React.useState(false);

    React.useEffect(()=>{
        const getTestCases = async () => {
            try{
                console.log(selectedStories);
                const response = await generateTestCases(selectedStories);
                const rowsWithIds = response.data.map((row, index) => ({
                    ...row,
                    id: index, // You can use index, or generate a unique id with a library
                  }));
                setRows(rowsWithIds);
            } catch (error) {
                console.log("Unable to generate test cases", error);
            } finally {
                setLoading(false)
            }
        }
        getTestCases();
    }, []);

    const handleDownload = () => {
        const csvRows = [];
        const headers = columns.map(col => col.headerName);
        csvRows.push(headers.join(','));
    
        rows.forEach(row => {
            const rowValues = columns.map(col => row[col.field]);
            csvRows.push(rowValues.join(','));
        });
    
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'test_cases.csv';
        link.click();
    };
    
    const handleClose = () => setDial(false);

    const handleContinue = () => {
        setDial(true);
    }

    const getFeedBack = (feedback) => {
        setDial(false);
        handleDone();
    }

    return (
        <div className="flex flex-col justify-start items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px] gap-2">
            <HeaderComponent title="Generated Test Cases" subtitle="Test cases for the selected user stories are listed below"/>
            <div className="flex flex-box w-full h-max bg-white rounded-lg p-2 shadow-md">
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
            </div>
            <div className="flex flex-row w-full justify-between items-center h-max mt-2">
            <div className="flex flex-row w-max justify-start items-center h-max gap-2">
                <Button variant="contained" onClick={handleContinue} style={{ backgroundColor: '#1c287d', marginRight: '10px', marginTop: '4px' }}>
                    Done
                </Button>
                <Button variant="contained" onClick={handleBack} style={{ backgroundColor: '#9499a5', marginRight: '10px', marginTop: '4px' }}>
                    Back
                </Button>
            </div>
            <Button variant="text" onClick={handleDownload} startIcon={<SaveAltIcon/>}>Download</Button>
          </div>
          <DialogComponent open={dial} closeFunction={handleClose} proceedFunction={getFeedBack}/>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default GeneratedTestCasesPage;