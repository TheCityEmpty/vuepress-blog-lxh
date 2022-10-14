---
description: '每次压缩文件放到服务器上都需要手动压缩，太麻烦了， 尝试用自动化来解决。'
isHot: false
types: ['bash', 'zip']
endTime: '2020/08/26'

---
# 如何在windows 上运行解压命令

## 1. 在linux中执行解压命令

有时在一台新的 `linux` 主机中运行命令发现运行不了，提示是未知的命令，那一定是你没有安装 `zip` 工具。

```bash
zip cc.zip cc // -bash: zip: command not found
```

安装zip: 当然也要安装 `unzip` 用于解压 `zip` 文件。

```bash
yum install zip

#yum install unzip
```


## 2. 在windows中执行解压命令

打开 `git bash` 工具，发现用不了 `zip` 命令。然后再网上找到一个方法，已测试，是可以用的。

***

1：去[https://sourceforge.net/projects/gnuwin32/files/](https://sourceforge.net/projects/gnuwin32/files/)下载 `zip-3.0-bin.zip` 和 `bzip2-1.0.5-bin.zip` 压缩包（有不同版本及类型确保下载正确哦）

2：打开 `git bash` 使用 `where git` 找到 `git` 安装目录。 一般是 `C:\Program Files\Git\mingw64\bin\git.exe`。

3：解压压缩包并把 `zip-3.0-bin.zip` 解压后的 `bin` 文件夹下的 `zip.exe` 文件和 `bzip2-1.0.5-bin.zip` 解压后的 `bin` 文件夹下的 `bzip2.dll` 文件统一放在本地 `git` 下载目录 `bin` 目录下

4：重新试一下吧，发现 `zip` 命令和 `unzip` 命令都可以执行了。


## 3. vue打包 后将打包文件压缩

`postprd` 后置命令， 在执行完 `prd` 后， 会自动执行 `postprd`。
>package.json
```json
...
"scripts": {
    "prd": "vue-cli-service build",
    "postprd": "bash zip-bundler.sh"
}
...

```
> zip-bundler.sh
```bash
# !/user/bin/env sh

set -e

echo '正在压缩打包文件...'
zip njcb-wine-loan.zip njcb-wine-loan

echo '压缩完毕！'

echo '正在删除打包文件...'
echo '删除完毕！'
rm -r njcb-wine-loan

```
