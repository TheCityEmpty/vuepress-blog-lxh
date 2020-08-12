#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 进入生成的文件夹
cd dist

# 初始化git 仓库
git init

git remote add origin https://github.com/TheCityEmpty/vuepress-blog-lxh.git

echo '以下是本地分支：'
git branch -a

echo '更新远程分支....'
git fetch

echo '更新完成的分支：'
git branch -a

# 将打包文件直接添加进缓冲区
git add .
read -p '请输入提交msg:' commitMsg
git commit -m $commitMsg


echo '将本地master 分支关联远程master分支'
git branch --set-upstream-to=origin/master master

echo '强制push, 替换掉打包文件'
git push -f


cd ../

echo '正在删除dist文件夹目录...'

rm -fr dist

echo '博客已更新！'

export commitMsg

./push-github.sh