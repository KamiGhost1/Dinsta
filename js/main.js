document.addEventListener('DOMContentLoaded',function () {
    let img = document.getElementById('img');
    let btn1 = document.getElementById('test');
    btn1.addEventListener('click',()=>{
        chrome.tabs.getSelected(null, (tab)=>{
            chrome.tabs.executeScript(tab.id,{code:"alert(window.location.href)"})
        })
    }, false)

    let btn2 = document.getElementById('download');
    btn2.addEventListener('click', ()=>{
        chrome.tabs.getSelected(null, (tab)=>{
            chrome.tabs.executeScript(tab.id, {file:"js/injection.js"}, function (responce) {
                window.close()
            })
        })
    })
},false)
