


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
                console.log(this.container)
                this.dataFilter = document.querySelector('.datefilter');
                console.log(this.dataFilter)
                this.timeFilter = document.querySelector('.timefilter');
                console.log(this.timeFilter)
                this.campFilter = document.querySelector('.campfilter');
                console.log(this.campFilter)
                this.items = getFilterElem(this.allItems);
                this.use = document.querySelector('.blueBtn');
                this.cancel = document.querySelector('.cancelBtn');
                this._render();
                this._hendleEvent();
            },
            _render() {
                let htmlStr =''
                this.items.forEach((item,i) => {
                    htmlStr += renderTemplateItem(item, i);
                })
                this.container.innerHTML = htmlStr;
            },
            _hendleEvent() {

                this.dataFilter.addEventListener('input', event => {
                    let reg = new RegExp("^(0?[1-9]|[12][0-9])[\.](0?[1-9]|1[012])$", "i");
                    let dateArray =  this.dataFilter.getElementsByTagName('input');
                    actionDateFilter(event, reg, dateArray, this.period)
                })

                this.timeFilter.addEventListener('click', event => {
                    let arr = this.timeFilter.getElementsByClassName('square')
                    actionTimeFilter(event, this.weeks, arr)
                })

                this.campFilter.addEventListener('click', event => {
                    actionCampFilter(event,this.camps, this.campArray)
                })
                this.cancel.addEventListener('click', event => {
                  this.actionCancel = true
                })
                this.use.addEventListener('click', event => {

                })
            }
        }
    return filter
    }

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
            if(this.actionCancel){
                event.target.id = ''
            }
            return event.target.id
        })
    }


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
     if(this.actionCancel){
         campArray = [];
         let activeCamp  = this.campFilter.getElementsByClassName('.square_img')
         Object.values(activeCamp).forEach(item => {
             item.style.opacity = 0;
         })
     }
     return campArray
 }

 function actionDateFilter(event, reg, dateArray, period) {
     Object.values(dateArray).forEach( date => {
         if(event.target.id == date.id){

             if(reg.test(event.target.value)){
                 event.target.style.border = '1px solid #C0E8E4'
                 period.push(event.target.value)
             } else event.target.style.border = '1px solid #E79BCE';
         }
     })
     if(this.actionCancel){
         period = [];
         Object.values(dateArray).forEach( date => {
             date.style.border = '1px solid #C0E8E4'
             date.value = ''})
     }
     return period
 }

    function getFilterElem(allItems) {
        arr = [];
        for (let i = 0; i < allItems.length; i++) {
            arr.push(allItems[i]);
        }
        return arr;
    }

    function renderTemplateItem(item, i){
        return `<div>
                        <img src="" alt="">
                        <p></p>
                </div>`
    }
