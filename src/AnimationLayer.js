var isLeft = false;
var isRight = false;
var ninja=null;
var AnimationLayer = cc.Layer.extend({
	ninja: null,
	size: 0,
	coins: new Array(),
	rocks: new Array(),
	hearts: new Array(),
	heroWidth: 80,
	heroSpeed: 5,
	lifeValue: 3,
	scoreValue: 0,
	level:0,
	ctor: function() {
		this._super();
		this.init();
	},
	init: function() {
		this._super();
		var size = cc.director.getWinSize();
		this.size = size;

		//左箭头
		var leftBtn = new cc.Sprite(res.left_png);
		leftBtn.scale = 0.7;
		leftBtn.opacity = 100;
		leftBtn.setPosition(50, 80);
		this.addChild(leftBtn, 10, 1);
		//右箭头
		var rightBtn = new cc.Sprite(res.right_png);
		rightBtn.scale = 0.7;
		rightBtn.opacity = 100;
		rightBtn.setPosition(270, 80);
		this.addChild(rightBtn, 10, 2);
		
		//角色
		ninja = new cc.Sprite(res.ninja_png);
		ninja.setPosition(size.width / 2, 80);
		this.addChild(ninja, 9, 3);
		
		var texture = cc.textureCache.addImage(res.ninja_png);
		var left_texture = cc.textureCache.addImage(res.ninja_left_png);
		var right_texture = cc.textureCache.addImage(res.ninja_right_png);
		
		//箭头触摸事件
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE, //TOUCH_ONE_BY_ONE 为单次触摸事件监听器
			swallowTouches: true,
			onTouchBegan: function(touch, event) {
				var target = event.getCurrentTarget();
				var locationInNode = target.convertToNodeSpace(touch.getLocation());
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);
				if (cc.rectContainsPoint(rect, locationInNode)) {
					if (target == leftBtn) {
						isLeft = true;
						ninja.setTexture(left_texture);
					} else
					if (target == rightBtn) {
						isRight = true;
						ninja.setTexture(right_texture);
					}
					return true;
				}
				return false;
			},
			onTouchEnded: function(touch, event) {
				var target = event.getCurrentTarget();
				if (target == leftBtn) {
					isLeft = false;
				} else
				if (target == rightBtn) {
					isRight = false;
				}
				ninja.setTexture(texture);
			}
		});
		//绑定事件
		cc.eventManager.addListener(listener, leftBtn);
		cc.eventManager.addListener(listener.clone(), rightBtn);

		

		//金币掉落定时器
		this.schedule(function() {
			//如果对象缓冲池存在对象，就从缓冲池中取出
			if (cc.pool.hasObject(Coin)) {
				var coin = cc.pool.getFromPool(Coin);
				coin.setPosition(Math.ceil(Math.random() * size.width), size.height - 10);
				this.addChild(coin);
				var moveTo = cc.MoveTo.create(Math.random() * 3 + 1-this.level*0.3, cc.p(coin.x, -100));
				coin.runAction(moveTo);
				this.coins.push(coin);
			} else {
				var coin = new Coin(res.coin_png);
				coin.setPosition(Math.ceil(Math.random() * size.width), size.height - 10);
				this.addChild(coin);
				var moveTo = cc.MoveTo.create(Math.random() * 3 + 1-this.level*0.3, cc.p(coin.x, -100));
				coin.runAction(moveTo);
				this.coins.push(coin);
			}

		}, 0.2);
		//岩石掉落定时器
		this.schedule(function() {
			//如果对象缓冲池存在对象，就从缓冲池中取出
			if (cc.pool.hasObject(Rock)) {
				var rock = cc.pool.getFromPool(Rock);
				rock.setPosition(Math.ceil(Math.random() * size.width), size.height - 10);
				this.addChild(rock);
				var moveTo = cc.MoveTo.create(Math.random() * 1 + 1-this.level*0.3, cc.p(rock.x, -100));
				rock.runAction(moveTo);
				this.rocks.push(rock);
			} else {
				var rock = new Rock(res.rock_png);
				rock.setPosition(Math.ceil(Math.random() * size.width), size.height - 10);
				this.addChild(rock);
				var moveTo = cc.MoveTo.create(Math.random() * 1 + 1-this.level*0.3, cc.p(rock.x, -100));
				rock.runAction(moveTo);
				this.rocks.push(rock);
			}

		}, 1.0);
		//爱心掉落定时器
		this.schedule(function() {
			//如果对象缓冲池存在对象，就从缓冲池中取出
			if (cc.pool.hasObject(Heart)) {
				var heart = cc.pool.getFromPool(Heart);
				heart.setPosition(Math.ceil(Math.random() * size.width), size.height - 10);
				this.addChild(heart);
				var moveTo = cc.MoveTo.create(Math.random() * 3 + 1.5-this.level*0.3, cc.p(heart.x, -100));
				heart.runAction(moveTo);
				this.hearts.push(heart);
			} else {
				var heart = new Heart(res.life_png);
				heart.setPosition(Math.ceil(Math.random() * size.width), size.height - 10);
				this.addChild(heart);
				var moveTo = cc.MoveTo.create(Math.random() * 3 + 1.5-this.level*0.3, cc.p(heart.x, -100));
				heart.runAction(moveTo);
				this.hearts.push(heart);
			}

		}, 10);

		//背景云朵动画定时器
//		this.schedule(function() {
//			var cloud = new cc.Sprite(res.cloud1_png);
//			cloud.setPosition(-200, size.height - 100);
//			this.addChild(cloud);
//			var moveTo = cc.MoveTo.create(15, cc.p(cloud.x + 800, cloud.y));
//			cloud.runAction(moveTo);
//		}, 15, cc.REPEAT_FOREVER, 2);
//		this.schedule(function() {
//			var cloud = new cc.Sprite(res.cloud2_png);
//			cloud.setPosition(-200, size.height - 250);
//			this.addChild(cloud);
//			var moveTo = cc.MoveTo.create(12, cc.p(cloud.x + 800, cloud.y));
//			cloud.runAction(moveTo);
//		}, 20, cc.REPEAT_FOREVER, 5);
//		this.schedule(function() {
//			var cloud = new cc.Sprite(res.cloud3_png);
//			cloud.setPosition(-200, size.height - 150);
//			this.addChild(cloud);
//			var moveTo = cc.MoveTo.create(20, cc.p(cloud.x + 800, cloud.y));
//			cloud.runAction(moveTo);
//		}, 20, cc.REPEAT_FOREVER, 8);
//		this.schedule(function() {
//			var cloud = new cc.Sprite(res.cloud4_png);
//			cloud.setPosition(-200, size.height - 200);
//			this.addChild(cloud);
//			var moveTo = cc.MoveTo.create(20, cc.p(cloud.x + 800, cloud.y));
//			cloud.runAction(moveTo);
//		}, 18, cc.REPEAT_FOREVER, 10);


		this.scheduleUpdate();

	},
	update: function(dt) {
		var pos =ninja.getPositionX();
		if (isLeft && !isRight) {
			if (pos > 0) //超出左边移动边界就不让目标左移  
				ninja.setPositionX(pos - this.heroSpeed);
		}
		if (isRight && !isLeft) {
			if (cc.director.getWinSize().width > pos) //超出右边界就不让目标右移  
				ninja.setPositionX(pos + this.heroSpeed);
		}
		//金币碰撞检测
		for (i = 0; i < this.coins.length; i++) {
			var dollRect = this.coins[i].getBoundingBox();
			var dollHeadRect = ninja.getBoundingBox();
			if (cc.rectIntersectsRect(dollRect, dollHeadRect)) {
				//回收到对象缓冲池
				cc.pool.putInPool(this.coins[i]);
				var statusLayer = this.getParent().getChildByTag(TagOfLayer.Status);
				this.scoreValue++;
				statusLayer.addScore(this.scoreValue);
				this.coins.splice(i, 1);
				if(this.scoreValue==50){
					this.getParent()._background.setTexture(res.scene1_png);
					this.level=1;
				}
				if(this.scoreValue==200){
					this.getParent()._background.setTexture(res.scene2_png);
					this.level=2;
				}
				if(this.scoreValue==400){
					this.getParent()._background.setTexture(res.scene3_png);
					this.level=3;
				}
			}
			//超出边界，对象回收
			else
			if (this.coins[i].getPositionY() < 0) {
				cc.pool.putInPool(this.coins[i]);
				this.coins.splice(i, 1);
			}
		}
		//岩石碰撞检测
		for (i = 0; i < this.rocks.length; i++) {
			var dollRect = this.rocks[i].getBoundingBox();
			var dollHeadRect = ninja.getBoundingBox();
			if (cc.rectIntersectsRect(dollRect, dollHeadRect)) {
				//回收到对象缓冲池
				cc.pool.putInPool(this.rocks[i]);
				var statusLayer = this.getParent().getChildByTag(TagOfLayer.Status);
				this.lifeValue--;
				if (this.lifeValue == 0) {
					cc.log("game over");
					isLeft=false;
					isRight=false;
					cc.director.runScene(new OverScene(this.scoreValue));
				}
				ninja.setTexture(res.ninja_hit_png);
				statusLayer.addLife(this.lifeValue);
				this.rocks.splice(i, 1);
			}
			//超出边界，对象回收
			else
			if (this.rocks[i].getPositionY() < 0) {
				cc.pool.putInPool(this.rocks[i]);
				this.rocks.splice(i, 1);
			}
		}
		//爱心碰撞检测
		for (i = 0; i < this.hearts.length; i++) {
			var dollRect = this.hearts[i].getBoundingBox();
			var dollHeadRect = ninja.getBoundingBox();
			if (cc.rectIntersectsRect(dollRect, dollHeadRect)) {
				//回收到对象缓冲池
				cc.pool.putInPool(this.hearts[i]);
				var statusLayer = this.getParent().getChildByTag(TagOfLayer.Status);
				if(this.lifeValue<3){
					this.lifeValue++;
					statusLayer.addLife(this.lifeValue);
				}else{
					this.scoreValue+=10;
					statusLayer.addScore(this.scoreValue);
				}
				this.hearts.splice(i, 1);
			}
			//超出边界，对象回收
			else
			if (this.hearts[i].getPositionY() < 0) {
				cc.pool.putInPool(this.hearts[i]);
				this.hearts.splice(i, 1);
			}
		}

	}

});