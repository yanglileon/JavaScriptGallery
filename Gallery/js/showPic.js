'use strict'
/**
 * 共享函数方法
 * @param {*} func 需要添加到onload里的函数
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

/**
 * 将一个元素节点到指定元素节点后面
 * @param {*} nerElement 添加的节点
 * @param {*} targetElement 指定的节点
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement, targetElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/**
 * 添加图片和描述
 */
function preparePlaceholder() {
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.appendChild) return false;
    if (!document.insertBefore) return false;
    var imagegallery = document.getElementById("imagegallery");
    var placeholder = document.createElement("img");
    if (!placeholder.setAttribute) return false;
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/0.jpg");
    placeholder.setAttribute("alt", "占位图");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var title = document.createTextNode("描述");
    description.appendChild(title);
    insertAfter(placeholder, imagegallery);
    insertAfter(description, placeholder);
}

/**
 * 添加点击事件函数
 */
function prepareGallery() {
    var imagegallery = document.getElementById("imagegallery");
    if (!imagegallery.getAttribute) return false;
    if (!imagegallery.getElementsByTagName) return false;
    var links = imagegallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var source = links[i].getAttribute("href");
        var text = links[i].getAttribute("title");
        var image = document.createElement("img");
        image.setAttribute("src", source);
        image.setAttribute("alt", text);
        links[i].lastChild.nodeValue = "";
        links[i].appendChild(image);
        links[i].onclick = function () {
            return showPic(this) ? false : true;
        }
    }
}

/**
 * 图片显示函数
 * @param {*} whichpic 变换的图片
 */
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    var text = whichpic.getAttribute("title");
    if (document.getElementById("description")) {
        var description = document.getElementById("description");
        description.lastChild.nodeValue = text;
    }
    return true;
}

// 共享点击事件函数
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);