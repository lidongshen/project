function tabs(box,content) {
    var wbox = document.querySelectorAll(box)
    var lcont = document.querySelectorAll(content)
    for (let i = 0; i < wbox.length; i++) {
        wbox[i].onclick = function () {
            for (let j = 0; j < wbox.length; j++) {
                lcont[j].style.display = "none"
                wbox[j].style.color = "black"
            }
            lcont[i].style.display = "block"
            this.style.color = "tomato"
        }
    }
}