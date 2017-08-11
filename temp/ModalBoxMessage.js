"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ElementoBase = (function () {
    function ElementoBase(nome, id, classe, parent) {
        this.nome = nome;
        this.id = id;
        this.classe = classe;
        this.parent = (typeof (parent) === "string") ? document.getElementById(parent) : parent;
    }
    ElementoBase.prototype.removeText = function () {
        while (this.elementInstance.hasChildNodes())
            this.elementInstance.removeChild(this.elementInstance.firstChild);
    };
    ElementoBase.prototype.create = function () {
        var e = document.createElement(this.nome);
        e.id = this.id;
        e.setAttribute("class", this.classe);
        this.parent.appendChild(e);
        this.elementInstance = e;
        return e;
    };
    ElementoBase.prototype.attr = function (name, value) {
        if (value) {
            this.elementInstance.setAttribute(name, value);
            return;
        }
        return this.elementInstance.getAttribute(name);
    };
    ElementoBase.prototype.removeAttr = function (name) {
        this.elementInstance.removeAttribute(name);
    };
    ElementoBase.prototype.removeClass = function (className) {
        var res = [];
        var strClassi = this.elementInstance.getAttribute("class");
        if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
            var elencoClassi = strClassi.split(" ");
            if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
                if (className.indexOf("@") != -1) {
                    var check = className.substring(1, className.length);
                    res = elencoClassi.filter(function (e) {
                        return e.indexOf(check) == -1;
                    });
                }
                else {
                    res = elencoClassi.filter(function (e) {
                        return e != className;
                    });
                }
            }
            var newClassi = res.join(" ");
            this.elementInstance.setAttribute("class", newClassi);
        }
    };
    ElementoBase.prototype.setClass = function (className) {
        var res = [];
        var strClassi = this.elementInstance.getAttribute("class");
        if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
            var elencoClassi = strClassi.split(" ");
            if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
                elencoClassi.push(className);
                var newClassi = elencoClassi.join(" ");
                this.elementInstance.setAttribute("class", newClassi);
            }
            else {
                this.elementInstance.setAttribute("class", className);
            }
        }
        else {
            this.elementInstance.setAttribute("class", className);
        }
    };
    ElementoBase.prototype.setStyle = function (nameValueString) {
        if (nameValueString.indexOf(";") == -1)
            throw new Error("Bad Format: 'name:value;' is correct.");
        var listaImp = nameValueString.split(";");
        listaImp.pop();
        var stStile = this.getStyle(null);
        if (stStile == null) {
            this.attr("style", nameValueString);
            return;
        }
        var listaStili = stStile.split(";");
        var updated = [];
        listaImp.forEach(function (eI, iI, aI) {
            var nameI = eI.split(":")[0];
            var valI = eI.split(":")[1];
            listaStili.forEach(function (e, i, a) {
                var name = e.split(":")[0];
                var value = e.split(":")[1];
                if (name == nameI) {
                    e = [name, valI].join(":");
                    a[i] = e;
                    updated.push(eI);
                    return;
                }
            });
        });
        if (listaImp.length != updated.length) {
            updated.forEach(function (e, i, a) {
                var inde = listaImp.indexOf(e);
                listaImp.splice(inde, 1);
            });
            //lista imp contiene solo i valori nuovi che non 
            //hanno trovato corrispondenza e che quindi vanno aggiunti
            //al vettore che contiene i valori aggiornati
            listaStili = listaStili.concat(listaImp);
        }
        //lista stili contiene i valori aggiornati
        this.attr("style", listaStili.join(";"));
    };
    ElementoBase.prototype.getStyle = function (name) {
        if (name == null || name == undefined) {
            var res = this.attr("style", null);
            if (res != null) {
                if (res.lastIndexOf(";") != res.length - 1)
                    res += ";";
            }
            return res;
        }
        var stStile = this.attr("style", null);
        if (stStile == null || stStile == undefined)
            return null;
        var listaStili = stStile.split(";");
        listaStili.forEach(function (e, i, a) {
            var nome = e.split(":")[0];
            if (name == nome)
                return e.split(":")[1];
        });
        return null;
    };
    ElementoBase.prototype.removeStyle = function (name) {
        if (name == null || name == undefined)
            return this.attr("style", null);
        var stStile = this.attr("style", null);
        if (stStile == null || stStile == undefined)
            return null;
        var listaStili = stStile.split(";");
        listaStili.pop();
        var res = [];
        listaStili.forEach(function (e, i, a) {
            var nome = e.split(":")[0];
            if (name != nome)
                res.push(e);
        });
        this.attr("style", res.join(";"));
    };
    ElementoBase.prototype.getInstance = function () { return this.elementInstance; };
    ElementoBase.prototype.on = function (event, Func, bubling) {
        if (bubling === void 0) { bubling = false; }
        this.elementInstance.addEventListener(event, Func, bubling);
    };
    return ElementoBase;
}());
var ElementoInput = (function (_super) {
    __extends(ElementoInput, _super);
    function ElementoInput(tipo, id, classe, parent) {
        var _this = _super.call(this, "input", id, classe, parent) || this;
        _this.name = id;
        _this.tipo = tipo;
        return _this;
    }
    ElementoInput.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.elementInstance.setAttribute("name", this.name);
        this.elementInstance.setAttribute("type", this.tipo);
        return this.elementInstance;
    };
    ElementoInput.prototype.setValue = function (value) {
        document.getElementById(this.id).value = value;
    };
    ElementoInput.prototype.getValue = function () {
        return document.getElementById(this.id).value;
    };
    return ElementoInput;
}(ElementoBase));
var ElementoLabel = (function (_super) {
    __extends(ElementoLabel, _super);
    function ElementoLabel(forId, text, parent) {
        var _this = _super.call(this, "label", "", "", parent) || this;
        _this.forId = forId;
        _this.text = text;
        return _this;
    }
    ElementoLabel.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.elementInstance.setAttribute("for", this.forId);
        var testo = document.createTextNode(this.text);
        this.elementInstance.appendChild(testo);
        return this.elementInstance;
    };
    return ElementoLabel;
}(ElementoBase));
var ElementoButton = (function (_super) {
    __extends(ElementoButton, _super);
    function ElementoButton(id, classe, parent, text) {
        var _this = _super.call(this, "button", id, classe, parent) || this;
        _this.text = text;
        return _this;
    }
    ElementoButton.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        var t = document.createTextNode(this.text);
        this.elementInstance.appendChild(t);
        return this.elementInstance;
    };
    ElementoButton.prototype.setText = function (value) {
        this.removeText();
        var testo = document.createTextNode(value);
        this.elementInstance.appendChild(testo);
    };
    return ElementoButton;
}(ElementoBase));
var ElementoText = (function (_super) {
    __extends(ElementoText, _super);
    function ElementoText(id, classe, parent, text) {
        var _this = _super.call(this, "div", id, classe, parent) || this;
        _this.text = text;
        return _this;
    }
    ElementoText.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        var testo = document.createTextNode(this.text);
        this.elementInstance.appendChild(testo);
        return this.elementInstance;
    };
    ElementoText.prototype.setText = function (val) {
        this.removeText();
        var testo = document.createTextNode(val);
        this.elementInstance.appendChild(testo);
    };
    ElementoText.prototype.getText = function () {
        var testo = this.elementInstance.firstChild;
        return testo;
    };
    return ElementoText;
}(ElementoBase));
var ElementoInputForm = (function (_super) {
    __extends(ElementoInputForm, _super);
    function ElementoInputForm(label, parent) {
        var _this = _super.call(this, "div", "MB-inlineInputBox", "MBM-inlineInputBox", parent) || this;
        _this.label = label;
        return _this;
    }
    ElementoInputForm.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.labelElement = new ElementoLabel("id-" + this.label, this.label, this.elementInstance);
        this.inputElement = new ElementoInput("text", "id-" + this.label, "MBM-inputElement", this.elementInstance);
        this.errorText = new ElementoText("ErrorText-" + this.label, "MBM-ErrorText", this.elementInstance, "");
        this.N_labelElement = this.labelElement.create();
        this.N_inputElement = this.inputElement.create();
        this.N_errorText = this.errorText.create();
        this.errorText.setStyle("display:none;");
        return this.elementInstance;
    };
    ElementoInputForm.prototype.getValue = function () {
        return this.inputElement.getValue();
    };
    ElementoInputForm.prototype.setValue = function (val) {
        this.inputElement.setValue(val);
    };
    ElementoInputForm.prototype.showErrorMessage = function (val) {
        this.errorText.setText(val);
        this.errorText.setStyle("display:block;");
    };
    ElementoInputForm.prototype.hideErrorMessage = function () {
        this.errorText.setText("");
        this.errorText.setStyle("display:none;");
    };
    return ElementoInputForm;
}(ElementoBase));
var Overlay = (function (_super) {
    __extends(Overlay, _super);
    function Overlay(visibility) {
        if (visibility === void 0) { visibility = false; }
        var _this = _super.call(this, "div", "MB-Overlay", "MBM-Overlay", document.getElementsByTagName("body")[0]) || this;
        _this.visibility = false;
        _this.visibility = visibility;
        var display = (_this.visibility) ? "display:block;" : "display:none;";
        var width = "width:" + window.innerWidth + "px;";
        var height = "height:" + window.innerHeight + "px;";
        _this.stileDefault = display + width + height + "position:fixed;top:0;left:0;z-index:1000;";
        return _this;
    }
    Overlay.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.setStyle(this.stileDefault);
        return this.elementInstance;
    };
    Overlay.prototype.setVisibility = function (val) {
        this.visibility = val;
        var display = (this.visibility) ? "display:block;" : "display:none;";
        var width = "width:" + window.innerWidth + "px;";
        var height = "height:" + window.innerHeight + "px;";
        this.setStyle(display + width + height);
    };
    return Overlay;
}(ElementoBase));
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(visibility, width, height) {
        if (visibility === void 0) { visibility = false; }
        if (width === void 0) { width = "400px"; }
        if (height === void 0) { height = "auto"; }
        var _this = _super.call(this, "div", "MB-Box", "MBM-box", document.getElementsByTagName("body")[0]) || this;
        _this.visibility = false;
        _this.visibility = visibility;
        var display = (_this.visibility) ? "display:block;" : "display:none;";
        _this.width = "width:" + width + ";";
        _this.height = "height:" + height + ";";
        _this.stileDefault = display + _this.width + _this.height + "top:0px;left:0px;position:fixed;z-index:1001;background-color:white;opacity:1;";
        return _this;
    }
    Box.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.setStyle(this.stileDefault);
        return this.elementInstance;
    };
    Box.prototype.setVisibility = function (val) {
        this.visibility = val;
        var display = (this.visibility) ? "display:block;" : "display:none;";
        this.setStyle(display);
    };
    return Box;
}(ElementoBase));
var ModalBoxMessage = (function () {
    function ModalBoxMessage(titolo, messaggio, buttonText) {
        if (titolo === void 0) { titolo = ""; }
        if (messaggio === void 0) { messaggio = ""; }
        if (buttonText === void 0) { buttonText = "Ok"; }
        this.cssDefaultFileName = "ModalBoxMessage.css";
        this.cssDefaultFilePath = "node_modules/modal-box-message/dist/";
        this.cssDefaultBasePath = "../";
        this.cssFileName = "ModalBoxMessage.css";
        this.cssFilePath = "node_modules/modal-box-message/dist/";
        this.cssBasePath = "../";
        this.currentCssFile = "";
        this.overlay = new Overlay(false);
        this.mainBox = new Box(false);
        var N_overlay = this.overlay.create();
        var N_mainBox = this.mainBox.create();
        this.genTitolo(N_mainBox, titolo);
        this.genTesto(N_mainBox, messaggio);
        this.genButtonBox(N_mainBox, buttonText);
        this.genCssReference();
    }
    ModalBoxMessage.prototype.updateCssLinkRef = function () {
        var link = document.querySelectorAll('link[data-module="cssPath"')[0];
        this.currentCssFile = this.cssBasePath + this.cssFilePath + this.cssFileName;
        link.setAttribute("href", this.currentCssFile);
    };
    ModalBoxMessage.prototype.genTitolo = function (parent, titolo) {
        //titleBox
        this.titleBox = new ElementoBase("div", "MB-titleBox", "MBM-titleBox", parent);
        var N_titleBox = this.titleBox.create();
        this.titleBox.setStyle("min-height:17px;");
        //title
        this.titleText = new ElementoText("MB-Text", "MBM-Text", N_titleBox, titolo);
        var N_titleText = this.titleText.create();
        this.titleText.setStyle("position:relative;max-width:90%;float:left;");
        //close button
        this.closeButton = new ElementoButton("MB-closeButton", "MBM-closeButton", N_titleBox, "X");
        var N_closeButton = this.closeButton.create();
        var that = this;
        function Event_Chiudi(event) {
            that.Close();
        }
        this.closeButton.on("click", Event_Chiudi);
    };
    ModalBoxMessage.prototype.genTesto = function (parent, messaggio) {
        //TextBox
        this.textBox = new ElementoBase("div", "MB-TextBox", "MBM-TextBox", parent);
        var N_textBox = this.textBox.create();
        //Text
        this.text = new ElementoText("MB-Text", "MBM-Text", N_textBox, messaggio);
        var N_text = this.text.create();
    };
    ModalBoxMessage.prototype.genButtonBox = function (parent, testoBottoneP) {
        this.buttonBox = new ElementoBase("div", "MB-buttonBox", "MBM-buttonBox", parent);
        var N_buttonBox = this.buttonBox.create();
        this.okButton = new ElementoButton("MB-okButton", "MBM-okButton", N_buttonBox, testoBottoneP);
        var N_okButton = this.okButton.create();
        var that = this;
        this.okButton.on("click", function () {
            that.Close();
        });
    };
    ModalBoxMessage.prototype.getComputed = function (element, dim) {
        var res = -1;
        var st;
        var computed = window.getComputedStyle(element, null);
        st = computed.getPropertyValue(dim);
        res = parseInt(st.substring(0, st.length - 2));
        return res;
    };
    ModalBoxMessage.prototype.calculateTop = function () {
        var res = -1;
        var WH = window.innerHeight;
        var height = this.getComputed(this.mainBox.getInstance(), "height");
        if (WH <= height) {
            this.mainBox.setStyle("overflow-y:scroll;height:" + WH.toString() + "px;");
            return 0;
        }
        this.mainBox.removeStyle("overflow-y");
        res = (WH - height) / 2;
        res = res - height;
        return res;
    };
    ModalBoxMessage.prototype.calculateLeft = function () {
        var res = -1;
        var WW = window.innerWidth;
        var width = this.getComputed(this.mainBox.getInstance(), "width");
        if (WW <= width) {
            this.mainBox.setStyle("overflow-x:scroll;width:" + WW.toString() + "px;");
            return 0;
        }
        this.mainBox.removeStyle("overflow-x");
        res = (WW - width) / 2;
        return res;
    };
    ModalBoxMessage.prototype.genCssReference = function () {
        var res = document.querySelectorAll('link[data-module="cssPath"');
        if (res != null && res != undefined && res.length > 0)
            return;
        var head = document.getElementsByTagName("head")[0];
        var stile = document.createElement("link");
        stile.setAttribute("rel", "stylesheet");
        stile.setAttribute("data-module", "cssPath");
        this.cssBasePath = this.cssDefaultBasePath;
        this.cssFileName = this.cssDefaultFileName;
        this.cssFilePath = this.cssDefaultFilePath;
        stile.setAttribute("href", this.cssDefaultBasePath + this.cssDefaultFilePath + this.cssDefaultBasePath);
        head.appendChild(stile);
    };
    ModalBoxMessage.prototype.Open = function () {
        this.overlay.setVisibility(true);
        this.mainBox.setVisibility(true);
        var top = this.calculateTop();
        var left = this.calculateLeft();
        this.mainBox.setStyle("top:" + top + "px;left:" + left + "px;");
    };
    ModalBoxMessage.prototype.Close = function () {
        this.overlay.setVisibility(false);
        this.mainBox.setVisibility(false);
    };
    ModalBoxMessage.prototype.setTitle = function (title) {
        this.titleText.setText(title);
    };
    ModalBoxMessage.prototype.setMessage = function (message) {
        this.text.setText(message);
    };
    ModalBoxMessage.prototype.setOKButtonText = function (value) {
        this.okButton.setText(value);
    };
    ModalBoxMessage.prototype.setCssFileName = function (filename) {
        this.cssFileName = filename;
        this.updateCssLinkRef();
    };
    ModalBoxMessage.prototype.setCssFilePath = function (filepath) {
        this.cssFilePath = filepath;
        this.updateCssLinkRef();
    };
    ModalBoxMessage.prototype.setCssBasePath = function (filebase) {
        this.cssBasePath = filebase;
        this.updateCssLinkRef();
    };
    ModalBoxMessage.prototype.setCssFile = function (filepath) {
        var link = document.querySelectorAll('link[data-module="cssPath"')[0];
        this.currentCssFile = filepath;
        link.setAttribute("href", filepath);
    };
    return ModalBoxMessage;
}());
exports.ModalBoxMessage = ModalBoxMessage;
