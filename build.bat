
@echo off

setlocal

set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/

node node_modules/electron-packager/cli.js ./dist s3-browser --overwrite --out=build --electron-version=1.8.2 --platform=win32 --arch=x64 --icon=./custom/icon.ico 
