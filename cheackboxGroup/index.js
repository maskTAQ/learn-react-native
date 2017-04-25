/*
构造函数中初始化selected 并触发onSelect
render 遍历渲染checkbox 并传入change回调、
change回调中更新组件中的selected
提供了木偶功能 由第三方操控组件数据
*/
import React, {Component, StyleSheet, PropTypes, View} from 'react-native';
import Checkbox from './checkbox';
import {THEME_NAME, COLOR_NAME} from './config';

export default class CheckboxGroup extends Component {
    static defaultProps = {
        value: []
    };
    static propTypes = {
        name: PropTypes.string.isRequired,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(COLOR_NAME),
        onSelect: PropTypes.func,
        value: PropTypes.array
    };

    constructor(props) {
        super(props);
        let options = React.Children.map(this.props.children, (option) => {
            let {value, checked} = option.props;

            if (checked) {
                /**
                 *
                 * @type {{selected: *[]}}
                 */
                this.state = {
                    selected: [
                        ...this.state.selected,
                        value
                    ]
                };

                const {onSelect} = this.props;
                onSelect && onSelect(this.value);
            }
        })
    }

    render() {
        let options = React.Children.map(this.props.children, (option) => {
            let {
                value,
                label,
                disabled,
                ...other
            } = option.props;
            let {name, theme, primary} = this.props;

            return <Checkbox {...other} ref={value} name={name} key={'Group' + value} value={value} label={label} theme={theme} primary={primary} disabled={disabled} onCheck={this._onChange} checked={this.state.selected && this.state.selected.indexOf(value) !== -1}/>;
        }, this);

        return (
            <View>
                {options}
            </View>
        );
    }

    _onChange = (checked, value) => {
        const { selected } = this.state;

        if (checked) {
            this.setState({
                selected: [...selected, value]
            });
        } else {
            let index = selected.indexOf(value);

            //删除对应的项
            this.setState({
                selected: [
                    ...selected.slice(0, index),
                    ...selected.slice(index + 1)
                ]
            });
        }

        const { onSelect } = this.props;
        onSelect && onSelect(this.value);
    };

    get value() {
        return this.state.selected
    }

    set value(value) {
        this.setState({
            selected: value
        });

        const { onSelect } = this.props;
        onSelect && onSelect(this.value);
    }
}
