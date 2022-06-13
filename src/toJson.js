require("./pollyfills")

const fs = require('fs');
const XlSX = require('xlsx')
const path = require('path')

const { deleteFolderRecursive, parseXlsxToJson } = require("./tools")

const xlsxPath = path.join(__dirname, './../input/xlsx/languages.xlsx')
const outputPath = path.join(__dirname, './../output/jsons/')


//Delete and create folder
if (fs.existsSync(outputPath)) {
    deleteFolderRecursive(outputPath)
}
fs.mkdirSync(outputPath);



const file = XlSX.readFile(xlsxPath)

const namePages = file.SheetNames
const languages = {}
const init = async () => {
    namePages.forEach(namePage => {
        const page = XlSX.utils.sheet_to_json(file.Sheets[namePage])
        const pages = parseXlsxToJson(page)

        Object.entries(pages).forEach(([lang, value]) => {
            const langPath = path.join(outputPath, lang + "/")
            if (!fs.existsSync(langPath)) {
                fs.mkdirSync(langPath)
            }
            const filePath = path.join(langPath, `${namePage}.json`)
            fs.writeFileSync(filePath, JSON.stringify(value, null, 4))
            console.log("Archivo creado (" + lang + "): " + `${namePage}.json`)
        })

    })
}
init()