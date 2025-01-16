import React from "react";
import HeaderComponent from "../common_components/HeaderComponent";
import { styled } from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { getRequirementIds } from "../services/api_services";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const columns = [
    { field: 'id', headerName: 'Requirement ID', width: 150 },
    { field: 'name', headerName: 'Requirement Description', width: 150, flex: 1 },
  ];

const MainPage = ({ continueFunction, data, setData }) => { 
    const VisuallyHiddenInput = styled('input')({
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
    });
    
    const [file, setFile] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [showRequirements, setShowRequirements] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleUpload = async (event) => {
        console.log(event.target.files);
        setFile(event.target.files[0]);
        setIsLoading(true);
        try{
            const response = await getRequirementIds(event.target.files[0].name);
            setRows(Object.keys(response).map((key) => ({
                id: key,
                name: response[key].Description,
            })));
            setShowRequirements(true);
            setData({...data, "file_path": `C:/Users/I7997/Downloads/${event.target.files[0].name}`});
        } catch {
            console.log("Error in fetching requirements");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectionChange = (selectionModal) => {
        setData({...data, "requirement_id": selectionModal});
        // console.log(selectionModal);
    };

    const handleReset = () => {
        setFile(null);
        setShowRequirements(false);
    };

    return (
        <div className="flex flex-col justify-start items-start h-[80%] w-[80%] m-auto mt-24 border border-1 border-black rounded-md p-4 min-h-[500px] gap-4">
                    <HeaderComponent title={"Welcome to R2CG"} subtitle={"Please upload the requirements document"}/>
                    <div className="mt-4 w-full h-max">
                        {file===null? <Button component="label" role={undefined} variant="contained" fullWidth startIcon={<CloudUploadIcon/>} style={{ backgroundColor: '#2a4fa7'}}>
                            Upload File
                            <VisuallyHiddenInput
                                accept=".pdf"
                                type="file"
                                onChange={(event) => handleUpload(event)}
                            />
                        </Button>
                        :
                        <Button component="label" role={undefined} variant="outlined" fullWidth startIcon={<AssignmentOutlinedIcon/>} style={{ color: '#2a4fa7', borderColor: '#2a4fa7'}} disabled>
                            {file.name}
                        </Button>}
                    </div>
                    {showRequirements && <div className="flex flex-col w-full h-max mt-4">
                        <h1 className="text-lg font-semibold mt-4">
                            Requirements found in the document
                        </h1>    
                        <div className="flex flex-box w-full mt-2 h-52">
                            <DataGrid rows={rows} columns={columns} pageSize={5} onRowSelectionModelChange={handleSelectionChange} checkboxSelection disableRowSelectionOnClick/>
                        </div>
                        <div className="flex flex-row w-full h-max mt-4">
                            <Button variant="contained" style={{ backgroundColor: '#1c287d', marginRight: '10px'}} onClick={()=>continueFunction()}>
                                Continue
                            </Button>   
                            <Button variant="contained" style={{ backgroundColor: '#9499a5'}} onClick={()=>handleReset()}>
                                Reset
                            </Button>
                        </div>
                    </div>}
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
    )
};

export default MainPage;