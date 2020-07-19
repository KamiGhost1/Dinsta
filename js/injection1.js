var imgs = document.getElementsByClassName('FFVAD');
var elem =[];
for(let i =0;i<imgs.length;i++){
    elem.push(imgs[i].getAttribute('src'))
}
console.log(elem);