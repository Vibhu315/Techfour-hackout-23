const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const ccpPath = path.resolve(__dirname, 'connection.json'); // Path to your connection profile
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

app.post('/mint-model', async (req, res) => {
  try {
    // Connect to the network
    const gateway = new Gateway();
    await gateway.connect(ccp, { Wallets, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('mycontract');

    // Invoke the mintModel function
    await contract.submitTransaction('mintModel', req.body.modelId, req.body.modelName, req.body.modelDescription, req.body.fileHash);

    res.status(200).json({ message: 'Model minted successfully' });
  } catch (error) {
    console.error(`Error minting model: ${error}`);
    res.status(500).json({ error: 'Error minting model' });
  }
});
const nodesDatabase = [
    { id: 'node1', isNeighbor: true },
    { id: 'node2', isNeighbor: true },
    { id: 'node3', isNeighbor: false },
    { id: 'node4', isNeighbor: true },
    // ... Add more nodes here
];
// Dummy database for nodes
const nodes = [
    { id: 'user1', name: 'User 1' },
    { id: 'user2', name: 'User 2' },
    { id: 'user3', name: 'User 3' },
    // Add more nodes here
];
const approvedModels = [];
const neighborRelationships = {
    user1: ['user2'],
    user2: ['user1', 'user3'],
    user3: ['user2'],
    // Define more relationships here
};

// Helper function to check if two nodes are neighbors
function checkIfNeighbors(node1, node2) {
    if (neighborRelationships[node1] && neighborRelationships[node1].includes(node2)) {
        return true;
    }
    return false;
}

function checkNeighboringNode(nodeId) {
    const node = nodesDatabase.find(node => node.id === nodeId);
    return node && node.isNeighbor;
}

// Function to retrieve a list of neighboring nodes
function getNeighboringNodes() {
    return nodesDatabase.filter(node => node.isNeighbor);
}

// Function to retrieve a list of all nodes
function getAllNodes() {
    return nodesDatabase;
}

// Simulate API calls to the database
function simulateAPICall() {
    const requestingNode = 'node3'; // Replace with actual node ID

    if (checkNeighboringNode(requestingNode)) {
        console.log('This node is a neighboring node.');
    } else {
        console.log('This node is not a neighboring node.');
    }

    console.log('Neighboring nodes:', getNeighboringNodes());
    console.log('All nodes:', getAllNodes());
}

// Simulate an API call to check neighboring node status
simulateAPICall();


// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Dummy database for pending models awaiting approval
const pendingModels = [];

// Endpoint to send 3D model for approval
app.post('/api/send-for-approval', upload.single('model'), (req, res) => {
    const { sender, recipient } = req.body;
    const model = req.file;

    if (!model) {
        return res.status(400).json({ success: false, message: 'No model file provided' });
    }

    // Implement logic to add the model to pendingModels
    pendingModels.push({ sender, recipient, model });

    res.json({ success: true, message: 'Model sent for approval' });
});

// Endpoint to approve a pending model
app.post('/api/approve-model', (req, res) => {
    const { sender, recipient } = req.body;

    // Check if the sender and recipient are neighbors
    const isNeighbor = checkIfNeighbors(sender, recipient);

    if (isNeighbor) {
        // Check if the model is already approved
        if (approvedModels.includes(sender)) {
            return res.status(400).json({ message: 'Model already approved.' });
        }

        // Approve the model and add sender to approvedModels array
        approvedModels.push(sender);

        return res.status(200).json({ message: 'Model approved successfully.' });
    } else {
        return res.status(403).json({ message: 'You do not have permission to approve this model.' });
    }
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
