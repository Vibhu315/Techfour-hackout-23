
const { Contract } = require('fabric-contract-api');

class ModelContract extends Contract {
    // ModelContract.js

async requestChangeApproval(ctx, modelId, changes) {
    const modelBytes = await ctx.stub.getState(modelId);
    if (!modelBytes || modelBytes.length === 0) {
        throw new Error(`Model with ID ${modelId} does not exist.`);
    }

    const model = JSON.parse(modelBytes.toString());
    if (model.recipient !== ctx.clientIdentity.getID()) {
        throw new Error('You do not have permission to request changes for this model.');
    }

    const changeRequest = {
        modelId,
        changes,
        requester: ctx.clientIdentity.getID(),
        approvals: [],
    };

    await ctx.stub.putState(`${modelId}_changeRequest`, Buffer.from(JSON.stringify(changeRequest)));
}

async approveChanges(ctx, modelId) {
    const changeRequestBytes = await ctx.stub.getState(`${modelId}_changeRequest`);
    if (!changeRequestBytes || changeRequestBytes.length === 0) {
        throw new Error(`Change request for model with ID ${modelId} does not exist.`);
    }

    const changeRequest = JSON.parse(changeRequestBytes.toString());

    // Check if the approving node is a neighbor
    if (checkIfNeighbors(ctx.clientIdentity.getID(), changeRequest.requester)) {
        // Add approval
        changeRequest.approvals.push(ctx.clientIdentity.getID());

        // If approvals reach a threshold, apply changes
        if (changeRequest.approvals.length >= NEIGHBOR_APPROVAL_THRESHOLD) {
            // Apply changes and update the model's data
            // Save updated model in the blockchain
            await ctx.stub.putState(modelId, Buffer.from(JSON.stringify(updatedModel)));
        }

        // Update the change request
        await ctx.stub.putState(`${modelId}_changeRequest`, Buffer.from(JSON.stringify(changeRequest)));
    } else {
        throw new Error('You do not have permission to approve changes for this model.');
    }
}

    async mintModel(ctx, modelId, modelName, modelDescription, fileHash) {
        const exists = await this.modelExists(ctx, modelId);
        if (exists) {
            throw new Error(`Model with ID ${modelId} already exists.`);
        }

        const model = {
            modelId,
            modelName,
            modelDescription,
            fileHash,
            owner: ctx.clientIdentity.getID(),
        };

        await ctx.stub.putState(modelId, Buffer.from(JSON.stringify(model)));
    }

    async transferModel(ctx, modelId, newOwner) {
        const modelBytes = await ctx.stub.getState(modelId);
        if (!modelBytes || modelBytes.length === 0) {
            throw new Error(`Model with ID ${modelId} does not exist.`);
        }

        const model = JSON.parse(modelBytes.toString());
        if (model.owner !== ctx.clientIdentity.getID()) {
            throw new Error('You do not own this model.');
        }

        model.owner = newOwner;
        await ctx.stub.putState(modelId, Buffer.from(JSON.stringify(model)));
    }

    async modelExists(ctx, modelId) {
        const modelBytes = await ctx.stub.getState(modelId);
        return modelBytes && modelBytes.length > 0;
    }
}

module.exports = ModelContract;
