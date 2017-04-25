import React, {Component, StyleSheet, PropTypes, View, Image} from 'react-native';
import Icon from './icon';

export default class Avatar extends Component {
    static defaultProps = {
        size: 40,
        color: '#fff',
        backgroundColor: '#bdbdbd'
    };
    static propTypes = {
        //ICON_NAME 定义了一系列 名称
        //  icon:PropTypes.oneOf(ICON_NAME).required,
        src: PropTypes.string,
        size: PropTypes.number,
        color: PropTypes.string,
        backgroundColor: propTypes.string
    };
    constructor(props) {
        super(props);

    }
    render() {
        const {icon, src, size, color, backgroundColor} = this.props;

        if (src) {
            return (<Image style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderColor: 'rgba(0,0,0,.1)',
                borderWidth: 1
            }} source={{
                uri: src
            }}/>)
        }

        return (
            <View style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon name={icon} color={color} size={0.6 * size}/>
            </View>
        )
    }
}
