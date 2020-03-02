import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

export default class Poster extends Component {
	render() {
		const posterStyle = {
			...StyleSheet.absoluteFillObject,
			resizeMode: this.props.posterResizeMode || 'contain'
		};

		return <Image style={posterStyle} source={{ uri: this.props.poster }} />;
	}
}
