# wsl 快速安装指南附带安装 oh-my-zsh

## 安装

关闭所有代理和梯子，亲测可以安装，就是不稳定，有时候快有时候慢

运行

```bash
wsl --install
```

如果安装过程停在 0.0%，请先运行 `wsl --install --web-download -d <DistroName>` 下载发行版，然后再进行安装。

比如：

```bash
wsl --install --web-download
#或者
wsl --install --web-download -d Ubuntu
```

如果是第一次安装的话，安装完之后，可能会提示：

```txt
请求的操作成功。直到重新启动系统前更改将不会生效。
```

这个时候就需要重启电脑

开机后再运行

```bash
wsl install
```

就会开始下载 Ubuntu 镜像会比较快，下载完自动安装，然后会弹出来 WSL 的 GUI 界面，是一个蓝色的企鹅，先放一边，我们先在命令行设置用户名和密码。

设置完用户名和密码之后，这个时候就是安装的最新的 wsl 了，可以更新软件包，执行：

```bash
sudo apt update && sudo apt upgrade -y
```

可选地去添加镜像源（这里先不添加了，自行查阅）

## 使用 mirrored 模式的 network

使用 mirrored 模式的 network 的优点就是可以让 wsl 和本机的网络使用一个 IP，然后就可以共用代理，也就是我们的梯子（科学上网）

先执行

```bash
wsl --shutdown
```

关闭 wsl，然后去 WSL Settings 中修改`网络->网络模式`为`Mirrored`

到命令行中执行 wsl 启动（如果下面没成功，可能需要重启电脑），然后执行

```bash
curl -v https://baidu.com
#如果开了梯子
curl -v https://google.com
```

如果成功了可以看到命令行打印了一大串，里面有`HTTP/1.1 200 Connection established`就代表成功了。

解答一下有的朋友用`ping google.com`的时候 ping 不通的问题，其实这是正常现象。不是设置的问题，因为 ping 使用的是 ICMP 协议，大部分梯子只支持 HTTP 和 HTTPS，所以 Ping 不通。而 curl 使用的是 HTTP 协议，所以可以用来验证 WSL 中访问代理的有效性。

## 安装 oh-my-zsh

```bash
# 安装 zsh
sudo apt install zsh -y

# 验证安装
zsh --version

# 查看当前 shell
echo $SHELL

# 将 zsh 设为默认 shell
chsh -s $(which zsh)

# 直接启动 zsh
zsh
```

在

```bash
You can:

(q)  Quit and do nothing.  The function will be run again next time.

(0)  Exit, creating the file ~/.zshrc containing just a comment.
     That will prevent this function being run again.

(1)  Continue to the main menu.

(2)  Populate your ~/.zshrc with the configuration recommended
     by the system administrator and exit (you will need to edit
     the file by hand, if so desired).
```

选择 2

然后执行：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

一键安装 oh-my-zsh 主题，就大功告成了。

## 安装 docker

直接去官网下载 windows 版的 Docker Desktop Installer，然后一路 next 等待直到安装完成

bash 命令行中执行：`docker -v`看看 docker 是否安装成功

docker 的镜像源可以使用阿里云的个人镜像源，免费拉取公开的一些库的镜像，一般个人够用。

TIP:默认在 WSL 内部是没有 docker 的，执行`docker -v`会显示：

```txt
The command 'docker' could not be found in this WSL 2 distro.
We recommend to activate the WSL integration in Docker Desktop settings.

For details about using Docker Desktop with WSL 2, visit:

https://docs.docker.com/go/wsl2/
```

推荐直接使用 Docker Desktop，没有必要单独安装一个

## 安装 wsl vscode 插件

直接 vscode 中搜索 wsl 插件，安装即可。

这样的话就可以在 WSL 中使用 `code .` 打开项目了

## 结束

大公告成
