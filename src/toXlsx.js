const path = require('path');
const XLSX = require('xlsx')
const fs = require('fs')

require("./pollyfills")

const { getJsonFiles, convertToXlsxObject } = require('./tools');

const directoryPath = path.join(__dirname, './../input/jsons');
const outputPath = path.join(__dirname, './../output/xlsx/languages.xlsx')

const wb = XLSX.utils.book_new()
const init = async () => {

    // const files = await fs.readdirSync(directoryPath)
    const files = await getJsonFiles(directoryPath)
    // console.log(files)

    Object.entries(files).forEach(([nameFile, infoFile]) => {
        const data = convertToXlsxObject(infoFile)

        const ws = XLSX.utils.json_to_sheet(data)
        ws['!rows'] = [{ ht: 25, customHeight: true }]

        XLSX.utils.book_append_sheet(wb, ws, nameFile)
    })



    XLSX.writeFile(wb, outputPath)
    console.log("Program Finished");
}







init();