const assert = require('assert')
const {Application} = require('spectron')

describe('application launch', () => {
	this.timeout(10000)

	beforeEach(() => {
		this.app = new Application({
			path: './node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron',
			args: ['.']
		})
		return this.app.start()
	})

	afterEach(() => {
		if (this.app && this.app.isRunning()) {
			return this.app.stop()
		}
	})

	it('shows an initial window', () => {
		return this.app.client.getWindowCount().then(count => {
			assert.equal(count, 1)
		})
	})
})
