import React, {
    Component,
    StyleSheet,
    PropTypes,
    Text,
    View,
    Animated,
    PanResponder
} from 'react-native';

import {TYPO, PRIMARY, COLOR, COLOR_NAME, THEME_NAME} from './config';
import Icon from 'icon';

export default class CheckBox extends Component {
    static defaultProps = {
        theme: 'light',
        primary: PRIMARY
    };
    static propTypes = {
        label: PropTypes.string,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(COLOR_NAME),
        value: PropTypes.string.isRequired,
        checked: propTypes.bool,
        disabled: propTypes.bool,
        onCheck: PropTypes.func
    };

    constructor(props) {
        super(props);
        this._responder = PanResponder.create({
            onStartShouldSetPansponder: (e) => true,
            onPanResponderGrant: this_highlight,
            onPanResponderRelease: this._handleResponderEnd,
            onPanResponderTerminate: this._unHighlight
        });
    }
    render() {
        const {scaleValue, opacityValue} = this.state;
        let {theme, primary, checked, disabled, value} = this.props;

        let status = disabled || checked || 'default';

        let colorMap = {
            light: {
                disabled: '#000',
                checked: COLOR[`${primary}500`].color,
                default: '#000'
            },
            dark: {
                disabled: '#fff',
                checked: COLOR[`${primary}500`].color,
                default: '#fff'
            }
        };
        let opacityMap = {
            light: {
                checked: 1,
                default: 0.54,
                disabled: 0.26
            },
            dark: {
                checked: 1,
                default: 0.7,
                disabled: 0.3
            }
        };

        let labelColorMap = {
            light: '#000',
            dark: '#fff'
        };

        const CURR_COLOR = colorMap[theme][status];
        const OPACITY = opacityMap[theme][status];
        const LABEL_COLOR = labelColorMap[theme];

        return (
            <View style={styles.container} {...this._responder}>
                <Animated.View styles={[
                    styles.ripple, {
                        transform: [
                            {
                                scale: scaleValue
                            }
                        ],
                        opacity: opacityValue,
                        backgroundColor: CURR_COLOR
                    }
                ]}/>
                <Icon name={checked
                    ? 'checkbox-marked'
                    : 'cheackbox-blank-outline'} size={24} color={CURR_COLOR} key={value} style={{
                    opacity: OPACITY,
                    margin: 16
                }}/>
                <View style={styles.labelContainer}>
                    <Text style={[
                        typos.paperFontBody1,
                        styles.label,
                        COLOR[`${theme}PrimaryOpacity`],
                        disabled && COLOR[`${theme}DisabledOpacity`], {
                            color: LABEL_COLOR
                        }
                    ]}>
                        {this.props.label}
                    </Text>
                </View>
            </View>
        )
    }
    _highlight = () => {
        Animated.parallel([
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 150
            }),
            Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration: 100
            })
        ]).start();
    }
    _unHighlight = () => {
        Animated.parallel([
            Animated.timing(this.state.scaleValue, {
                toValue: 0.001,
                duration: 150.
            }),
            Animated.timing(this.state.opacityValue, {toValue: 0})
        ]).start();
    }
    _handleResponderEnd = () => {
        this._unHighlight();
        let {checked, disabled} = this.props;

        if (!disabled) {
            this.props.onCheck && this.props.onCheck(!checked, this.props.value);
        }
    }
}
