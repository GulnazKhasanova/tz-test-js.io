window.onload = function(){
    let showPoint = document.getElementsByClassName('arrow')
    let sidebar = document.querySelector('.sidebar')
    let datefilter = document.querySelector('.datefilter');
    let timefilter = document.querySelector('.timefilter');
    let campfilter = document.querySelector('.campfilter');

sidebar.addEventListener('click', e => {


    hiddenShow('date', datefilter, e)
    hiddenShow('time', timefilter, e)
    hiddenShow('camp', campfilter, e)
})
    function hiddenShow(id, filters, e){
        let nextEl = e.target.nextSibling.nextSibling

        if(e.target.id === id && e.target.classList.contains("active") === true){
            console.log('true')
            filters.style.display = 'none';
            e.target.classList.remove("active");
            nextEl.classList.add("active");

        }else if(e.target.id === id && e.target.classList.contains("active") === false) {
            console.log('false')
            filters.style.display = 'flex';
            e.target.classList.add("active");
            nextEl.classList.remove("active");
        }
    }
}