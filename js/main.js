var url = window.location.href;
let context = {
    id:'Dinsta',
    title:'download image',
    contexts:["page"],
    onclick:function () {
        console.log(url)
        alert(url);
    }
};


let showContextMenu = function () {
    console.log(window.location.href)
    chrome.contextMenus.create(context);
};

let checkUrl = function (url) {
    let u  = url.split('/');
    return u
}

// showContextMenu();
console.log(checkUrl(url));