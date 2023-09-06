import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ComputerTableListPage.css';
import { FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import ComboBoxGrid from '../components/buttons/ComboBoxGrid';

function ComputerTableListPage() {
  const [computers, setComputers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedComputer, setSelectedComputer] = useState(null); //use for table
  const [showModal, setShowModal] = useState(false); //use for table
  const [selectedCell, setSelectedCell] = useState(null); //use for table
  const [computerName, setComputerName] = useState(null); //use for table
  const [runningNumber, setRunningNumber] = useState(1); //use for table
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedComputerName, setSelectedComputerName] = useState(null);
  const [selectedUserUpdateBy, setSelectedUserUpdateBy] = useState(null);

  const fetchData = async (
    userUpdateBy = selectedUserUpdateBy,
    factory = selectedFactory,
    department = selectedDepartment,
    process = selectedProcess,
    computerName = selectedComputerName
  ) => {
    try {
      console.log("fetchData", factory, department, process,computerName,userUpdateBy);
      // const response = await fetch(`http://localhost:3002/api/computer-list?user_update_by=${userUpdateBy}`);
      const response = await fetch(`http://localhost:3002/api/computer-list?userUpdateBySelect=${selectedUserUpdateBy}&factorySelect=${selectedFactory}&departmentSelect=${selectedDepartment}&processSelect=${selectedProcess}&computerNameSelect=${selectedComputerName}`);
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const data = await response.json();
      setComputers(data);
      setRunningNumber(1); // Reset the running number to 1
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data');
    }
  };


  useEffect(() => { //ต้องมี userEffect เพื่อให้รับค่าจาก อีก component ได้ต่อเนื่อง realtime หากไม่มีจะต้องกดปุ่ม 2 รอบ
    fetchData();
  }, [selectedUserUpdateBy, selectedFactory, selectedDepartment, selectedProcess, selectedComputerName]);

  function handleSearch(queryParams) {
    setSelectedFactory(queryParams.factory);
    setSelectedDepartment(queryParams.department);
    setSelectedProcess(queryParams.process);
    setSelectedComputerName(queryParams.computerName);
    setSelectedUserUpdateBy(queryParams.userUpdateBy);
    // You can add additional logic here based on the selected values if needed
    fetchData();
  }
  
  const handleCellClick = (computer, columnName) => {
    setSelectedComputer(computer);
    setSelectedCell(columnName);
    setShowModal(true);
    setComputerName(computer.computer_name);
  };

  const handleDelete = (computerId) => {
    console.log(`Delete computer with ID: ${computerId}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setComputerName(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: selectedCell,
          value: selectedComputer[selectedCell],
          id: selectedComputer.id,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setShowModal(false); // Close the modal
      fetchData(); // Fetch updated data to update the table
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle error state or display error message to the user
    }
  };

  
  const handleFactoryChange = (event, newValue) => {
    setSelectedFactory(newValue);
  };

  const handleProcessChange = (event, newValue) => {
    setSelectedProcess(newValue);
  };

  const handleDepartmentChange = (event, newValue) => {
    setSelectedDepartment(newValue);
  };

  const handleComputerNameChange = (event, newValue) => {
    setSelectedComputerName(newValue);
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-fluid">
      <h3 className="text-center mb-3">Computer master list</h3>
      <div>
      {/* <SearchBox onSearchChange={fetchData} /> */}
      <ComboBoxGrid
          onSearch={(queryParams) => {
            setSelectedFactory(queryParams.factory);
            setSelectedDepartment(queryParams.department);
            setSelectedProcess(queryParams.process);
            setSelectedComputerName(queryParams.computerName);
            setSelectedUserUpdateBy(queryParams.userUpdateBy);
            // You can add additional logic here based on the selected values if needed
            fetchData();
            console.log("comboGrid", selectedFactory);
          }}
        />
      </div>
      <div className="table-responsive table-fullscreen">
        <table className="table table-striped table-bordered table-hover blue-theme table-very-small">
          <thead className="thead-dark">
            <tr>
            <th>No</th>
              <th>Computer Type</th>
              <th>Computer Function</th>
              <th>Machine Name</th>
              <th>Person in Charge</th>
              <th>User Update By</th>
              <th>Computer Name</th>
              <th>Computer Job Details</th>
              <th>Email</th>
              <th>Confirmed</th>
              <th>VPN User</th>
              <th>Factory</th>
              <th>Department</th>
              <th>Process</th>
              <th>Keep Area</th>
              <th>OS</th>
              <th>OS Version</th>
              <th>Bit</th>
              <th>Antivirus</th>
              <th>Antivirus Version</th>
              <th>MAC Address</th>
              <th>Old IP Address_1</th>
              <th>EDR Icon</th>
              <th>EDR On</th>
              <th>EDR Log</th>
              <th>EDR Service</th>
              <th>Kaspersky Active</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {computers.map((computer, index) => (
              <tr key={computer.id}>
                <td>{runningNumber + index}</td>
                <td onClick={() => handleCellClick(computer, 'computer_type')}>{computer.computer_type}</td>
                <td onClick={() => handleCellClick(computer, 'computer_function')}>{computer.computer_function}</td>
                <td onClick={() => handleCellClick(computer, 'machine_name')}>{computer.machine_name}</td>
                <td onClick={() => handleCellClick(computer, 'person_in_charge')}>{computer.person_in_charge}</td>
                <td onClick={() => handleCellClick(computer, 'user_update_by')}>{computer.user_update_by}</td>
                <td onClick={() => handleCellClick(computer, 'computer_name')}>{computer.computer_name}</td>
                <td onClick={() => handleCellClick(computer, 'computer_job_details')}>{computer.computer_job_details}</td>
                <td onClick={() => handleCellClick(computer, 'email')}>{computer.email}</td>
                <td onClick={() => handleCellClick(computer, 'confirmed')}>{computer.confirmed}</td>
                <td onClick={() => handleCellClick(computer, 'vpn_user')}>{computer.vpn_user}</td>
                <td onClick={() => handleCellClick(computer, 'factory')}>{computer.factory}</td>
                <td onClick={() => handleCellClick(computer, 'department')}>{computer.department}</td>
                <td onClick={() => handleCellClick(computer, 'process')}>{computer.process}</td>
                <td onClick={() => handleCellClick(computer, 'area')}>{computer.area}</td>
                <td onClick={() => handleCellClick(computer, 'os')}>{computer.os}</td>
                <td onClick={() => handleCellClick(computer, 'os_version')}>{computer.os_version}</td>
                <td onClick={() => handleCellClick(computer, 'os_bit')}>{computer.os_bit}</td>
                <td onClick={() => handleCellClick(computer, 'antivirus')}>{computer.antivirus}</td>
                <td onClick={() => handleCellClick(computer, 'antivirus_version')}>{computer.antivirus_version}</td>
                <td onClick={() => handleCellClick(computer, 'mac_address')}>{computer.mac_address}</td>
                <td onClick={() => handleCellClick(computer, 'old_ip_address_1')}>{computer.old_ip_address_1}</td>
                <td onClick={() => handleCellClick(computer, 'edr_icon')}>
                  {computer.edr_icon === 'Y' ? (
                    <button className="status-button green">Yes</button>
                  ) : computer.edr_icon === 'N' ? (
                    <button className="status-button red">No</button>
                  ) : (
                    <button className="status-button gray">None</button>
                  )}
                </td>
                <td onClick={() => handleCellClick(computer, 'edr_on')}>
                  {computer.edr_on === 'Y' ? (
                    <button className="status-button green">Yes</button>
                  ) : computer.edr_on === 'N' ? (
                    <button className="status-button red">No</button>
                  ) : (
                    <button className="status-button gray">None</button>
                  )}
                </td>
                <td onClick={() => handleCellClick(computer, 'edr_log')}>
                  {computer.edr_log === 'Y' ? (
                    <button className="status-button green">Yes</button>
                  ) : computer.edr_log === 'N' ? (
                    <button className="status-button red">No</button>
                  ) : (
                    <button className="status-button gray">None</button>
                  )}
                </td>
                <td onClick={() => handleCellClick(computer, 'edr_service')}>
                  {computer.edr_service === 'Y' ? (
                    <button className="status-button green">Yes</button>
                  ) : computer.edr_service === 'N' ? (
                    <button className="status-button red">No</button>
                  ) : (
                    <button className="status-button gray">None</button>
                  )}
                </td>
                <td onClick={() => handleCellClick(computer, 'kaspersky_active')}>
                  {computer.kaspersky_active === 'Y' ? (
                    <button className="status-button green">Yes</button>
                  ) : computer.kaspersky_active === 'N' ? (
                    <button className="status-button red">No</button>
                  ) : (
                    <button className="status-button gray">None</button>
                  )}
                </td>
                <td>
                  <FaTrash className="delete-icon" onClick={() => handleDelete(computer.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedComputer && (
        <Modal show={showModal} onHide={handleCloseModal} className="modern-blue-modal" centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Computer Name:<label style={{ color: 'black' }}> {computerName}</label></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId={`form${selectedCell}`}>
            <div className="label-wrapper">
              <Form.Label>{selectedCell}</Form.Label>
              {selectedCell === 'edr_icon' ||
              selectedCell === 'edr_on' ||
              selectedCell === 'edr_log' ||
              selectedCell === 'edr_service' ||
              selectedCell === 'kaspersky_active' ? (
                <Form.Control
                  as="select"
                  defaultValue={selectedComputer[selectedCell]}
                  onChange={(e) =>
                    setSelectedComputer((prevComputer) => ({
                      ...prevComputer,
                      [selectedCell]: e.target.value,
                    }))
                  }
                  className="bg-lightyellow"
                >
                  {/* Add options for the select field */}
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                  <option value="">None</option>
                </Form.Control>
              ) : selectedCell === 'computer_type' ? (
                <Form.Control
                  as="select"
                  defaultValue={selectedComputer[selectedCell]}
                  onChange={(e) =>
                    setSelectedComputer((prevComputer) => ({
                      ...prevComputer,
                      [selectedCell]: e.target.value,
                    }))
                  }
                  className="bg-lightyellow"
                >
                  {/* Add options for the computer_type select field */}
                  <option value="Desktop">Desktop</option>
                  <option value="Notebook">Notebook</option>
                  <option value="Server">Server</option>
                  <option value="NAS">NAS</option>
                </Form.Control>
              ) : (
                <Form.Control
                  type="text"
                  defaultValue={selectedComputer[selectedCell]}
                  onChange={(e) =>
                    setSelectedComputer((prevComputer) => ({
                      ...prevComputer,
                      [selectedCell]: e.target.value,
                    }))
                  }
                  className="bg-lightyellow"
                />
              )}
            </div>

            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ComputerTableListPage;
