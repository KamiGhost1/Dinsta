

document.addEventListener('DOMContentLoaded', function () {
    var listSRCS =[];

    sub = {
        clocks(time){
            if (time < 10){
                return '0'+time
            }else{
                return time
            }
        },
        getTime() {
            let now = new Date()
            let time = `${this.clocks(now.getHours())}-${this.clocks(now.getMinutes())}-${this.clocks(now.getSeconds())}.jpg`
            return time
        },
    }


    let downloadImages = async function(){
        for(var i =0;i<localStorage.length;i++){
            await chrome.downloads.download({
                url:localStorage.getItem(`${i}`),
                filename:sub.getTime()
             })
        }
    }

    let deleteItem = function(listId){
        var items =[]
        for(let i=0;i<localStorage.length;i++){
            items.push(localStorage.getItem(`${i}`))
        }
        items.splice(listId,1);
        localStorage.clear()
        for(let i =0;i<items.length;i++){
            localStorage.setItem(`${i}`, items[i])
        }
    }

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

    let addAttr = function(){
        for(let i =0; i<localStorage.length;i++){
            // document.getElementById('di'+i).setAttribute('onclick', openSrc(localStorage.getItem(`${i}`)))
            document.getElementById('di'+i).addEventListener('click',()=>{
                openSrc(localStorage.getItem(`${i}`))
            })
            document.getElementById('Xi'+ i).addEventListener('click',async ()=>{
                await deleteItem(i)
                renderLi()
            })
        }
    };

    let renderLi = function(){
        var li = document.getElementById('li');
        var html = '';
        var list = [];
        for(let i=0;i<localStorage.length;i++){
            list.push(localStorage.getItem(`${i}`))
        }
        for(let i = 0;i<list.length;i++){
            // html+=`<li><a href="${list[i]}">Image ${i+1}</a></li>`
            html+=`<div class="d-flex justify-content-around align-items-center" style=" margin-top: 10px;">
            <img src="${list[i]}" alt="" style="width: 100px;height: 100px;" id="di${i}">
            <h1 id="Xi${i}">X</h1>
        </div>`
        }
        li.innerHTML = html;
        addAttr()
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

    let btnDL = document.getElementById('download')
    btnDL.addEventListener('click', async ()=>{
        await downloadImages()
        localStorage.clear()
        window.close()
    })

    renderLi()
},false)
