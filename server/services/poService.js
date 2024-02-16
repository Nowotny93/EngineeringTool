const PO = require('../models/Po')

async function uploadFile(data) {
    
    const result = PO.insertMany(data)
    // await result.save()
    return result;
}

async function getPoData(poNumber) {
    return PO.find({PONumber: poNumber})
}

async function getFilteredPos(partNumber) {
    return PO.find({PN: partNumber})
}

async function getFilteredById(id) {
    return PO.findById(id);
}

async function updatePO(original, updated) {
    Object.assign(original, updated)
    await original.save()
    return original
}

module.exports = {
    uploadFile,
    getPoData,
    getFilteredPos,
    getFilteredById,
    updatePO
}