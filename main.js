var res = {
	continue_png: "res/continue.png",
	//  scene_png : "res/scene.jpg",
	scene1_png: "res/scene1.jpg",
	scene2_png: "res/scene2.jpg",
	scene3_png: "res/scene3.jpg",
	start_png: "res/start.png",
	coin_png: "res/coins.png",
	ninja_png: "res/ninja.png",
	ninja_left_png: "res/ninja_left.png",
	ninja_right_png: "res/ninja_right.png",
	ninja_hit_png: "res/ninja_hit.png",
	left_png: "res/left.png",
	right_png: "res/right.png",
	rock_png: "res/rock.png",
	life_png: "res/life.png",
	cloud1_png: "res/cloud_low_1.png",
	cloud2_png: "res/cloud_low_2.png",
	cloud3_png: "res/cloud_high_1.png",
	cloud4_png: "res/cloud_high_2.png"
};

var g_resources = [];

$.ajax({
	async: false,
	url: "http://www.ylhyx.com/wxgame_admin/WxActivity!htmlGetActivityInfo",
	dataType: 'jsonp',
	jsonp: "jsonpcallback",
	data: {
		"activityId": 550,
		"openId": "asdasd1234234",
		"startType": 1
	},
	timeout: 12000,
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		//alert("与服务器连接超时！请确保网络连接正常后再加载。");
	},
	success: function(json) {
		res.scene_png = "res/scene.jpg";
		for (var i in res) {
			g_resources.push(res[i]);
		}
	}
});

cc.game.onStart = function() {
	if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
		document.body.removeChild(document.getElementById("cocosLoading"));
	// Pass true to enable retina display, disabled by default to improve performance
	cc.view.enableRetina(false);
	// Adjust viewport meta
	cc.view.adjustViewPort(true);
	// Setup the resolution policy and design resolution size
	cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.FIXED_WIDTH);
	// The game will be resized when browser size change
	cc.view.resizeWithBrowserSize(true);
	cc.director.setDisplayStats(true);
	//load resources
	cc.LoaderScene.preload(g_resources, function() {
		cc.director.runScene(new HelloWorldScene());
	}, this);
};
cc.game.run();