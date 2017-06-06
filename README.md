# 学习react-native
最近发现读源码的学习效率比较高,又发现了一个react-native组件库[mrn](https://github.com/binggg/mrn),所以学习以下。

## Ripple
虽然后来的版本官方实现了这个特效组件 `TouchableNativeFeedback `,但是学习一下思路也是很棒的。
通过[手势](https://github.com/jabez128/jabez128.github.io/issues/1)来触发来调用组件内部的animate的周期函数实现ripple特效。

### 知识点

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

### 实现步骤
动态改变背景层的颜色、ripple层的大小。
### 总结
手势操作的api跟源码的版本做了更改,改为现在了写法。

## Avatar
  如果传入了src属性 就return Image组件。不然就返回一个View包装的Icon组件。Icon传入了name[可能是根据name构造不同的icon]。

## CheckBox
### 实现步骤
    交互时动态改变按钮的透明度、ripple层的大小、更改icon属性的name属性值。
### 总结
组件完全是受控的，没有内部私有状态，利用回调或者组件的静态属性暴露出组件的内部状态。将源码中的实现方式改动了一下 采用`Animated.parallel()`实现并行动画。

## checkboxGroup
  1. 构造函数中初始化selected 并触发onSelect
  2. render 遍历渲染checkbox 并传入change回调
  3. change回调中更新组件中的selected
  4. 提供了木偶功能 由第三方操控组件数据

## [react-native-echarts](https://github.com/somonus/react-native-echarts/tree/master/src/components/Echarts)的实现方式
### 知识点
`WebView、echart、injectedJavaScript。`
### 实现步骤
   1. 通过WebView组件引入html文件。
   2. HTML文件中定义好了文档结构，引入了echart。
   3. 在WebView渲染前通过`injectedJavaScript`传入参数并调用。

### 注意！！！
因为html存储在本地所以需要注意一个问题。release版本只能使用uri加载资源，android把tpl.html文件放在
android/app/src/main/assets文件里，使用uri:'file:///android_asset/tpl.html'这个地址加载，
ios在项目目录下建个文件夹，把tpl文件放里面去，使用uri:'文件名/tpl'加载，这样能使用。

### [自定义字体](http://bbs.reactnative.cn/topic/204/%E8%AE%BE%E7%BD%AEreact-native%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AD%97%E4%BD%93)
文章中讲了对原组件的render方法做劫持，渲染自己修饰过后的组件。

### [iconfont](http://www.tuicool.com/articles/am6ze22)
为`unicode`编码起个好记得名字也就是key,再定义一个将key输出成`unicode`编码的方法。在`Text`组件中调用方法输入字体名字就可以显示字体图标了,记得引入字体哦！

### 忽略警告
在代码中添加`console.disableYellowBox = true;`;如果忽略部分警告可以对应的值可以设置为忽略关键词数组`console.ignoredYellowBox = ['Warning: Each child'];`
