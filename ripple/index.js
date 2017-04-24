/*
结构 View.container>View.background+Animated.View
痛过手势触发 改变View.background 的背景颜色和透明度 + 获取手势触发的位置定位Animated.View的位置 然后动态改变缩放比和加radius属性来实现ripple特效
*/
import React, {
    Component,
    StyleSheet,
    PropTypes,
    View,
    Animated,
    Text,
    PanResponder
} from 'react-native';

export default class Ripple extends Component {
    static defaultProps = {
        color: '#999',
        background: '#999',
        rippleOpacity: .2,
        backgroundOpacity: .2
    };
    static propTypes = {
        color: PropTypes.string,
        background: PropTypes.string,
        rippleOpacity: PropTypes.number,
        backgroundOpacity: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.state = {
            rippling: false,
            scaleValue: new Animated.Value(0.001)
        };

        this._responder = PanResponder.create({
            //启用手势响应
            onStartShouldSetPanResponder: (e) => true,
            //开始手势操作
            onPanResponderGrant: this._highlight,
            //结束手势操作
            onPanResponderRelease: this._handleResponderEnd,
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消
            onPanResponderTerminate: this._unHightlight
        });
    }
    render() {
        const {
            color,
            background,
            rippleOpacity,
            backgroundOpacity,
            children,
            style,
            ...other
        } = this.props;
        const {
            rippling,
            size,
            pageX,
            pageY,
            scaleValue,
            location
        } = this.state;

        const assignStyle = Object.assign({}, styles.container, style);

        return (
            <View ref="container" style={assignStyle} {...this._responder} {...other}>
                <View style={[
                    styles.background, backgroundColor : rippling
                        ? background
                        : 'transparent',
                    opacity : backgroundOpacity
                ]}/>
                <Animated.View style={[
                  //这里判断了一下location是否存在???
                    styles.Ripple, location && {
                        backgroundColor: color,
                        width: size,
                        height: size,
                        top: pageY - location.pageY - size / 2,
                        left: pageX - location.pageX - size / 2,
                        borderRadius: size / 2,
                        opacity: rippleOpacity
                    }, {
                        transform: [
                            {
                                scale: scaleValue
                            }
                        ]
                    }
                ]}/>
                 {children}
            </View>
        )
    }
    _highlight = (e) => {
        const {
            pageX,
            pageY
            } = e.nativeEvent;

        this.setState({
            rippling: true,
            pageX,
            pageY
        });

        !!this.state.size || this._getContainerDimensions();

        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 500
            }
        ).start();
    };

    _unHighlight = () => {
        this.setState({
            rippling: false
        });

        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 0.001,
                duration: 0
            }
        ).start();
    };
    _handleResponderEnd = (e) => {
        var onPress = this.props.onPress;
        onPress && setTimeout(onPress.bind(this), 0)
        this._unHighlight();
    };
    _getContainerDimensions = () => {
        this.refs.container.measure((x, y, width, height, pageX, pageY)=> {
            this.setState({
                size: 2 * (width > height ? width : height),
                location: {pageX, pageY}
            })
        })
    }
}
const styles = {
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        overflow: 'hidden'
    },
    background: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    ripple: {
        position: 'absolute',
    }
};
