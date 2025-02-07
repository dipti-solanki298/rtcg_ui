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