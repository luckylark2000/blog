# 解决 npm install 出错：cb（） never called，方案汇总

## 背景

今天起项目的时候，之前把 node_modules 删了，需要重新安装，但是重新 npm install 安装的时候，就报了错：

```bash
cb() never called!  npm ERR! This is an error with npm itself. Please report this error at: npm ERR!     <https://npm.community>
```

就是说是 npm 工具自身的问题，也没有什么报错调用站的信息。只能搜索大法了。说一下我的环境，node 14.21.3, npm 6.14.18，windows 11。

## 解决方案

我就通过各种渠道收集了一下解决方案，最终自己也是解决了，在这边总结一下：

### 方案一

删除 `node_modules` ，清除 npm 的缓存 cache，清除无效缓存 `npm cache verify`，删除 `package-lock.json` 文件，重新 npm install。这个对我没有效果。

### 方案二

升级 node 和 npm 版本。我在本地试了一下 ，使用 nvm 升级到了node 16，npm 版本跟着升级到了 8，确实是可以npm install 成功，但是 npm run dev 的时候出错了，应该是一些依赖有问题和 node16 不兼容。而且公司基本上都是用得 node 14 版本，基于流水线构建的，不到万不得已不升 node。可以作为备选方案吧。

### 方案三

我是去 stack overflow 上找的，说是项目中文件夹的权限是只读的导致的，去文件夹右键，编辑属性，取消只读属性，然后重新 npm install 就可以了（重新npm install 可以参考方案一的重新安装的方式）。我这个也试了，确实npm install 成功了，但是也出现了方案二一样的在 npm run dev 报错。

### 方案四

单独升级 npm，强行升级 npm，然后重新 npm install 就可以了。查了一下 AI，并不推荐，因为这个升级 npm 的操作可能会破坏你的 npm 安装，并且可能会导致一些问题。

### 方案五

就是重启大法，类似于电脑重启哈哈哈。我是根据前面几个方案的启发，还有就是一点灵感吧。

因为项目之前运行地好好的，非常有可能是一些缓存的问题，虽然 npm 缓存清理了，不知道可能还有什么缓存，一些隐藏文件的更改之类，还有就是一些node引擎v8之类的代码容易做缓存之类的，等等吧。

我就重新找了一个文件夹，然后重新拉了一份代码，然后重新安装就好了。

## Git 小技巧

>[!TIP]
>
>小技巧：在之前项目中写的还没有提交的代码如何快速地迁移，就是使用 git 的 patch，打补丁。

具体操作就是原项目中打补丁，新项目中应用补丁。

原项目中：

```bash
git add . # 把所有修改都 stage，不 stage 的话，新增文件不会打到补丁里

git diff --staged > my_change.patch # 生成补丁文件
```

新项目中：

把之前的 `my_change.patch`文件先放到新项目的根目录下，接着先 --check 一下，看是否可以应用，如果可以，再应用。操作：

```bash
git apply --check my_change.patch
git apply my_change.patch
```

## 总结

本文汇总了自己在解决 npm install 的时候遇到的 `cd() never called!` 的问题的解决方法。分享了 git patch 的使用方法。有收获的话可以点个免费的赞哟。
