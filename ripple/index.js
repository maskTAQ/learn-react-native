import React, {
    Component,
    StyleSheet,
    PropTypes,
    View,
    Animated,
    Text
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

    state = {
        rippling: false
    };

    constructor(props) {
        super(props);

        this.state = {
            scaleValue: new Animated.Value(0.001)
        };

        this._responder = {
            onStartShouldSetResponder: (e) => true
        }
    }
}
