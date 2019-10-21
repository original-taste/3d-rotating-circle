
var canvas = document.querySelector('canvas');
var c =  canvas.getContext('2d');


canvas.addEventListener('mousemove',function(e){set(e.x,e.y);});
window.addEventListener('resize',()=>{reset();});
// canvas.addEventListener('')

var radius = 0;
var time = 0;
var color = 0;
var blob = [];
reset();
function reset(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for(let i = 0 ;i<15;i++){
        blob[i] = new Blob();
    }    
}
animate();
function map(value,min_value,max_value,mod_min_value,mod_max_value){
    return (((value-min_value)/(max_value - min_value)*(mod_max_value - mod_min_value))+mod_min_value);
}

function set(x,y){
    // for(let i = 0;i<blob.length;i++){
    //    blob[i].next_sun_pos.x = x;
    //    blob[i].next_sun_pos.y = y;
    // }
}

setInterval(() => {animate();
    
}, 7);
function animate(){
    // c.clearRect(0,0,canvas.width,canvas.height);
    c.beginPath();
    c.fillStyle = 'rgba(0,0,0,0.05)';
    c.fillRect(0,0,canvas.width,canvas.height);
    // requestAnimationFrame(animate);
   
    // radius = map(Math.sin(time),-1,1,0,100);
    // color = map(radius,0,100,0,255);
    // let x = radius*Math.cos(time)+200;
    // let y = radius*Math.sin(time)+200;
    // c.beginPath();
    // c.fillStyle = 'rgb('+color+',255,255)';
    // c.arc(x,y,radius,0,Math.PI*2,false);
    // c.stroke();
    // c.fill();
    // console.log('running....');

    for(let i = 0 ;i<blob.length;i++){
        blob[i].update();
    }
    time+=0.02;
}

function Blob(){
    this.pos = {
        x:0,y:0
    };
    this.sun_pos = {
        x:200,y:200,seperation:(Math.random()*60)+30,speed:(Math.random()*0.8)+0.2
    };
    this.next_sun_pos = {
        x:200,y:200,seperation:(Math.random()*80)+50,speed:(Math.random()*0.9)+0.5
    };
    this.velocity = {
        x:0,y:0
    }
    this.p = {
        x:canvas.width/2,y:canvas.height/2,dis:150
    }
    this.radius = 10;

    this.update = function(){
        this.next_sun_pos.x = this.p.dis*Math.cos(-time*0.7)+this.p.x;
        this.next_sun_pos.y = this.p.dis*Math.sin(-time*0.7)+this.p.y;
        this.pos.x = this.sun_pos.seperation*Math.cos(time*this.sun_pos.speed)+this.sun_pos.x;
        this.pos.y = this.sun_pos.seperation*Math.sin(time*this.sun_pos.speed)+this.sun_pos.y;
        this.velocity.x = this.next_sun_pos.x-this.sun_pos.x;
        this.velocity.y = this.next_sun_pos.y-this.sun_pos.y;
        let mag = 20;//Math.sqrt(Math.pow(this.velocity.x,2)+Math.pow(this.velocity.y,2));
        this.velocity.x/=mag;
        this.velocity.y/=mag;
        // console.log(this.velocity.x+ "   "+ this.velocity.y)

        this.sun_pos.x+=this.velocity.x;
        this.sun_pos.y+=this.velocity.y;
        this.move();
    }
    this.move = function(){
        this.show();
    }
    this.show = function(){
        c.beginPath();
        c.strokeStyle = 'rgba(150,150,255,1)';
        
        c.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI*2);
        c.stroke();
        c
    }
}