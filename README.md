# 学习react-native
最近发现读源码的学习效率比较高,又发现了一个react-native组件库[mrn](https://github.com/binggg/mrn),所以学习以下。

## Ripple
虽然后来的版本官方实现了这个特效组件 `TouchableNativeFeedback `,但是学会了思路,后期自己也可以实现比较酷的特效,想想就很酷。
通过[手势](https://github.com/jabez128/jabez128.github.io/issues/1)来触发来调用组件内部的animate的周期函数实现ripple特效。
  1. 手势操作的api跟源码的版本做了更改。


    知识点

  1. [手势操作对应的生命周期](http://reactnative.cn/docs/0.43/panresponder.html#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)。
  2. Animated其实就是值驱动试图的刷新,常用的方法就是动画的执行方式,[队列、并行](http://reactnative.cn/docs/0.43/animated.html#%E6%96%B9%E6%B3%95)等等。
  3. measure方法。
  ```javascript
  this.refs.container.measure((x, y, width, height, pageX, pageY)=> {
      this.setState({
          size: 2 * (width > height ? width : height),
          location: {pageX, pageY}
      })
  });
  ```
