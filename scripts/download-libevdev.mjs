import Fs from 'node:fs'
import { execSync } from 'node:child_process'
import C from './util/common.js'

const url = 'https://gitlab.freedesktop.org/libevdev/libevdev.git'
const tag = `libevdev-${C.version}`

console.log("clone", url, "at", tag)
await Fs.promises.rm(C.dir.libevdev, { recursive: true }).catch(() => {})
execSync(`git clone --depth 1 --branch ${tag} ${url} ${C.dir.libevdev}`, { stdio: 'inherit' })
