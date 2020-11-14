

function* g1 (){
    console.log("firstname");
    yield 'First yield ran..';
    console.log("second name");
    yield 'Second yield ran..';
    return 'last yeld returned';
}

var g = g1();
/*
console.log(g.next());
console.log(g.next());
console.log(g.next());
*/

for(let a of g){
    console.log(a);
}

