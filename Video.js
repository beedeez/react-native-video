import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	requireNativeComponent,
	NativeModules,
	View,
	ViewPropTypes,
	Platform,
	findNodeHandle,
} from 'react-native';
import TextTrackType from './TextTrackType';
import FilterType from './FilterType';
import VideoResizeMode from './VideoResizeMode.js';
import { getMemoSourceObject } from './utils';

const styles = StyleSheet.create({
	base: {
		overflow: 'hidden',
	},
});

export { TextTrackType, FilterType };

const getSourceObject = getMemoSourceObject();

export default class Video extends Component {
	seek = (time, tolerance = 100) => {
		if (isNaN(time)) throw new Error('Specified time is not a number');

		if (Platform.OS === 'ios') {
			this._root.setNativeProps({
				seek: {
					time,
					tolerance,
				},
			});
		} else {
			this._root.setNativeProps({ seek: time });
		}
	};

	save = async (options) => {
		return await NativeModules.VideoManager.save(
			options,
			findNodeHandle(this._root)
		);
	};

	_assignRoot = (component) => {
		this._root = component;
	};

	_onLoadStart = (event) => {
		if (this.props.onLoadStart) {
			this.props.onLoadStart(event.nativeEvent);
		}
	};

	_onLoad = (event) => {
		if (this.props.onLoad) {
			this.props.onLoad(event.nativeEvent);
		}
	};

	_onError = (event) => {
		if (this.props.onError) {
			this.props.onError(event.nativeEvent);
		}
	};

	_onBandwidthUpdate = (event) => {
		if (this.props.onBandwidthUpdate) {
			this.props.onBandwidthUpdate(event.nativeEvent);
		}
	};

	_onEnd = (event) => {
		if (this.props.onEnd) {
			this.props.onEnd(event.nativeEvent);
		}
	};

	_onProgress = (event) => {
		if (this.props.onProgress) {
			this.props.onProgress(event.nativeEvent);
		}
	};

	_onSeek = (event) => {
		if (this.props.onSeek) {
			this.props.onSeek(event.nativeEvent);
		}
	};

	_onTimedMetadata = (event) => {
		if (this.props.onTimedMetadata) {
			this.props.onTimedMetadata(event.nativeEvent);
		}
	};

	_onFullscreenPlayerWillPresent = (event) => {
		if (this.props.onFullscreenPlayerWillPresent) {
			this.props.onFullscreenPlayerWillPresent(event.nativeEvent);
		}
	};

	_onFullscreenPlayerDidPresent = (event) => {
		if (this.props.onFullscreenPlayerDidPresent) {
			this.props.onFullscreenPlayerDidPresent(event.nativeEvent);
		}
	};

	_onFullscreenPlayerWillDismiss = (event) => {
		if (this.props.onFullscreenPlayerWillDismiss) {
			this.props.onFullscreenPlayerWillDismiss(event.nativeEvent);
		}
	};

	_onFullscreenPlayerDidDismiss = (event) => {
		if (this.props.onFullscreenPlayerDidDismiss) {
			this.props.onFullscreenPlayerDidDismiss(event.nativeEvent);
		}
	};

	_onReadyForDisplay = (event) => {
		if (this.props.onReadyForDisplay) {
			this.props.onReadyForDisplay(event.nativeEvent);
		}
	};

	_onPlaybackStalled = (event) => {
		if (this.props.onPlaybackStalled) {
			this.props.onPlaybackStalled(event.nativeEvent);
		}
	};

	_onPlaybackResume = (event) => {
		if (this.props.onPlaybackResume) {
			this.props.onPlaybackResume(event.nativeEvent);
		}
	};

	_onPlaybackRateChange = (event) => {
		if (this.props.onPlaybackRateChange) {
			this.props.onPlaybackRateChange(event.nativeEvent);
		}
	};

	_onExternalPlaybackChange = (event) => {
		if (this.props.onExternalPlaybackChange) {
			this.props.onExternalPlaybackChange(event.nativeEvent);
		}
	};

	_onAudioBecomingNoisy = () => {
		if (this.props.onAudioBecomingNoisy) {
			this.props.onAudioBecomingNoisy();
		}
	};

	_onPictureInPictureStatusChanged = (event) => {
		if (this.props.onPictureInPictureStatusChanged) {
			this.props.onPictureInPictureStatusChanged(event.nativeEvent);
		}
	};

	_onRestoreUserInterfaceForPictureInPictureStop = (event) => {
		if (this.props.onRestoreUserInterfaceForPictureInPictureStop) {
			this.props.onRestoreUserInterfaceForPictureInPictureStop();
		}
	};

	_onAudioFocusChanged = (event) => {
		if (this.props.onAudioFocusChanged) {
			this.props.onAudioFocusChanged(event.nativeEvent);
		}
	};

	_onBuffer = (event) => {
		if (this.props.onBuffer) {
			this.props.onBuffer(event.nativeEvent);
		}
	};

	getViewManagerConfig = (viewManagerName) => {
		if (!NativeModules.UIManager.getViewManagerConfig) {
			return NativeModules.UIManager[viewManagerName];
		}
		return NativeModules.UIManager.getViewManagerConfig(viewManagerName);
	};

	render() {
		const resizeMode = this.props.resizeMode;
		const RCTVideoInstance = this.getViewManagerConfig('RCTVideo');
		let nativeResizeMode;

		if (resizeMode === VideoResizeMode.stretch) {
			nativeResizeMode = RCTVideoInstance.Constants.ScaleToFill;
		} else if (resizeMode === VideoResizeMode.contain) {
			nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFit;
		} else if (resizeMode === VideoResizeMode.cover) {
			nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFill;
		} else {
			nativeResizeMode = RCTVideoInstance.Constants.ScaleNone;
		}

		const nativeProps = {
			...this.props,
			style: [styles.base, this.props.style],
			resizeMode: nativeResizeMode,
			src: getSourceObject(this.props.source),
			onVideoLoadStart: this._onLoadStart,
			onVideoLoad: this._onLoad,
			onVideoError: this._onError,
			onVideoProgress: this._onProgress,
			onVideoSeek: this._onSeek,
			onVideoEnd: this._onEnd,
			onVideoBuffer: this._onBuffer,
			onVideoBandwidthUpdate: this._onBandwidthUpdate,
			onTimedMetadata: this._onTimedMetadata,
			onVideoAudioBecomingNoisy: this._onAudioBecomingNoisy,
			onVideoExternalPlaybackChange: this._onExternalPlaybackChange,
			onVideoFullscreenPlayerWillPresent: this._onFullscreenPlayerWillPresent,
			onVideoFullscreenPlayerDidPresent: this._onFullscreenPlayerDidPresent,
			onVideoFullscreenPlayerWillDismiss: this._onFullscreenPlayerWillDismiss,
			onVideoFullscreenPlayerDidDismiss: this._onFullscreenPlayerDidDismiss,
			onReadyForDisplay: this._onReadyForDisplay,
			onPlaybackStalled: this._onPlaybackStalled,
			onPlaybackResume: this._onPlaybackResume,
			onPlaybackRateChange: this._onPlaybackRateChange,
			onAudioFocusChanged: this._onAudioFocusChanged,
			onAudioBecomingNoisy: this._onAudioBecomingNoisy,
			onPictureInPictureStatusChanged: this._onPictureInPictureStatusChanged,
			onRestoreUserInterfaceForPictureInPictureStop: this
				._onRestoreUserInterfaceForPictureInPictureStop,
		};

		return (
			<View style={nativeProps.style}>
				<RCTVideo
					ref={this._assignRoot}
					{...nativeProps}
					style={StyleSheet.absoluteFill}
				/>
			</View>
		);
	}
}

Video.propTypes = {
	filter: PropTypes.oneOf([
		FilterType.NONE,
		FilterType.INVERT,
		FilterType.MONOCHROME,
		FilterType.POSTERIZE,
		FilterType.FALSE,
		FilterType.MAXIMUMCOMPONENT,
		FilterType.MINIMUMCOMPONENT,
		FilterType.CHROME,
		FilterType.FADE,
		FilterType.INSTANT,
		FilterType.MONO,
		FilterType.NOIR,
		FilterType.PROCESS,
		FilterType.TONAL,
		FilterType.TRANSFER,
		FilterType.SEPIA,
	]),
	filterEnabled: PropTypes.bool,
	/* Native only */
	src: PropTypes.object,
	seek: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
	fullscreen: PropTypes.bool,
	onVideoLoadStart: PropTypes.func,
	onVideoLoad: PropTypes.func,
	onVideoBuffer: PropTypes.func,
	onVideoError: PropTypes.func,
	onVideoProgress: PropTypes.func,
	onVideoBandwidthUpdate: PropTypes.func,
	onVideoSeek: PropTypes.func,
	onVideoEnd: PropTypes.func,
	onTimedMetadata: PropTypes.func,
	onVideoAudioBecomingNoisy: PropTypes.func,
	onVideoExternalPlaybackChange: PropTypes.func,
	onVideoFullscreenPlayerWillPresent: PropTypes.func,
	onVideoFullscreenPlayerDidPresent: PropTypes.func,
	onVideoFullscreenPlayerWillDismiss: PropTypes.func,
	onVideoFullscreenPlayerDidDismiss: PropTypes.func,

	/* Wrapper component */
	source: PropTypes.oneOfType([
		PropTypes.shape({
			uri: PropTypes.string,
		}),
		// Opaque type returned by require('./video.mp4')
		PropTypes.number,
	]),
	minLoadRetryCount: PropTypes.number,
	maxBitRate: PropTypes.number,
	resizeMode: PropTypes.string,
	repeat: PropTypes.bool,
	automaticallyWaitsToMinimizeStalling: PropTypes.bool,
	allowsExternalPlayback: PropTypes.bool,
	selectedAudioTrack: PropTypes.shape({
		type: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	selectedVideoTrack: PropTypes.shape({
		type: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	selectedTextTrack: PropTypes.shape({
		type: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	textTracks: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			uri: PropTypes.string.isRequired,
			type: PropTypes.oneOf([
				TextTrackType.SRT,
				TextTrackType.TTML,
				TextTrackType.VTT,
			]),
			language: PropTypes.string.isRequired,
		})
	),
	paused: PropTypes.bool,
	muted: PropTypes.bool,
	volume: PropTypes.number,
	bufferConfig: PropTypes.shape({
		minBufferMs: PropTypes.number,
		maxBufferMs: PropTypes.number,
		bufferForPlaybackMs: PropTypes.number,
		bufferForPlaybackAfterRebufferMs: PropTypes.number,
	}),
	stereoPan: PropTypes.number,
	rate: PropTypes.number,
	pictureInPicture: PropTypes.bool,
	playInBackground: PropTypes.bool,
	playWhenInactive: PropTypes.bool,
	ignoreSilentSwitch: PropTypes.oneOf(['ignore', 'obey']),
	reportBandwidth: PropTypes.bool,
	disableFocus: PropTypes.bool,
	controls: PropTypes.bool,
	audioOnly: PropTypes.bool,
	currentTime: PropTypes.number,
	fullscreenAutorotate: PropTypes.bool,
	fullscreenOrientation: PropTypes.oneOf(['all', 'landscape', 'portrait']),
	progressUpdateInterval: PropTypes.number,
	useTextureView: PropTypes.bool,
	hideShutterView: PropTypes.bool,
	onLoadStart: PropTypes.func,
	onLoad: PropTypes.func,
	onBuffer: PropTypes.func,
	onError: PropTypes.func,
	onProgress: PropTypes.func,
	onBandwidthUpdate: PropTypes.func,
	onSeek: PropTypes.func,
	onEnd: PropTypes.func,
	onFullscreenPlayerWillPresent: PropTypes.func,
	onFullscreenPlayerDidPresent: PropTypes.func,
	onFullscreenPlayerWillDismiss: PropTypes.func,
	onFullscreenPlayerDidDismiss: PropTypes.func,
	onReadyForDisplay: PropTypes.func,
	onPlaybackStalled: PropTypes.func,
	onPlaybackResume: PropTypes.func,
	onPlaybackRateChange: PropTypes.func,
	onAudioFocusChanged: PropTypes.func,
	onAudioBecomingNoisy: PropTypes.func,
	onPictureInPictureStatusChanged: PropTypes.func,
	needsToRestoreUserInterfaceForPictureInPictureStop: PropTypes.func,
	onExternalPlaybackChange: PropTypes.func,

	/* Required by react-native */
	scaleX: PropTypes.number,
	scaleY: PropTypes.number,
	translateX: PropTypes.number,
	translateY: PropTypes.number,
	rotation: PropTypes.number,
	...ViewPropTypes,
};

const RCTVideo = requireNativeComponent('RCTVideo', Video, {
	nativeOnly: {
		src: true,
		seek: true,
		fullscreen: true,
	},
});
