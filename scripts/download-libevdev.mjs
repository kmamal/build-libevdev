import Fs from 'node:fs'
import { once } from 'node:events'
import C from './util/common.js'
import { fetch } from './util/fetch.js'
import Tar from 'tar'

const url = `https://gitlab.freedesktop.org/libevdev/libevdev/-/archive/libevdev-${C.version}/libevdev-libevdev-${C.version}.tar.gz`

console.log("fetch", url)
const response = await fetch(url)

console.log("unpack to", C.dir.libevdev)
await Fs.promises.rm(C.dir.libevdev, { recursive: true }).catch(() => {})
await Fs.promises.mkdir(C.dir.libevdev, { recursive: true })
const tar = Tar.extract({ gzip: true, strip: 1, C: C.dir.libevdev })
response.stream().pipe(tar)
await once(tar, 'finish')
