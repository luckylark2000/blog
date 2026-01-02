# zsh 常用工具安装

## zsh-syntax-highlighting

<https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md#oh-my-zsh>

## zsh-autosuggestions

<https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh>

## zsh-completions

自动补全

<https://github.com/zsh-users/zsh-completions?tab=readme-ov-file#oh-my-zsh>

唯一需要注意的是，这个是不需要加配置到 plugins 的，而是在`source "$ZSH/oh-my-zsh.sh"`之前加上，特定的配置：

```diff
+ fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src
+ autoload -U compinit && compinit
source "$ZSH/oh-my-zsh.sh"
```

## 主题色插件

### powerlevel10k

非常火的主题色插件

<https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#oh-my-zsh>
