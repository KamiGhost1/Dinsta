document.addEventListener('DOMContentLoaded', function () {
    var listSRCS =[];

    let saveList= function(list){
        var ar = [];
        if(localStorage.length >0){
            for(let i =0;i<localStorage.length;i++){
                ar.push(localStorage.getItem(`${i}`))
            }
            var exist = false;
            for(let i =0;i<list.length;i++){
                for(let j=0;j<ar.length;j++){
                    if(ar[j]===list[i]){
                        exist = true
                        break
                    }
                }
                if(!exist){
                    ar.push(list[i])
                }else{
                    exist = false
                }
            }
        }else{
            for(let i=0;i<list.length;i++){
                ar.push(list[i])
            }
        }
        localStorage.clear()
        for(let i=0;i<ar.length;i++){
            localStorage.setItem(`${i}`,ar[i])
        }
    }

    let addSrc = function(src){
        let exist = false;
        for(let i = 0;i<listSRCS.length;i++){
            if(listSRCS[i]===src){
                exist = true
                break
            }
        }
        if(!exist){
            listSRCS.push(src)
        }
    }

    let addSrcs = function(src){
        let exist = false;
        for(let i=0;i<src.length; i++){
            for(let j =0; j<listSRCS.length;j++){
                if(src[i] === listSRCS[j]){
                    exist = true
                }
            }
            if(!exist){
                listSRCS.push(src[i])
            }else{
                exist = false;
            }
        }
    };

    let openSrc = function(src){
        chrome.tabs.create({url:src});
    }

    let renderLi = function(){
        var li = document.getElementById('li');
        var html = '';
        var list = [];
        for(let i=0;i<localStorage.length;i++){
            list.push(localStorage.getItem(`${i}`))
        }
        for(let i = 0;i<list.length;i++){
            // html+=`<li><a href="${list[i]}">Image ${i+1}</a></li>`
            html+=`<img src="${list[i]}" alt="" style="width: 100px;height: 100px; margin-top: 10px">`
        }
        li.innerHTML = html;
    }

    chrome.runtime.onMessage.addListener(async (msg,sender, sendResponse)=>{
        if(msg.srcs){
            await addSrcs(msg.data);
        }else {
            await  addSrc(msg.data);
        }
        saveList(listSRCS)
        renderLi()
        sendResponse({status:200})
    })

    let btn2 = document.getElementById('add');
    btn2.addEventListener('click', ()=>{
        chrome.tabs.getSelected(null, (tab)=>{
            chrome.tabs.executeScript(tab.id, {file:"js/injection.js"}, function (responce) {

            })
        })
    })

    let btnDel = document.getElementById('del')
    btnDel.addEventListener('click', ()=>{
        localStorage.clear();
        renderLi()
        window.close()
    })

    renderLi()
},false)
