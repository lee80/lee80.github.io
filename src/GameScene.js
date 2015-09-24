var GameLayer = cc.Layer.extend({
	_background:null,
	ctor: function() {

		this._super();

		var size = cc.winSize;

		//背景
		this._background = new cc.Sprite(res.scene_png);
		this._background.setPosition(size.width / 2, size.height / 2);
		this.addChild(this._background);

		//动画层
		this.addChild(new AnimationLayer(), 0, TagOfLayer.Animation);
		//状态层
		this.addChild(new StatusLayer(), 0, TagOfLayer.Status);
		
		
		
		return true;
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});