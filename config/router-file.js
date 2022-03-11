const filenames = {

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