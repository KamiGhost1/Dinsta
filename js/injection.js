var url = window.location.href
url = url.split('/');
if(url[2]!="www.instagram.com"){
    alert('Open www.instagram.com')
}else {
    if(url[3]==="p"){
        var elem =document.querySelector('._97aPb ');
        var i =0;
        var check = elem;
        var src = '';
        var srcs =[];
        while(check.children.length>0){
            check = check.children[0];
            i++
        }
        if(i ===3){
            elem = document.querySelector('._97aPb ').children[0].children[0].children[1].children[0].children[0].children[0].children[0];
            for(let i = 1; i<elem.children.length;i++){
                if(elem.children[i].children[0].children[0].children[0].children[0].children[0].getAttribute('src') ===null){
                    srcs.push(elem.children[i].children[0].children[0].children[0].children[0].children[0].children[0].getAttribute('src'))
                }else{
                    srcs.push(elem.children[i].children[0].children[0].children[0].children[0].children[0].getAttribute('src'))
                }
            }
            console.group('DINSTA')
            srcs.forEach((el)=>{
                console.log(el);
            })
            console.groupEnd()
        }else{
            if(i===4){
                elem = document.querySelector('._97aPb ').children[0].children[0].children[0].children[0]
                src = elem.getAttribute('src')
                console.group('DINSTA')
                console.log(src)
                console.groupEnd()
            }
            if(i===5){
                elem = document.querySelector('._97aPb ').children[0].children[0].children[0].children[0].children[0]
                src = elem.getAttribute('src')
                console.group('DINSTA')
                console.log(src)
                console.groupEnd()
            }
        }
    }else{
        alert('Open photo!')
    }
}
