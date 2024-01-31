import Fs from 'node:fs'
import Path from 'node:path'
import { execSync } from 'node:child_process'
import C from './util/common.js'

console.log("build in", C.dir.libevdev)
execSync(`cd ${C.dir.libevdev} && make -j$(nproc)`, { stdio: 'inherit' })

console.log("install to", C.dir.dist)
await Fs.promises.rm(C.dir.dist, { recursive: true }).catch(() => {})
await Fs.promises.mkdir(C.dir.dist, { recursive: true })

await Promise.all([
	Fs.promises.mkdir(Path.join(C.dir.dist, 'include')),
	Fs.promises.mkdir(Path.join(C.dir.dist, 'lib')),
])

await Promise.all([
	Fs.promises.cp(
		Path.join(C.dir.libevdev, 'libevdev/libevdev.h'),
		Path.join(C.dir.dist, 'include/libevdev.h'),
	),
	Fs.promises.cp(
		Path.join(C.dir.libevdev, 'libevdev/.libs/libevdev.a'),
		Path.join(C.dir.dist, 'lib/libevdev.a'),
	),
])
