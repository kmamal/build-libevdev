import Fs from 'node:fs'
import Stream from 'node:stream'
import { once } from 'node:events'
import Child from 'node:child_process'
import C from './util/common.js'
import * as Tar from 'tar'

const url = `https://www.freedesktop.org/software/libevdev/libevdev-${C.version}.tar.xz`

console.log("fetch", url)
const response = await fetch(url)
if (!response.ok) { throw new Error(`bad status code ${response.status}`) }

console.log("unpack to", C.dir.libevdev)
await Fs.promises.rm(C.dir.libevdev, { recursive: true }).catch(() => {})
await Fs.promises.mkdir(C.dir.libevdev, { recursive: true })

const xz = Child.spawn('xz', [ '-dc' ], { stdio: [ 'pipe', 'pipe', 'inherit' ] })
const exited = once(xz, 'exit')
await Promise.all([
	Stream.promises.pipeline(Stream.Readable.fromWeb(response.body), xz.stdin),
	Stream.promises.pipeline(xz.stdout, Tar.extract({ strip: 1, C: C.dir.libevdev })),
])
const [ code ] = await exited
if (code !== 0) { throw new Error(`xz failed with code ${code}`) }
