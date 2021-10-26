
    function initFilterpage(){

        const filter = {
            allItems:[ 1, 2, 3, 4, 5, 6],
            items:[],
            weeks: ['week1','week2','week3','week4'],
            camps: ['camp1', 'camp2', 'camp3', 'camp4'],
            period: [],
            dataFilter: null,
            campFilter: null,
            timeFilter: null,
            container: null,
            campArray:[],
            use: null,
            cancel: null,
            actionCancel: false,

            init() {
                this.container = document.querySelector('.postcards');
                this.dataFilter = document.querySelector('.datefilter');
                this.timeFilter = document.querySelector('.timefilter');
                this.campFilter = document.querySelector('.campfilter');
                this.items = getFilterElem(this.allItems);
                this.use = document.querySelector('.blueBtn');
                this.cancel = document.querySelector('.cancelBtn');
                this._render();
                this._hendleEvent();
            },
            /*render Postcards*/
            _render() {
                let htmlStr =''
                this.items.forEach((item,i) => {
                    htmlStr += renderTemplateItem(item, i);
                })
                this.container.innerHTML = htmlStr;
            },
            /*click handling*/
            _hendleEvent() {
                let arr = this.timeFilter.getElementsByClassName('square')
                let reg = new RegExp("^(0?[1-9]|[12][0-9])[\.](0?[1-9]|1[012])$", "i");
                let dateArray =  this.dataFilter.getElementsByTagName('input');
                let campArr = this.campFilter.getElementsByClassName('square_img')

                this.dataFilter.addEventListener('input', event => {
                    actionDateFilter(event, reg, dateArray, this.period)
                })

                this.timeFilter.addEventListener('click', event => {
                    actionTimeFilter(event, this.weeks, arr)
                })

                this.campFilter.addEventListener('click', event => {
                    actionCampFilter(event,this.camps, this.campArray)
                })

                this.cancel.addEventListener('click', () => {
                    clickCancel(dateArray, arr, campArr)
                    })

                this.use.addEventListener('click', event => {
                    /*filtering logic*/
                })
            }
        }
    return filter
    }
function changeStyle(arr, value) {
    Object.values(arr).forEach( time =>{
        time.style.opacity = value;
    })
}
/*click handling cancels button*/
function clickCancel(dateArray, arr, campArr){
    this.actionCancel = true
    changeStyle(arr, 0)
    this.campArray = [];
    changeStyle(campArr, 0)
    this.period = [];
    Object.values(dateArray).forEach( date => {
        date.style.border = '1px solid #C0E8E4';
        date.value = '';})
}
/*Time filter click handling*/
    function actionTimeFilter(event, weeks, array) {

        weeks.forEach( week => {
            if(event.target.id == week) {
                let parent = event.target.parentNode;
                let child = parent.querySelector('.square');
                child.style.opacity = 1;
                Object.values(array).forEach(item => {
                    if(item != child && item.style.opacity == 1){
                        item.style.opacity = 0;
                    }
                })
            }
        })
        return event.target.id
    }
 /*Camp filter click handling*/
 function actionCampFilter(event, camps, campArray) {

     camps.forEach( camp =>{
         if(event.target.id == camp){
             let parent = event.target.parentNode;
             let child = parent.querySelector('.square_img');
             if(child.style.opacity == 0){
                 child.style.opacity = 1;
                 campArray.push(event.target.id);
             }
             else {child.style.opacity = 0;
             let index = campArray.indexOf(event.target.id);
             campArray.splice(index,1);}
         }
     })
     return campArray
 }
/*Date filter click handling*/
 function actionDateFilter(event, reg, dateArray, period) {
     Object.values(dateArray).forEach( date => {
         if(event.target.id == date.id){

             if(reg.test(event.target.value)){
                 event.target.style.border = '1px solid #C0E8E4'
                 period.push(event.target.value)
             } else event.target.style.border = '1px solid #E79BCE';
         }
     })
     return period
 }
/*creating an array for rendering*/
    function getFilterElem(allItems) {
        arr = [];
        for (let i = 0; i < allItems.length; i++) {
            arr.push(allItems[i]);
        }
        return arr;
    }
/*rendering*/
    function renderTemplateItem(item, i){
        return `<div>
                        <img src="" alt="">
                        <p></p>
                </div>`
    }
