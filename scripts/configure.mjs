import Fs from 'node:fs'
import { execSync } from 'node:child_process'
import C from './util/common.js'

console.log("configure build in", C.dir.libevdev)

execSync([
	`cd ${C.dir.libevdev}`,
	'autoreconf --install --force',
	'autoconf',
	'automake',
	'./configure',
].join(' && '), { stdio: 'inherit' })
