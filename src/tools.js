const fs = require('fs');
const path = require('path');
var merge = require('lodash.merge');

const getJsonFiles = async (pathFolder) => {
    const folderLanguages = await fs.readdirSync(pathFolder)
    let objectFiles = {}
    folderLanguages.forEach(lang => {
        const pathLang = path.join(pathFolder, lang)
        let langFiles = fs.readdirSync(pathLang)
        langFiles = langFiles.filter(file => file.endsWith('.json'))
        langFiles.forEach(fileName => {
            const filePath = path.join(pathLang, fileName)
            const fileContent = fs.readFileSync(filePath, 'utf8')

            filename = fileName.replace('.json', '')
            if (!objectFiles[filename]) objectFiles[filename] = {}
            objectFiles[filename][lang] = JSON.parse(fileContent)
        })
    })

    return objectFiles
}

const convertToXlsxObject = (fileObject) => {
    let data = []
    Object.entries(fileObject).forEach(([lang, langValue]) => {
        data = convertObjectXlsx(langValue, lang, data)

    })
    return data;
}

const convertObjectXlsx = (fileObject, lang, data = [], route = "") => {
    if (route.length > 0) route += ".";
    Object.entries(fileObject).forEach(([nameObject, value]) => {
        if (value instanceof Object) {
            data = convertObjectXlsx(value, lang, data, route + nameObject)
        } else {
            const objectFinded = data.find(e => e.type === route + nameObject)
            if (!objectFinded) {
                data.push({
                    type: route + nameObject,
                    [lang]: value
                })
            } else {
                data = data.map(e => {
                    if (e.type === route + nameObject) {
                        e[lang] = value
                    }
                    return e
                })
            }

        }
    })


    return data;
}

const deleteFolderRecursive = async (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

const parseXlsxToJson = (page, object = {}) => {
    page.forEach(langs => {
        const key = langs.type
        if (langs.type) delete langs.type
        Object.entries(langs).forEach(([lang, valueLang]) => {
            if (!object[lang]) object[lang] = {}
            const route = key.split(".")
            object[lang] = merge(object[lang], insertData(route, valueLang))
        })
    })

    return object

}

const insertData = (route = [], value) => {
    if (route.length <= 1) return { [route[0]]: value }
    let newRoute = [...route]
    newRoute = newRoute.slice(1, newRoute.length);
    return { [route[0]]: insertData(newRoute, value) }
}


module.exports = {
    getJsonFiles,
    convertToXlsxObject,
    deleteFolderRecursive,
    parseXlsxToJson
}