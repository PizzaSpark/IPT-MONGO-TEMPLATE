import { React, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Modal,
    Box,
    Table,
    TableContainer,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

function Manage() {
    const [dataList, setDataList] = useState([]);
    const [refreshDataList, setRefreshDataList] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const initialData = {
        id: "",
        firstname: "",
        year: "",
    };

    const [currentData, setCurrentData] = useState(initialData);

    const openModal = (data, isEdit = false) => {
        setCurrentData(data);
        setIsEditMode(isEdit);
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
    };

    const handleChange = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:1337/view`)
            .then((response) => {
                setDataList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [refreshDataList]);

    const handleAddData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/add",
                currentData
            );

            const result = await response.data;

            if (result.success) {
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            }
            alert(result.message);
        } catch (error) {
            console.error("Error adding data:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleUpdateData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/update",
                currentData
            );

            const result = response.data;

            if (result.success) {
                alert(result.message);
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            } else {
                alert("Failed to update data. Please try again!.");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert("An error occured. Please try again.");
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <h1>Manage</h1>
                <Button
                    className="manage-button"
                    variant="contained"
                    onClick={() => openModal(initialData, false)}
                >
                    ADD
                </Button>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>EDIT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataList.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.firstname}</TableCell>
                                    <TableCell>{item.year}</TableCell>

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                openModal(item, true)
                                            }
                                        >
                                            EDIT
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal open={modalState} onClose={closeModal}>
                    <Box className="modal">
                        {/* it will only render the typography if not null */}
                        {currentData && (
                            <form
                                onSubmit={
                                    isEditMode
                                        ? handleUpdateData
                                        : handleAddData
                                }
                            >
                                <TextField
                                    id="id"
                                    required
                                    label="ID"
                                    variant="outlined"
                                    value={currentData.id}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="firstname"
                                    required
                                    label="First Name"
                                    variant="outlined"
                                    value={currentData.firstname}
                                    onChange={handleChange}
                                />

                                <FormControl variant="outlined">
                                    <InputLabel>Date</InputLabel>
                                    <Select
                                        name="year"
                                        value={currentData.year}
                                        required
                                        onChange={handleChange}
                                        label="year"
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                    </Select>
                                </FormControl>

                                    <Button
                                        variant="contained"
                                        type="submit"
                                    >
                                        {isEditMode ? "UPDATE" : "ADD"}
                                    </Button>
                            </form>
                        )}
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Manage;
