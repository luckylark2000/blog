// import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
// https://vitepress.dev/reference/site-config
export default withMermaid({
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
    footer: {
      message: "Released under the ISC License.",
      copyright: "Copyright © 2024-present Estar Zhang"
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
        text: "JavaScript",
        collapsed: true,
        items: [{ text: "ajax", link: "/JavaScript/ajax" }]
      },
      {
        text: "LeetCode",
        collapsed: true,
        items: [
          { text: "两数之和", link: "/leetcode/twoSum" },
          { text: "二分查找", link: "/leetcode/binarySearch" },
          { text: "逆波兰表达式求值", link: "/leetcode/evalRPN" },
          { text: "验证回文串", link: "/leetcode/isPalindrome" },
          { text: "最长连续序列", link: "/leetcode/longestConsecutive" },
          { text: "买卖股票的最佳时机", link: "/leetcode/maxProfit" },
          { text: "异位词分组", link: "/leetcode/groupAnagrams" }
        ]
      },
      {
        text: "设计模式",
        collapsed: true,
        items: [
          { text: "面向对象基础知识", link: "/design-pattern/basicOOP" },
          { text: "UML 类图", link: "/design-pattern/UMLClassGraph" },
          { text: "工厂模式", link: "/design-pattern/factory" }
        ]
      },
      {
        text: "工具安装",
        collapsed: true,
        items: [
          {
            text: "在VitePress中安装 Mermaid",
            link: "/toolInstall/installMermaidInVitepress"
          }
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
    ],
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    }
  }
});
