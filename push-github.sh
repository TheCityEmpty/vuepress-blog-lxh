 #! /bin/sh

 set -e
 echo check git status...
   git status

 echo Please Enter the commit message:
 read message
 # echo message is $message

 git add .
 git commit -m "$message"
 echo committed

 echo trying to push to origin master...
 git push

 echo '代码已经打包并上传成功....'