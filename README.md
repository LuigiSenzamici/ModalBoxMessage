# Modal Box Message

Simply a Modal Box that display a message

## Getting Started
```bash
npm install modal-box-message --save
```
## Simple Use

get boxclass from module
```javascript
var alertClass = require("./ModalBoxMessage.js").ModalBoxMessage;
var alert = new alertClass("Error", "anonymous function thrown an error!");
alert.Open();
```
![Here Example](http://LuigiSenzamici.com/Content/Images/BoxMessageExample.PNG)

## Styling

for styling Box class automatically insert a tag
```html
<link rel="stylesheet" href="../node_modules/Modal-Box-Input/dist/ModalBoxInput.css">
```
if your path is different you can use 
```javascript
currentCssFile = "../node_modules/Modal-Box-Input/dist/ModalBoxInput.css";
public setCssFileName(filename:string)//currentCssFile ="../node_modules/Modal-Box-Input/dist/[filename]";
public setCssFilePath(filepath:string)//currentCssFile = "../[filepath]/ModalBoxInput.css";
public setCssBasePath(filebase:string)//currentCssFile = "[filebase]node_modules/Modal-Box-Input/dist/ModalBoxInput.css";
```
to set a different location for css stylesheet
or copy ModalBoxInput.css in your index folder and set css file so:
```javascript
public setCssFile(filepath:string)//currentCssFile = [filepath];
```

## Documentation

[Documentation Here](http://luigisenzamici.com/Documentazione/ModalBoxMessage/modules/_modalboxmessage_.html)

## Built With
Typescript

Browserify

Gulp

Stylus
## Author

[Luigi Senzamici](http://luigisenzamici.com)


## License

This project is licensed under the MIT License 



