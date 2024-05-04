const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

// Выгрузка XML-файла 
const xmlContent = fs.readFileSync("test.xml", { encoding: 'utf8', flag: 'r' });

// Парсинг XML-файла через jsdom
const xmlParsed = new jsdom.JSDOM(xmlContent);
const doc = xmlParsed.window.document;

const elements = [];

// Проход по всем объектам "element"
const elementsList = doc.querySelectorAll("ns1\\:element");
elementsList.forEach((userItem) => {
    const element = {};

    // Проход по всем дочерним объектам объекта "element"
    const child = userItem.querySelectorAll("*");
    child.forEach((childItem) => {
        var childName;
        if (childItem.localName.includes(":")) {
            childName = childItem.localName.split(":")[1];
        }
        else {
            childName = childItem.localName;
        }
        element[childName] = childItem.textContent;
    });
    
    element['id'] = userItem.getAttribute("id");
    elements.push({element});
});

// Результат
const dictData = {elements};

// Выгрузка в JSON-файл.
const jsonData = JSON.stringify(dictData, null, 4);
fs.writeFileSync("outputData.json", jsonData);