var StatusLayer = cc.Layer.extend({
	_score: null,
	_time: null,
	_countdown: 0,
	_scoreValue: 0,
	_lifeValue:3,
	_hearts:new Array(),
	ctor: function() {
		this._super();
		this.init();
	},

	init: function() {
		this._super();

		var size = cc.director.getWinSize();
		this._countdown = 10000;
		this._scoreValue = 0;
		//分数
		this._score = new cc.LabelTTF("0", "", 50);
		this._score.setAnchorPoint(0, 1);
		this._score.setPosition(10, size.height - 10);
		this.addChild(this._score);
		this._hearts=new Array();
		for(i=0;i<3;i++){
			var heart = new cc.Sprite(res.life_png);
			heart.setPosition(size.width-120+45*i, size.height-30);
			this.addChild(heart);
			this._hearts.push(heart);
		}

		//倒计时
//		this._time = new cc.LabelTTF(Math.floor(this._countdown / 1000) + "'", "", 50);
//		this._time.setAnchorPoint(1, 1);
//		this._time.setPosition(size.width - 10, size.height - 10);
//		this.addChild(this._time);
//		this.schedule(this.countTime, 1); //1秒更新一次
		
	},
	addLife:function(num){
		this._lifeValue=num;
		if(this._lifeValue==0){
			this._hearts[0].setVisible(false);
			this._hearts[1].setVisible(false);
			this._hearts[2].setVisible(false);
		}
		if(this._lifeValue==1){
			this._hearts[0].setVisible(false);
			this._hearts[1].setVisible(false);
			this._hearts[2].setVisible(true);
		}
		if(this._lifeValue==2){
			this._hearts[0].setVisible(false);
			this._hearts[1].setVisible(true);
			this._hearts[2].setVisible(true);
		}
		if(this._lifeValue==3){
			this._hearts[0].setVisible(true);
			this._hearts[1].setVisible(true);
			this._hearts[2].setVisible(true);
		}
	},
	countTime:function(){
		if (this._countdown >= 1000) {
				this._countdown = this._countdown - 1000;
			}
			this._time.setString(Math.floor(this._countdown / 1000) + "'");
			if (this._countdown ==0) {
				this.unschedule(this.countTime);
				cc.log("stop");
			}
	},
	addScore:function(num){
		this._score.setString(num);
	}

});

