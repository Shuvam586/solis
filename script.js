image = document.querySelector('.screen-background-1 #gadha');

lmao = (800 - window.innerHeight)/4;

if (window.innerHeight < 800) {
    image.style.transform = 'translateY(-' + String(lmao) + 'px)';
}
console.log("lmao")