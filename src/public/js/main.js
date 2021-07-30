(function () {

    clearEmptyTags();
    fixInlineCode();
    makeSiteVisible();

    function clearEmptyTags(){
        const elems = [...document.body.getElementsByTagName("p")]
        elems.forEach(elem => {
            
            if(!elem.innerHTML.trim()) {
                elem.remove()
            }
        })
    }

    function fixInlineCode() {
        const elems = [...document.body.getElementsByTagName("code")]
        elems.forEach(el => {
            if (el.parentElement && el.parentElement.nodeName !== "PRE"){
                el.setAttribute("class", "language-markup")
            }
        })
    }

    function makeSiteVisible() {
        setTimeout(() => {
            document.querySelector("body").classList.add("visible")
        }, 200)
        
    }

}());