(function () {

    clearEmptyTags()

    function clearEmptyTags(){
        const elems = [...document.body.getElementsByTagName("p")]
        elems.forEach(elem => {
            
            if(!elem.innerHTML.trim()) {
                console.log(elem.innerHTML)
                elem.remove()
            }
        })
    }

}());