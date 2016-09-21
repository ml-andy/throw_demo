$(document).ready(function(){
	var o ={
		wrp: $('.wrapper'),
		ball: $('.ball'),
		ballTime: '',
		t:0,
		ctrl: false,
		y1:0,
		y2:0
	};

	var edown = 'mousedown',
		eup = 'mouseup',
		emove = 'mousemove';

	o.r = 0.5; 
	o.del = 2;//阻力
	o.fps = 10; //fps

	if(!device.desktop()){
		edown = 'touchstart';
		eup = 'touchend';
		emove = 'touchmove';
		o.del = 0.3; //阻力
		// o.r = 1;
		o.fps = 5; //fps
	}

	// o.ball
	o.ball.on(edown,function(e){
		if(!device.desktop()){e = e.originalEvent.touches[0];}
		$('.wrapper').on(emove,o_ball_move);
		o.ctrl = true;
		o.t = 0;
		o.y1 = e.pageY;
		o.y2 = e.pageY;
		o.ballTime = setInterval(function(){
			o.t +=1;
		},1);
	});
	$('body').on(eup,function(){
		$('.wrapper').off(emove,o_ball_move);
		if(o.ctrl) ballEnd();
	});

	function o_ball_move(e){
		if(!device.desktop()){e = e.originalEvent.touches[0];}
		// console.log(e.pageY);
		o.ballbottom = o.wrp.height() - e.pageY - o.ball.height() / 2;
		o.y2 = e.pageY;
		o.ball.css('bottom',o.ballbottom);
	}
	function ballEnd(){
		console.log('o.y1:' + o.y1);
		console.log('o.y2:' + o.y2);
		if(o.y2 == o.y1) return
		o.ctrl = false;
		clearInterval(o.ballTime);
		var s = o.y2 - o.y1;
		var a = 2 * s / o.t / o.t;
		var f = a;
		o.v0 = a * o.t;
		o.t2 = Math.abs(Math.floor(o.v0 * 1 / o.r));
		o.s2 = o.v0 * o.t2 * -1 * o.del;
		o.a2 = Math.sqrt(o.s2 * 2);
		console.log('o.v0:'+o.v0);
		console.log('o.t2:'+o.t2);
		console.log('o.s2:'+o.s2);
		console.log('o.a2:'+o.a2);
		var goal = o.ballbottom + o.s2;
		if(goal > o.wrp.height() - o.ball.height()) goal = o.wrp.height() - o.ball.height();
		else if(goal < 0) goal = 0;
		o.ball.animate({'bottom':goal},o.t2 * o.fps,'easeOutQuart');
	}
})//ready end  
