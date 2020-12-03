---
description: '让我们的程序自动化起来。'
isHot: false
types: ['bash', '自动化工程']
endTime: '2020/08/12'

---
# 学习bash

## 1. 什么是Shell脚本
 
 `Shell` 是命令行环境， `Shell` 这个单词的原意是“外壳”，，即用户跟电脑内核交互的对话界面。而 `Bash` 是 `Unix` 系统和 `Linux` 系统的一种 `Shell`（命令行环境），是目前绝大多数 `Linux` 发行版的默认 `Shell`。平常我们使用的 `git` 工具就是一种 `Shell` 。 如果你安装了 `git` ， 右击桌面点击 `Git Bash Here`，即可打开一个 `Shell` (命令行工具)。

<img :src="$withBase('/1596791116.png')" data-water style="width: 500px;height: 300px;" alt="git程序">

在这里面我们可以输入 `git` 常用的命令，如 `git push` 上传代码， `git pull` 下载代码， `git clone http...` 克隆代码等。我们也可以输入 `linux` 命令，如 `clear` 清除当前页面， `rm aa.txt` 删除 aa.txt文件等命令。

可以看到上面有一群字母， 含义分别为 `Administrator` 是用户名（user）， `@` 是分隔符， `WIN-1PTBJBO8FDV` 是主机名（hostname）， `~/Desktop` 是当前目录，也就是桌面。
```bash
Administrator@WIN-1PTBJBO8FDV MINGW64 ~/Desktop
$
```
进入到这个界面，一般来说就算是已经打开的了 `bash` 。如果没有打开则可以使用 `bash` 命令打开，如果打开了，使用 `bash` 命令可以开启一个子 `bash` 。
```bash
bash
```
而相应的 `exit` 命令可以退出当前的 `bash`，如果你已经是子 `bash` 了，则退出到上一级父 `bash` 中，否则他会退出当前的 `git` 程序。
```bash
exit
```
如果你想查看当前 `bash` 版本，可以使用 `bash --version` 命令。
```bash
bash --version
// 记住， 不能简写为 bash -v 哦
```
:roll_eyes: :roll_eyes: :roll_eyes:

## 2. 开发一个Shell脚本

如何来开发并运行一个我们期待效果的 `shell` 脚本呢？

一般来说，`shell` 脚本的文件名采用 `.sh` 结尾，比如 `deploy.sh`，这样就是一个 `shell` 脚本。

而运行的话我们在 `package.json` 中的  `scripts` 中添加一项， 执行 `npm run bash` 这样就运行了一个 `shell` 脚本。

```js {8}
// package.json 文件
{
  "name": "vuepress-blog-lxh",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "bash": "bash deploy.sh"
  }
  ...
}
```
平常我们上传代码到仓库的时候需要自己执行多条命令才能上传成功。现在就可以写一个 `shell` 脚本一行命令执行这项操作。

```deploy.sh 文件```
```bash
#!/usr/bin/env bash

echo '检查变动文件->'
git status

echo '将所有变动文件添加到缓存区->'
git add .

echo '请输入commit消息->'
read commitMsg
git commit -m $commitMsg

echo '将代码推入到远程分支->'
git push

```
接下来我们去执行这个 `bash` 文件， 我们也可以在 `bash.sh` 文件的当前目录下在命令行工具中执行 `bash bash.sh` 也是可以的。(在vscode中去执行的)

<img :src="$withBase('/1597026802.png')" data-water style="width: 723px;height: 529px;" alt="bash bash.sh 执行情况">

发现代码已经上传成功了。接下来我们来看下上面代码的含义。

### （1） 脚本解释器
可以看下下面的 6 行解释器， `#!`是特殊的表示符，其后面跟的是解释此脚本的脚本解释器shell的路径。

一般来说是这样写法， 表示 告诉操作系统在执行这个脚本的时候，调用/usr/bin下的bash解释器
```bash
#!/usr/bin/bash
```
而这种写法是为了防止操作系统用户没有将 `bash` 装在默认的 `/usr/bin` 路径里。当系统看到这一行的时候，首先会到 `env` 设置里查找 `bash` 的安装路径，再调用对应路径下的解释器程序完成操作。
```bash
#!/usr/bin/env bash
```
::: details 有兴趣的同学可以搜索下 sh 和 bash 的关系。刚好我有点兴趣，所以给大家总结一下网上的说法。
1. 两者没什么差别，类似于 `javascrip` 和 `typescript` 的区别。 `sh` 是一种规范而不是一种实现。 
2. `sh` 是 `bash` 简化版 
3. `sh` 是 `bash` 的连接， 执行 `sh` 最终会指向 `bash`。
:::


```bash
#!/usr/bin/env sh
```
```bash
#!/usr/bin/sh
```
这个是调用了 `node` 解释器，和上面的一样。
```bash
#!/usr/bin/env node
```
```bash
#!/usr/bin/node
```
::: warning 提示
#!与脚本解释器之间有没有空格，都是可以的。

脚本解释器行不是必须的， 但最好加上。原因是如果不加需要自己主动调用相应的解释器去执行。但是我发现好像不主动调用也可以，可能是电脑设置了啥环境变量吧。
:::

脚本执行的另一种方式 (不主动调用)`./bash.sh` ，发现也可以执行相应的脚本。如果不加脚本解释器的话，需要下面这种执行：

主动调用 `bash` 或者 `/user/bin/sh`
```
bash bash.sh
# 或者 /user/bin/sh ./bash.sh
```

### （2） echo 命令

`echo` 命令类似于 `js` 中的 `console.log()`， 输出后面的 字符串 变量 啥的。

### （3） read 命令

`read` 命令是 让我们在中途可以操控程序的方法。

脚本执行到这条命令之后会暂停执行，显示可输入光标，在你输入后按下 `enter` 确认键， 脚本就会接着往下执行。

`read` 后面可以接一个变量名字，将用户所输入的文字赋值给这个变量。然后下一条脚本我们就可以使用该变量了。

```bash
read commitMsg
git commit -m $commitMsg
```
这里其实相当于创建了一个 `commitMsg` 变量， 然后用 `$commitMsg` 来使用这个变量。读取变量直接在变量前面加入 `$` 符号就可以了。

当然 `read` 命令还有很多的用法， 后面可以接 参数代表不同的含义， 

比如 ：

#### [1.] `read -t 3 commitMsg`
表示超时 3秒 后用户还没输入， 脚本放弃等待， 继续向下执行。

#### [2.] `read -s commitMsg`
表示不把用户输入的文字显示在屏幕中，常常用于密码的输入。

具体的可以参考：
[阮一峰的bash教程中的read用法](https://wangdoc.com/bash/read.html)

这样我们就完成了一个脚本的开发， 其他的语法都是 `git` 中的语法，无关 `bash`。

### （4） 多种运行脚本的方法

#### [1.] `./bash.sh`

如果使用 `#!` 指定了解析器，就使用指定解析器执行，如果没有使用系统默认的解析器，一般来说默认的解析器就是 `sh`。

#### [2.] `bash bash.sh`

指定解析器来执行，如何指定的解析器 `bash` 不存在还是会使用默认的解析器

#### [3.] `. bash.sh`

注意： 点后面有一个空格；
直接使用默认解析器解析

### （5） 单双引号的意义

```bash
#!/usr/bin/env sh

num=200

echo "num=$num"
echo 'num=$num'
```

输出结果为：
```
$ . bash.sh
num=200
num=$num
```
可以发现双引号中的变量会被解释，但是单引号里面会当做字符串解释。

## 3. 优化一个Shell脚本，学习更多的 `bash` 脚本语法
在改代码之前，我去 `github` 上修改了我的仓库， 这样就会使得在我本地修改之后想 `push` 会造成冲突。
我们将代码改为下面的样子。 然后执行命令 `bash -x bash.sh '测试冲突'` 。
```bash {3,6,9,11-13,16,20-26}
#!/usr/bin/env sh

set -u

git status
echo '检查变动文件->' + $?

git add .
echo '将所有变动文件添加到缓存区->' + $?

if [ $1 ] ; then
    git commit -m $1
  else
    read commitMsg
    git commit -m $commitMsg
  fi

git push

pushRes=$?
echo '将代码推入到远程分支息->' + $pushRes

if [ $pushRes = '1' ] ; then
  git pull
  echo '代码有冲突， 请在本地修改，修改完继续执行此条命令 bash bash.sh'
fi
```

### （1） `set` 命令

`set` 命令是 `Bash` 脚本的重要环节，却常常被忽视，导致脚本的安全性和可维护性出问题。 `set` 命令用来修改 `Shell` 环境的运行参数，即定制环境。

#### [1.] `set -u`

执行下面脚本时，会发现 `$a` 是个不存在的变量。但是脚本不会报错， `$a` 被输出为一个空行了。
大多数情况下，这不是开发者想要的行为，遇到变量不存在，脚本应该报错，而不是一声不响地往下执行。
```bash
echo $a
echo '哈哈哈'
```

而 `set -u` 的含义就是 遇到不存在的变量就会停止运行脚本， 抛出错误。
```bash
set -u
```

#### [2.] `set -x`

通常情况下， 执行脚本只会输出 `echo` 打印的数据， 其他的并不会输出， 遇见有判断分支的，不断去打印判断走哪条分支比较麻烦。 可以使用此命令， 每执行一条命令都会打印一条字符串，`+该命令的字符` 。比如执行下面脚本：
```bash
echo 'aa'
```
输出：

```js
+echo 'aa'
aa
```

在调试阶段非常好用， 而之前我运行的命令 `bash -x bash.sh '测试冲突'` 中的 `-x` 参数也是和 `set -x` 一样的效果。

### （2） 特殊变量

```bash
set -u

# $? 为上一个命令的退出码，用来判断命令是否成功，0则表示成功， 非0则 表示执行失败
echo $?

# $0 为当前 Shell 的名称（在命令行直接执行时）或者脚本名（在脚本中执行时）
# 而 $1 ~ $9 分别对应脚本的第一个参数到第九个参数
echo $0

# $# 参数的总数
echo $#

# $@ 全部的参数，参数之间使用空格分隔
echo $@
```

而在我优化脚本中， 使用了 `$?` 判断 `git push` 是否执行成功。 使用 `$1` 读取 `bash -x bash.sh '测试冲突'` 执行命令中的第一个参数 `'测试冲突'` ，将其赋值给pushRes。

::: danger 创建变量并赋值
`pushRes=$?` 等号旁边切记不能有空格， 有时我们写习惯了 `eslint` 校验的代码， 下意识的会在等号两边加入空格。在 `bash` 中是不正确的。 如果要在等号右边赋值带有空格的字符串则需要，这样写 `pushRes='aa bb cc '`
:::


### （3） 条件判断

类似于 `js` 中的 `if (布尔值) {}`， 在 `bash` 中的写法有四种：

而一些命令也可以充当这个布尔值， 成功则执行 `then`。
```bash
if 布尔值 ; then
  # todo
fi

if [布尔值] ; then
  # todo
fi

if [[布尔值]] ; then
  # todo
fi

if test 布尔值 ; then
  # todo
fi

# 命令充当这个布尔值
if cd dirname ;then
  echo '哦哦' # 如果 `cd dirname` 执行成功了 则会输出 '哦哦'
fi

# `if` 后面可以接多条命令， 但是判断真伪只看最后一条命令，即使前面的命令都失败， 最后一条命令成功了， 就会执行 
# `then` 的部分
if cd aa;cd bb; true ; then
  echo 'true' # 试图打开 不存在的 aa 和 bb 目录， 自然会执行失败，但是最后一条命令是 true 则会走 `then` 的部分
fi
```

## 4. 看看别的语法

### （1）`export`语法 和 运行子进程

在脚本实现很多功能的时候可能会分成好几个脚本，比如下面的代码：

将打包后的文件上传到master分支，将源代码上传到code分支。每次上传代码都需要填写 commit message，于是使用 `export` 语法将接受来的 `$commitMsg` 变量传递到 子进程中。

使用 `./gitCode.sh` 运行一个子进程， 当然其他两种语法也是可以运行的 `. gitCode.sh` `bash gitCode.sh`
##### >gitMaster.sh
```bash
#!/usr/bin/env sh

set -e
cd dist
git init
git remote add origin https://github.com/TheCityEmpty/vuepress-blog-lxh.git

echo '更新远程分支....'
git fetch
echo '更新完成的分支：'
git branch -a

# 将打包文件直接添加进缓冲区
git add .
read commitMsg
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

./gitCode.sh
```

##### >gitCode.sh
```bash
 #! /bin/sh

 set -e
 echo '开始更新code分支代码'
 git status
 git add .
 git commit -m $commitMsg
 echo trying to push to origin master...
 git push

 echo '代码已经打包并上传成功....'
```

在子进程中是可以修改传递过来的变量的， 修改后是不会影响父进程。
##### parent.sh
```bash
export a='aa'
./child.sh
```

##### child.sh
```bash
a='ccc'
echo $a
```

输出结果为：
```
$ bash parent.sh
ccc
```

### （2）`for`循环，`&&` ，数组

下面是一段获取文件夹下面文件名的脚本。

假如我们的文件目录是这样的:

***

<img :src="$withBase('/1597222407.png')" data-water style="width: 500px;height: 300px;" alt="git程序">

***

我们想获取 `bash` 文件夹和 `javascript` 文件夹下面的去文件后缀的文件名
>create-ls.sh
```bash
#!/usr/bin/env sh
set -u

f='./docs'
# 获取 docs 文件夹下的文件
fs=$(ls $f)
# 遍历 $fs 变量
for filename in $fs;
do
  # 判断文件名字 记住每个 布尔表达式 都要用 [ true ] 包裹， 并且要包含空格。
  #  `["$filename" != "other-pages"]` 这样没有空格就会报错
  if [ "$filename" != "other-pages" ] && [ "$filename" != "README.md" ]; then
    currentFiles=$(ls "$f/$filename")
    for cFilename in $currentFiles;
    do
      # cFilename 变量在这里不能加 $ 符号 否则报错
      fileArr+=(${cFilename%%.*})
    done
      # 变成空字符串 相当于销毁了这个变量
    currentFiles=''
  fi
done

# 输出这个数组的所有值
echo  ${fileArr[@]}
```

#### 结语：bash 脚本还有很多很多的知识点，这些只是一部分。学习了bash 后发现，bash 语法比较严格， 有些地方不能有空格有些地方又一定要有， 有些地方要写单引号有些地方要写双引号，比较难搞。而且报错不太好排除。共勉！



*** 

参考资料： 

[阮一峰的bash教程](https://wangdoc.com/bash)

