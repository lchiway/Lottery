var prize_array = ["自选奖品一份", "和好朋友坐在一起吃一顿午餐", "自选奖品两份", "当小助手一次", "再来一次抽奖", "自选奖品三份", "和好朋友坐在一起上一节语文课", "自选奖品一份", "当小老师一次", "自选奖品两份"];
var color = [];
var num = 10
var step = 2 * Math.PI / num;
var outerR = 400;
//轮盘的大小var 
interR = 100;
//内存空白圆的大小
var beginAngle = 50;
//旋转起来时默认开始旋转的度数，度数愈大旋转的初始速度愈大
var radio = 0.95;
//旋转速度衰减系数，影响旋转时间
var t = null;
var context;
var lotteryMain;
var res;
var aniId;

// now we will setup our basic variables for the demo
var canvas;
var ctx;
		// full screen dimensions
var	cw = window.innerWidth,
		ch = window.innerHeight,
		// firework collection
		fireworks = [],
		// particle collection
		particles = [],
		// starting hue
		hue = 120,
		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
		limiterTotal = 5,
		limiterTick = 0,
		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		timerTotal = 80,
		timerTick = 0,
		mousedown = false,
		// mouse x coordinate,
		mx,
		// mouse y coordinate
		my;



window.onload=function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	// set canvas dimensions
	canvas.width = cw;
	canvas.height = ch;

    load_num();
    load_prize_array();
    for (var i = 0; i < num; i++) {
        color.push(getColor());
    }
    var myCanvas = document.getElementById("myCanvas");
	lotteryMain = document.getElementById("lotteryMain");
    context = myCanvas.getContext("2d");
    context.translate(470, 470);
    init(context);
	addListeners();
};

function addListeners(){
	// mouse event bindings
	// update the mouse coordinates on mousemove
	canvas.addEventListener( 'mousemove', function( e ) {
		mx = e.pageX - canvas.offsetLeft;
		my = e.pageY - canvas.offsetTop;
	});

	// toggle mousedown state and prevent canvas from being selected
	canvas.addEventListener( 'mousedown', function( e ) {
		e.preventDefault();
		mousedown = true;
	});

	canvas.addEventListener( 'mouseup', function( e ) {
		e.preventDefault();
		mousedown = false;
		canvas.style.display = "none"
		lotteryMain.style.display = "";
		stopLoop();
	});
}

function load_num(){
    if(window.sessionStorage.getItem("num")){
        num = window.sessionStorage.getItem("num");
        step = 2 * Math.PI / num;
    }
}

function load_prize_array(){
    if(window.sessionStorage.getItem("prize")){
        prize_array = window.sessionStorage.getItem("prize").split(',');
        prize_array.slice
    }
}

function start() {
    if (t) { alert("正在抽奖，请勿重复点击！"); }
        //alert(t);
        var step = beginAngle + Math.random() * 360;
        var angle = 0;
        t = setInterval(function () {
            step *= radio;
            if (step <= 0.1) {
                clearInterval(t);
                t = null;
                angle += 90;
                if (angle > 360) { angle -= 360; }
                var pos = Math.ceil((angle) / (360/num));
                res = prize_array[num - pos];
                // context.save();
                // context.beginPath();
                // context.font = "23px 微软雅黑";
                // context.fillStyle = "#f00";
                // context.textAlign = "center";
                // context.textBaseline = "middle";
                // context.fillText(res, 0, 0);
                // context.restore();
				lotteryMain.style.display = "none"
				canvas.style.display = "";
                loop();
            } else {
                context.clearRect(-250, -250, 500, 500);
                angle += step;
                if (angle > 360) { angle -= 360; }
                context.save();
                context.beginPath();
                context.rotate(angle * Math.PI / 180);
                init(context);
                context.restore();
                // Arrow(context);
            }
        }, 60);
}

function go_settings(){
    location.assign('./setting/settings.html')
}

// function Arrow(context) {
//     context.translate(400,0);
//     context.save();
//     context.beginPath();
//     context.lineWidth = 5;
//     context.moveTo(170, 0);
//     context.lineTo(180, 15);
//     context.lineTo(180, 5);
//     context.lineTo(250, 5);
//     context.lineTo(250, -5);
//     context.lineTo(180, -5);
//     context.lineTo(180, -15);
//     context.closePath();
//     context.fill();
//     context.restore();
// }
function init(context) {
    for (var i = 0; i < num; i++) {
        context.save();
        context.beginPath();
        context.moveTo(0, 0);
        context.fillStyle = color[i];
        context.arc(0, 0, outerR, i * step, (i + 1) * step);
        context.fill();
        context.restore();
    }
    context.save();
    context.beginPath();
    context.fillStyle = "#fff";
    context.arc(0, 0, interR, 0, 2 * Math.PI);
    context.fill(); context.restore();
    for (var i = 0; i < num; i++) {
        context.save();
        context.beginPath();
        context.fillStyle = "#fff";
        context.font = "20px 微软雅黑";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.rotate(i * step + step / 2);
        context.fillText(prize_array[i], (outerR + interR) / 2, 0);
        context.restore();
    }
}

function myRandom(size){
	// console.log(Math.floor(Math.random() * size));
    return Math.floor(Math.random() * size);
}

function getColor() {
    return "rgb(" + myRandom(255) + "," + myRandom(255) + "," + myRandom(255) + ")";
}





window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();

// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	// distance from starting point to target
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 3;
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 2;
	this.acceleration = 1.05;
	this.brightness = random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	var vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// draw firework
Firework.prototype.draw = function() {
	ctx.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx.stroke();
	
	ctx.beginPath();
	// draw the target for this firework with a pulsing circle
	ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx.stroke();
}

// create particle
function Particle( x, y ) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 5;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 10 );
	// friction will slow the particle down
	this.friction = 0.95;
	// gravity will be applied and pull the particle down
	this.gravity = 1;
	// set the hue to a random number +-20 of the overall hue variable
	this.hue = random( hue - 20, hue + 20 );
	this.brightness = random( 50, 80 );
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = random( 0.015, 0.03 );
}

// update particle
Particle.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	// slow down the particle
	this.speed *= this.friction;
	// apply velocity
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	// fade out the particle
	this.alpha -= this.decay;
	
	// remove the particle once the alpha is low enough, based on the passed in index
	if( this.alpha <= this.decay ) {
		particles.splice( index, 1 );
	}
}



// draw particle
Particle.prototype.draw = function() {
	  
  ctx. beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.stroke();
  
  
}

// create particle group/explosion
function createParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = 30;
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// main demo loop
function loop() {
	// this function will run endlessly with requestAnimationFrame
	aniId = requestAnimFrame( loop );
	
	// increase the hue to get different colored fireworks over time
	hue += 0.5;
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, cw, ch );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';
	
    // var result = "QSVFOSU5QiU4NCUyMCVFNyVBNSU5RCVFNCVCRCVBMDIwMjIlMjBIQVBQWSUyME5FVyUyMFlFQVI=";  
	// var decodeTxt = window.atob(result);
	// decodeTxt = decodeURI(decodeTxt);
	decodeTxt = res;
  ctx.font = "100px sans-serif";
  var txt = ctx.measureText("  恭喜获得：");
  var textData = ctx.measureText(decodeTxt);
  ctx.fillStyle = "rgba("+parseInt(255)+","+parseInt(0)+","+parseInt(0)+",0.3)";
  ctx.fillText("  恭喜获得：",cw /2-txt.width/2,ch*2/5);
  ctx.fillText(decodeTxt,cw /2-textData.width/2,ch*3/5); 
  
	// loop over each firework, draw it, update it
	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw();
		fireworks[ i ].update( i );
	}
	
	// loop over each particle, draw it, update it
	var i = particles.length;
	while( i-- ) {
		particles[ i ].draw();
		particles[ i ].update( i );
	}
	
	// launch fireworks automatically to random coordinates, when the mouse isn't down
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
      
      for(var h=0;h<50;h++)
      {
           fireworks.push( new Firework( cw / 2, ch/2, random( 0, cw ), random( 0, ch  ) ) );
      }
      
      
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
	
	// limit the rate at which fireworks get launched when mouse is down
	if( limiterTick >= limiterTotal ) {
		if( mousedown ) {
			// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
			fireworks.push( new Firework( cw / 2, ch/2, mx, my ) );
			limiterTick = 0;
		}
	} else {
		limiterTick++;
	}
}

function stopLoop(){
	cancelAnimationFrame(aniId);
}