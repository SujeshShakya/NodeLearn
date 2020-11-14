//this referring to global function

function globalDemo (title){
    console.log("Refers to global object",this);
}

const obj = {
    title: 'a',
    name: 'sujesh',
    location: ['Avondale', 'Glendene'],
    showtitle () {
        console.log("Refers to current obj",this);
    },
    showLocations () {
        this.location.forEach(element =>{   
            console.log(this);
        })

        // this.location.forEach(element, function(){

        // })

        
        
        // (function() {
        //     console.log(this.title + '' + this.name);
        // },this)
    }
}


obj.showLocations()
