const filenames = {
    'notes/api/v1/rest': [
        'notes-resource'
    ]
}

function toFilesList(imports, folder){
    return [...imports, ...filenames[folder].map(toRelativePaths(folder))]
}

function toRelativePaths(folder){
    return (filename) => {
        return `../src/module/${folder}/${filename}`
    }
}


module.exports = Object.keys(filenames).reduce(toFilesList, [])