import Fs from 'node:fs'
import C from './util/common.js'

await Promise.all([
	C.dir.libevdev,
	C.dir.dist,
	C.dir.publish,
].map(async (dir) => {
	await Fs.promises.rm(dir, { recursive: true }).catch(() => {})
}))

await import('./download-libevdev.mjs')
await import('./configure.mjs')
await import('./make.mjs')
