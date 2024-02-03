import Fs from 'node:fs'
import Path from 'node:path'
import { execSync } from 'node:child_process'
import C from './util/common.js'

console.log("build in", C.dir.libevdev)
execSync(`cd ${C.dir.libevdev} && make -j$(nproc)`, { stdio: 'inherit' })

console.log("install to", C.dir.dist)
await Fs.promises.rm(C.dir.dist, { recursive: true }).catch(() => {})
await Promise.all([
	Fs.promises.mkdir(Path.join(C.dir.dist, 'include/libevdev'), { recursive: true }),
	Fs.promises.mkdir(Path.join(C.dir.dist, 'lib'), { recursive: true }),
])

await Promise.all([
	Fs.promises.cp(
		Path.join(C.dir.libevdev, 'libevdev/libevdev.h'),
		Path.join(C.dir.dist, 'include/libevdev/libevdev.h'),
	),
	Fs.promises.cp(
		Path.join(C.dir.libevdev, 'libevdev/libevdev-uinput.h'),
		Path.join(C.dir.dist, 'include/libevdev/libevdev-uinput.h'),
	),
	Fs.promises.cp(
		Path.join(C.dir.libevdev, 'libevdev/.libs/libevdev.so'),
		Path.join(C.dir.dist, 'lib/libevdev.so'),
		{ verbatimSymlinks: true },
	),
	Fs.promises.cp(
		Path.join(C.dir.libevdev, 'libevdev/.libs/libevdev.so.2'),
		Path.join(C.dir.dist, 'lib/libevdev.so.2'),
		{ verbatimSymlinks: true },
	),
	Fs.promises.cp(
		Path.join(C.dir.libevdev, 'libevdev/.libs/libevdev.so.2.3.0'),
		Path.join(C.dir.dist, 'lib/libevdev.so.2.3.0'),
		{ verbatimSymlinks: true },
	),
])
