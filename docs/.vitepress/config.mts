import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "coding 消烦员的博客",
  base: "/blog/",
  description: "记录成长之旅",
  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    outline: {
      label: "页面导航"
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    search: {
      provider: "local"
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/content" }
    ],

    sidebar: [
      {
        text: "简介",
        collapsed: false,
        items: [{ text: "自我介绍", link: "/introduce" }]
      },
      {
        text: "LeetCode",
        collapsed: true,
        items: [
          { text: "两数之和", link: "/leetcode/twoSum" },
          { text: "二分查找", link: "/leetcode/binarySearch" }
        ]
      },
      {
        text: "问题解决",
        collapsed: true,
        items: [
          {
            text: "解决.yml文件中提示 name 无效",
            link: "/problemSolve/deployGithubActiveNameNotValid"
          }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/luckylark2000/blog" }
    ]
  }
});
