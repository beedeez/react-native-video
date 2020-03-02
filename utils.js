import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

export function getMemoSourceObject() {
	let oldProp;
	let storedSource;

	return function getSourceObject(sourceProp = {}) {
		if (
			oldProp &&
			storedSource &&
			sourceProp.uri &&
			sourceProp.uri === oldProp.uri &&
			sourceProp.type === oldProp.type &&
			sourceProp.mainVer === oldProp.mainVer &&
			sourceProp.patchVer === oldProp.patchVer &&
			sourceProp.headers === oldProp.headers
		) {
			return storedSource;
		}

		const source = resolveAssetSource(sourceProp);
		const shouldCache = !Boolean(source.__packager_asset);

		let uri = source.uri || '';
		if (uri && uri.match(/^\//)) {
			uri = `file://${uri}`;
		}

		if (!uri) {
			console.warn('Trying to load empty source.');
		}

		const isNetwork = !!(uri && uri.match(/^https?:/));
		const isAsset = !!(
			uri &&
			uri.match(
				/^(assets-library|ipod-library|file|content|ms-appx|ms-appdata):/
			)
		);

		oldProp = source;
		storedSource = {
			uri,
			isNetwork,
			isAsset,
			shouldCache,
			type: source.type || '',
			mainVer: source.mainVer || 0,
			patchVer: source.patchVer || 0,
			requestHeaders: source.headers ? stringsOnlyObject(source.headers) : {}
		};

		return storedSource;
	};
}

export function stringsOnlyObject(obj) {
	const strObj = {};

	Object.keys(obj).forEach((x) => {
		strObj[x] = this.toTypeString(obj[x]);
	});

	return strObj;
}
