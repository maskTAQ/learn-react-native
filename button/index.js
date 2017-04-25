import React, {Component, StyleSheet, PropTypes, View, Text} from 'react-native';
import {TYPO, PRIMARY, COLOR, THEME_NAME, COLOR_NAME} from './config';
import Ripple from './Ripple';

export default class Button extends Component {
    static defaultProps = {
        theme: 'light',
        primary: PRIMARY,
        disabled: false,
        raised: false
    };
    static propTypes = {
        value: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        theme: PropTypes.oneOf(THEME_NAME),
        raised: PropTypes.bool,
        onPress: PropTypes.func
    };

    constructor(props) {
        super(props);
    }
    render(){
      const {
            value,
            disabled,
            theme,
            primary,
            raised,
            onPress
            } = this.props;
        const {
            background
            } = this.state;

        this.textStyleMap = {
            flat: {
                light: {
                    normal: {
                        color: COLOR[`${primary}500`].color
                    },
                    disabled: {
                        color: 'rgba(0,0,0,.26)',
                    }
                },
                dark: {
                    normal: {
                        color: COLOR[`${primary}500`].color,
                    },
                    disabled: {
                        color: 'rgba(255,255,255,.3)',
                    }
                }
            },
            raised: {
                light: {
                    normal: {
                        color: COLOR[`${primary}500`].color,
                    },
                    disabled: {
                        color: 'rgba(0,0,0,.26)',
                    }
                },
                dark: {
                    normal: {
                        color: '#fff'
                    },
                    disabled: {
                        color: 'rgba(255,255,255,.3)',
                    }
                }
            }
        };
        this.buttonStyleMap = {
            raised: {
                light: {
                    normal: {
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderColor: 'rgba(0,0,0,.12)',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(0,0,0,.12)',
                    },
                    disabled: {
                        backgroundColor: 'rgba(0,0,0,.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)',
                    }
                },
                dark: {
                    normal: {
                        backgroundColor: COLOR[`${primary}500`].color,
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)',
                    },
                    disabled: {
                        backgroundColor: 'rgba(255,255,255,.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)',
                    }
                }
            }
        };

        this.rippleColorMap = {
            flat: {
                light: {
                    normal: 'rgba(153,153,153,.4)',
                    disabled: 'rgba(0,0,0,0.06)'
                },
                dark: {
                    normal: 'rgba(204,204,204,.25)',
                    disabled: 'rgba(255,255,255,0.06)'
                }
            },
            raised: {
                light: {
                    normal: 'rgba(153,153,153,.4)',
                    disabled: 'rgba(0,0,0,.06)'
                },
                dark: {
                    normal: COLOR[`${primary}700`].color,
                    disabled: 'rgba(255,255,255,.06)'
                }
            }
        };

        let type = disabled ? 'disabled' : 'normal';
        let shape = raised ? 'raised' : 'flat';

        let textStyle = this.textStyleMap[shape][theme][type];
        if (raised) {
          //let在花括号中有作用域
            var buttonStyle = this.buttonStyleMap[shape][theme][type];
        }
        let rippleColor = this.rippleColorMap[shape][theme][type];

        return (

            <Ripple
                color={rippleColor}
                rippleOpacity={1}
                onPress={!disabled ? onPress : undefined} style={ Object.assign({},
                        styles.button,
                        buttonStyle,
                        {
                            backgroundColor: background ? background : (buttonStyle && buttonStyle.backgroundColor)
                        }
                )}>

                <Text style={[TYPO.paperFontButton, textStyle]}>{value}</Text>
            </Ripple>
        );
    }
}
const styles = {
    button: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        margin: 4,
        borderRadius: 2,
    }
};
