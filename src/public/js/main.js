(function () {

    clearEmptyTags()
    fixInlineCode();

    function clearEmptyTags(){
        const elems = [...document.body.getElementsByTagName("p")]
        elems.forEach(elem => {
            
            if(!elem.innerHTML.trim()) {
                console.log(elem.innerHTML)
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

}());