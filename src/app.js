
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;
		
		//背景
		var background = new cc.Sprite(res.scene_png);
		background.setPosition(size.width/2,size.height/2);
		this.addChild(background);
		
		//开始按钮
		var startBtn = new ccui.Button(res.start_png);
		startBtn.setPosition(size.width/2,size.height/2);
		this.addChild(startBtn);
		
		startBtn.addClickEventListener(function (){
			
			cc.director.runScene(new GameScene());
			
		});

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

