export const getPObyPONumber = (poNumber) => {
    return fetch (`http://localhost:5000/POs/${poNumber}`)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getFilteredPOs = (partNumber) => {
    return fetch (`http://localhost:5000/POs/filteredByPN/${partNumber}`)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getPObyID = (id) => {
    return fetch (`http://localhost:5000/POs/filteredById/${id}`)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const updatePO = (id, po) => {
    return fetch(`http://localhost:5000/POs/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(po)
    });
};

export const uploadFile = (file) => {
    return fetch('http://localhost:5000/uploadFile', {
        method: 'post',
        headers: {
            "Contetnt-Type":"multipart/form-data" 
        },
        body: file
    })
}