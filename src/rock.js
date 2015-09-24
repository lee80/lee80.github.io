var Rock = cc.Sprite.extend({
	ctor: function(filename) {
		this._super(filename);
	},
	unuse: function() {
		this.setVisible(false);
		this.removeFromParent(true);
	},
	reuse: function() {
		this.setVisible(true);
	}
});