 #! /bin/sh

 set -e
 echo '开始更新code分支代码'
 echo check git status...
 git status


 git add .
 git commit -m $commitMsg
 echo committed

 echo trying to push to origin master...
 git push

 echo '代码已经打包并上传成功....'