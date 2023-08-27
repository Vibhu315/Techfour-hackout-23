import React, { useState } from 'react';
import axios from 'axios';
import './Blockchain_ui.css';

function App() {
    const [selectedNode, setSelectedNode] = useState('');
    const [modelFile, setModelFile] = useState(null);
    // const [pendingModels, setPendingModels] = useState([]);
    const nodes = [
        { id: 'user1', name: 'User 1' },
        { id: 'user2', name: 'User 2' },
        { id: 'user3', name: 'User 3' },
        // Add more nodes here
    ];
    const pendingModels = [
        { id: 'model1', sender: 'user 1',recipient: 'user2', model:{name:'Bridge'} },
        { id: 'model1', sender: 'user 4',recipient: 'user3', model:{name:'Mall'} },
        { id: 'model1', sender: 'user 3',recipient: 'user1', model:{name:'HighwayRoad'} },
        
    ];
    // setPendingModels(PendingModels);
    const handleSendModel = async () => {
        if (selectedNode && modelFile) {
            const formData = new FormData();
            formData.append('sender', 'your-user-id');
            formData.append('recipient', selectedNode);
            formData.append('model', modelFile);

            try {
                await axios.post('/api/send-for-approval', formData);
                alert('Model sent for approval');
            } catch (error) {
                console.error(error);
                alert('An error occurred while sending the model for approval');
            }
        } else {
            alert('Please select a node and upload a model file.');
        }
    };
    

    const handleApproveModel = async (sender, recipient) => {
        const approvingNode = nodes.find((node) => node.id === recipient);
    
        // Assuming the current user is 'your-user-id'
        const currentUser = 'your-user-id';
    
        // Check if the approving node is a neighbor
        if (approvingNode && approvingNode.id !== currentUser) {
            try {
                const response = await axios.post('/api/approve-model', { sender, recipient });
                alert(response.data.message);
            } catch (error) {
                console.error(error);
                alert('An error occurred while approving the model');
            }
        } else {
            alert('You do not have permission to approve this model.');
        }
    };
    

    return (
        
        <div className="App">
            <h1 className="title">3D Model Approval System</h1>
            <div className="input-section">
                <label className="input-label">Select Node:</label>
                <select className="input-select" value={selectedNode} onChange={(e) => setSelectedNode(e.target.value)}>
                    <option value="">Select a Node</option>
                    {nodes.map((node) => (
                        <option key={node.id} value={node.id}>
                            {node.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-section">
                <label className="input-label">Upload Model:</label>
                <input className="input-file" type="file" onChange={(e) => setModelFile(e.target.files[0])} />
            </div>
            <div className="button-section">
                <button className="action-button" onClick={handleSendModel}>Send for Approval</button>
            </div>
            <div className="pending-models">
                <h2 className="subtitle">Pending Models for Approval</h2>
                {pendingModels.map((pendingModel, index) => (
                    <div key={index} className="pending-model">
                        <span>Sender: {pendingModel.sender}</span>
                        <span style={{paddingLeft:'8px'}}>Recipient: {pendingModel.recipient}</span>
                        <span style={{paddingLeft:'8px',paddingRight:'8px'}}>Model: {pendingModel.model.name}</span>
                        <button className="approve-button" onClick={() => handleApproveModel(pendingModel.sender, pendingModel.recipient)}>Approve</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
