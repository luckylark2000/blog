# LazyVim 修改默认终端为 PowerShell

去AppData\local\nvim\lua\config\options.lua 文件，添加以下内容：

```lua
local opt = vim.opt

opt.shell = "pwsh"
opt.shellcmdflag = "-Command"
opt.shellquote = ""
opt.shellxquote = ""
```

保存后重启 nvim，输入：

```bash
:terminal
```

打开终端，就会看到终端已经切换为 PowerShell 了
