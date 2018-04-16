Page({

  COLORS: ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"],//纸片色彩
  SPRITE_WIDTH: 18,
  SPRITE_HEIGHT: 32,
  PAPER_LENGTH: 20,
  DURATION: 6000,//效果持续的时间。时间太短，纸片还未飘出屏幕，时间太长交互体验受影响

  width: wx.getSystemInfoSync().windowWidth,
  height: wx.getSystemInfoSync().windowHeight,
  animationList: [],
  data: {
    confettis: [],
  },
  onLoad: function (options) {
  },

  showConfetti(e) {
    clearInterval(this.timeIntervalId1);
    clearInterval(this.timeIntervalId2);
    let num = this.PAPER_LENGTH;
    var confettis = [];

    for (var i = 0; i < num; i++) {
      var animation = wx.createAnimation({
        duration: 1,
        timingFunction: 'ease',
      })
      confettis[i] = {
        "color": this.COLORS[Math.random() * this.COLORS.length | 0],
        "width": this.SPRITE_WIDTH,
        "height": this.SPRITE_HEIGHT,
        "position": {
          initX: Math.random() * this.width,
          initY: Math.random() * this.height
        },
        "rotationZ": Math.random() * 360,
        "xRange": Math.random() * 0.5 - 0.5,
        "baseRotation": 120 + Math.random() * 180,
      };
      animation.rotateZ(confettis[i].rotationZ).step();
      this.animationList[i] = animation;
      confettis[i].animationData = animation.export();
    }

    this.setData({ confettis });
    var n = 0;
    let rotateDuration = 300;
    let translateDuration = 10;

    this.timeIntervalId1 = setInterval(function () {
      if (n * rotateDuration >= this.DURATION) {
        clearInterval(this.timeIntervalId1);
        return;
      }
      var confettis = this.data.confettis;
      n = n + 1;
      for (var i = 0; i < num; i++) {
        this.animationList[i].rotateY(confettis[i].baseRotation * (n)).step({ duration: rotateDuration })
        confettis[i].animationData = this.animationList[i].export();
      }
      this.setData({ confettis });
    }.bind(this), rotateDuration)

    var m = 0;
    this.timeIntervalId2 = setInterval(function () {
      if (m * translateDuration >= this.DURATION) {
        clearInterval(this.timeIntervalId2);
        return;
      }
      m += 1;
      var confettis = this.data.confettis;
      for (var i = 0; i < num; i++) {
        confettis[i].position.initY += 5;
        confettis[i].position.initX += confettis[i].xRange * 2;
      }
      this.setData({ confettis });
    }.bind(this), translateDuration)
  },
  onShow: function () {
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onReady: function () {

  }
})