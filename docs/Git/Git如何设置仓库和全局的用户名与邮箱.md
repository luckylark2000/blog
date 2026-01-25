# Git如何设置仓库和全局的用户名与邮箱

## 1. **全局设置**（适用于所有仓库）

```bash
# 设置全局用户名
git config --global user.name "你的用户名"

# 设置全局邮箱
git config --global user.email "你的邮箱"
```

## 2. **针对特定仓库设置**（优先级高于全局设置）

```bash
# 进入项目目录
cd /path/to/your/project

# 设置当前仓库的用户名
git config user.name "你的用户名"

# 设置当前仓库的邮箱
git config user.email "你的邮箱"
```

## 3. **查看当前配置**

```bash
# 查看所有配置
git config --list

# 查看全局配置
git config --global --list

# 查看特定配置项
git config user.name
git config user.email
```

## 4. **不同层级配置的优先级**

1. 仓库级配置（使用 `git config` 不带 `--global`）
2. 全局配置（`~/.gitconfig` 或 `~/.config/git/config`）
3. 系统级配置（`/etc/gitconfig`）

## 5. **配置文件位置**

- **全局配置**：`~/.gitconfig`（Linux/macOS）或 `C:\Users\用户名\.gitconfig`（Windows）
- **系统配置**：`/etc/gitconfig`（Linux/macOS）或 `C:\Program Files\Git\etc\gitconfig`（Windows）
- **仓库配置**：项目目录下的 `.git/config`

## 6. **示例**

```bash
# 设置全局配置
git config --global user.name "John Doe"
git config --global user.email "john@example.com"

# 针对某个工作项目使用不同的配置
cd /projects/work-project
git config user.name "John Doe - Work"
git config user.email "john.doe@company.com"
```

## 7. **重要提示**

- 设置的用户名和邮箱会出现在你的提交记录中
- 建议使用真实的邮箱地址（特别是 GitHub/GitLab 用户）
- 如果使用 GitHub，建议使用 GitHub 提供的 `noreply` 邮箱保护隐私

## 8. **一次性设置**（针对单次提交）

```bash
# 为单次提交设置不同的邮箱
git -c user.email="temp@example.com" commit -m "提交信息"
```

设置完成后，可以使用 `git config --list` 确认配置是否正确生效。
