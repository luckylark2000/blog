# mkdocs使用

## 安装

参考官方文档

```bash
uv add mkdocs
```

推荐安装 mkdocs-material 主题

## 使用

核心配置是 docs 文件夹，还有 mkdocs.yml 文件

开发运行服务：

```bash
mkdocs serve
# uv
uv run mkdocs serve
```

=== "pip"
    ```bash
    mkdocs serve
    ```

=== "uv"
    ```bash
    uv run mkdocs serve
    ```

## 部署

直接在master 分支下执行

如果是pip 安装的  

```bash
mkdocs gh-deploy
```

如果是uv 安装的

```bash
uv run mkdocs gh-deploy
```

这个会自动生成 gh-pages 分支，然后push到github，github 会自动生成一个 gh-pages 站点

## 注意

热更新失效，因为 click 的版本问题，大于等于8.2.1的都会有问题，可以锁到8.2.0

```bash
pip install click==8.2.0
# uv
uv add click==8.2.0
```
