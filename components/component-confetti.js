Component({

  properties: {
    duration: {
      type: Number,
      value: 6000//效果持续的时间。时间太短，纸片还未飘出屏幕，时间太长交互体验受影响
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    COLORS: ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"],//纸片色彩
    SPRITE_WIDTH: 18,
    SPRITE_HEIGHT: 32,
    PAPER_LENGTH: 20,
    

    width: wx.getSystemInfoSync().windowWidth,
    height: wx.getSystemInfoSync().windowHeight,
    animationList: [],
    confettisDisplay: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showConfetti() {
      var DURATION = this.properties.duration;
      this.setData({ confettisDisplay: true })
      var that = this;
      setTimeout(function () {
        that.setData({ confettisDisplay: false })
      }, DURATION)
      clearInterval(this.timeIntervalId1);
      clearInterval(this.timeIntervalId2);
      let num = this.data.PAPER_LENGTH;
      var confettis = [];

      for (var i = 0; i < num; i++) {
        var animation = wx.createAnimation({
          duration: 1,
          timingFunction: 'ease',
        })
        confettis[i] = {
          "id": i,
          "color": this.data.COLORS[Math.random() * this.data.COLORS.length | 0],
          "width": this.data.SPRITE_WIDTH,
          "height": this.data.SPRITE_HEIGHT,
          "position": {
            initX: Math.random() * this.data.width,
            initY: Math.random() * this.data.height
          },
          "rotationZ": Math.random() * 360,
          "xRange": Math.random() * 0.5 - 0.5,
          "baseRotation": 120 + Math.random() * 180,
        };
        animation.rotateZ(confettis[i].rotationZ).step();
        this.data.animationList[i] = animation;
        confettis[i].animationData = animation.export();
      }

      this.setData({ confettis });
      var n = 0;
      let rotateDuration = 300;
      let translateDuration = 10;

      this.timeIntervalId1 = setInterval(function () {
        if (n * rotateDuration >= DURATION) {
          clearInterval(this.timeIntervalId1);
          return;
        }
        var confettis = this.data.confettis;
        n = n + 1;
        for (var i = 0; i < num; i++) {
          this.data.animationList[i].rotateY(confettis[i].baseRotation * (n)).step({ duration: rotateDuration })
          confettis[i].animationData = this.data.animationList[i].export();
        }
        this.setData({ confettis });
      }.bind(this), rotateDuration)

      var m = 0;
      this.timeIntervalId2 = setInterval(function () {
        if (m * translateDuration >= DURATION) {
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
  }
})
