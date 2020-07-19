document.addEventListener('DOMContentLoaded',function () {


    let btn2 = document.getElementById('download');
    btn2.addEventListener('click', ()=>{
        chrome.tabs.getSelected(null, (tab)=>{
            chrome.tabs.executeScript(tab.id, {file:"js/injection.js"}, function (responce) {
                window.close()
            })
        })
    })
},false)
