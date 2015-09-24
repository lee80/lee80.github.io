
var OverLayer = cc.Layer.extend({
    _score:null,
    ctor:function (args) {

        this._super();

        var size = cc.winSize;
		
		//背景
		var background = new cc.Sprite(res.scene_png);
		background.setPosition(size.width/2,size.height/2);
		this.addChild(background);
		
		//分数
		this._score = new cc.LabelTTF(args, "", 50);
		this._score.setPosition(size.width/2, size.height/2 + 100);
		this.addChild(this._score);
		
		//继续按钮
		var continueBtn = new ccui.Button(res.continue_png);
		continueBtn.setPosition(size.width/2,size.height/2-100);
		this.addChild(continueBtn);
		
		continueBtn.addClickEventListener(function (){
			
			cc.director.runScene(new GameScene());
			
		});

        return true;
    }
});

var OverScene = cc.Scene.extend({
	score:0,
	ctor:function (args) {
		this._super();
		this.score=args;
	},
    onEnter:function () {
        this._super();
        var layer = new OverLayer(this.score);
        this.addChild(layer);
    }
});

