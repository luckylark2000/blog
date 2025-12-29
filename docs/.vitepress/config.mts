// import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "coding 消烦员的博客",
  base: "/blog/",
  description: "记录成长之旅",
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'luckylark2000-blog' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '记录成长之旅'
      }
    ],
    ['meta', { property: 'og:url', content: 'https://github.com/luckylark2000' }],
    ['meta', { property: 'og:image', content: 'https://luckylark2000.github.io/blog/images/logo.png' }]
  ],
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
        'text': '简介',
        'collapsed': false,
        'items': [
          {
            'text': '自我介绍',
            'link': '/introduce'
          },
          {
            'text': '博客导航汇总',
            'link': '/content'
          }
        ]
      },
      {
        'text': 'Vue',
        'collapsed': true,
        'items': [
          {
            'text': 'Vue官方vscode插件停止对vue2进行支持',
            'link': '/Vue/Vue官方vscode插件停止对vue2进行支持'
          },
          {
            'text': 'vue2中Mixin的缺点',
            'link': '/Vue/vue2中Mixin的缺点'
          },
          {
            'text': 'vue生态deepwiki汇总.',
            'link': '/Vue/vue生态deepwiki汇总.'
          },
          {
            'text': '一个Vue指令监控dom元素的宽度来显示不同的内容',
            'link': '/Vue/一个Vue指令监控dom元素的宽度来显示不同的内容'
          },
          {
            'text': '一个简单的Vue自定义指令之文本溢出显示title',
            'link': '/Vue/一个简单的Vue自定义指令之文本溢出显示title'
          },
          {
            'text': 'Vue3',
            'collapsed': true,
            'items': [
              {
                'text': 'Vue3项目源码结构解析',
                'link': '/Vue/Vue3/Vue3项目源码结构解析'
              },
              {
                'text': 'style的scoped是如何做到组件样式隔离的',
                'link': '/Vue/Vue3/style的scoped是如何做到组件样式隔离的'
              },
              {
                'text': 'vue3官方文档核心知识点整理-基础部分',
                'link': '/Vue/Vue3/vue3官方文档核心知识点整理-基础部分'
              },
              {
                'text': 'vue3官方文档核心知识点整理-深入组件部分',
                'link': '/Vue/Vue3/vue3官方文档核心知识点整理-深入组件部分'
              },
              {
                'text': 'vue3官方贡献指南-翻译版',
                'link': '/Vue/Vue3/vue3官方贡献指南-翻译版'
              },
              {
                'text': 'vue3源码环境安装问题整理',
                'link': '/Vue/Vue3/vue3源码环境安装问题整理'
              },
              {
                'text': '组合式api中setup语法糖中为什么不需要beforeCreate和created声明周期钩子',
                'link': '/Vue/Vue3/组合式api中setup语法糖中为什么不需要beforeCreate和created声明周期钩子'
              },
              {
                'text': '源码阅读',
                'collapsed': true,
                'items': [
                  {
                    'text': 'vue3的reactive响应式模块源码阅读计划',
                    'link': '/Vue/Vue3/源码阅读/vue3的reactive响应式模块源码阅读计划'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'text': 'AI',
        'collapsed': true,
        'items': [
          {
            'text': 'AI时代如何用快速学习源码',
            'link': '/AI/AI时代如何用快速学习源码'
          },
          {
            'text': 'AI智能体应用想法',
            'link': '/AI/AI智能体应用想法'
          },
          {
            'text': 'ClaudeCode中使用mcp整理',
            'link': '/AI/ClaudeCode中使用mcp整理'
          },
          {
            'text': 'Claude演示文稿',
            'link': '/AI/Claude演示文稿'
          },
          {
            'text': 'ai智能体项目收集',
            'link': '/AI/ai智能体项目收集'
          },
          {
            'text': '大模型汇总整理',
            'link': '/AI/大模型汇总整理'
          },
          {
            'text': 'LangChain',
            'collapsed': true,
            'items': [
              {
                'text': 'langchain1.1更新总结',
                'link': '/AI/LangChain/langchain1.1更新总结'
              },
              {
                'text': '在LangChainjs中使用DeepSeek大模型快速搭建入门项目',
                'link': '/AI/LangChain/在LangChainjs中使用DeepSeek大模型快速搭建入门项目'
              }
            ]
          }
        ]
      },
      {
        'text': 'ArchitectThinking',
        'collapsed': true,
        'items': [
          {
            'text': 'axios的拦截器应该放在axios上还是axios.create的实例上',
            'link': '/ArchitectThinking/axios的拦截器应该放在axios上还是axios.create的实例上'
          },
          {
            'text': '主流开源许可协议的对比',
            'link': '/ArchitectThinking/主流开源许可协议的对比'
          },
          {
            'text': '前端token存储方案探讨和选择',
            'link': '/ArchitectThinking/前端token存储方案探讨和选择'
          },
          {
            'text': '前端内功心法',
            'link': '/ArchitectThinking/前端内功心法'
          },
          {
            'text': '究竟怎样的表格筛选组件的封装是好的',
            'link': '/ArchitectThinking/究竟怎样的表格筛选组件的封装是好的'
          },
          {
            'text': '端到端测试dom的test-id设计思考',
            'link': '/ArchitectThinking/端到端测试dom的test-id设计思考'
          },
          {
            'text': '项目文档工具如何选择',
            'link': '/ArchitectThinking/项目文档工具如何选择'
          }
        ]
      },
      {
        'text': 'JobProblems',
        'collapsed': true,
        'items': [
          {
            'text': 'VueConfigProxy',
            'link': '/JobProblems/VueConfigProxy'
          },
          {
            'text': 'bli问题记录及其解决方案',
            'link': '/JobProblems/bli问题记录及其解决方案'
          },
          {
            'text': 'element-plus使用问题记录',
            'link': '/JobProblems/element-plus使用问题记录'
          },
          {
            'text': 'htmlCache',
            'link': '/JobProblems/htmlCache'
          },
          {
            'text': 'lockfile',
            'link': '/JobProblems/lockfile'
          },
          {
            'text': 'oneRegThinking',
            'link': '/JobProblems/oneRegThinking'
          },
          {
            'text': 'recordNodeUpgrade',
            'link': '/JobProblems/recordNodeUpgrade'
          },
          {
            'text': 'vueuse使用问题记录',
            'link': '/JobProblems/vueuse使用问题记录'
          },
          {
            'text': 'windowOpenWasIntercepted',
            'link': '/JobProblems/windowOpenWasIntercepted'
          },
          {
            'text': '下拉框数据提交后回显名称不对',
            'link': '/JobProblems/下拉框数据提交后回显名称不对'
          },
          {
            'text': '前端性能优化',
            'link': '/JobProblems/前端性能优化'
          },
          {
            'text': '双容器问题解决',
            'link': '/JobProblems/双容器问题解决'
          },
          {
            'text': '图片加载优化方案',
            'link': '/JobProblems/图片加载优化方案'
          },
          {
            'text': '如何解决倒计时不准确的情况',
            'link': '/JobProblems/如何解决倒计时不准确的情况'
          },
          {
            'text': '纯dom和svg实现饼图',
            'link': '/JobProblems/纯dom和svg实现饼图'
          }
        ]
      },
      {
        'text': 'FrontEndEngineering',
        'collapsed': true,
        'items': [
          {
            'text': 'AutoImportDnsPrefetchInHtml',
            'link': '/FrontEndEngineering/AutoImportDnsPrefetchInHtml'
          },
          {
            'text': 'CommomUsePackages',
            'link': '/FrontEndEngineering/CommomUsePackages'
          },
          {
            'text': 'DifferenceBetweenGlobalInstallAndNpmLink',
            'link': '/FrontEndEngineering/DifferenceBetweenGlobalInstallAndNpmLink'
          },
          {
            'text': 'ModularsDifferences',
            'link': '/FrontEndEngineering/ModularsDifferences'
          },
          {
            'text': 'ProgressiveImage',
            'link': '/FrontEndEngineering/ProgressiveImage'
          },
          {
            'text': 'RegixAndGlob',
            'link': '/FrontEndEngineering/RegixAndGlob'
          },
          {
            'text': 'Vue项目中环境变量在开发和生产中的运用',
            'link': '/FrontEndEngineering/Vue项目中环境变量在开发和生产中的运用'
          },
          {
            'text': 'commonLoader',
            'link': '/FrontEndEngineering/commonLoader'
          },
          {
            'text': 'editconfig的使用',
            'link': '/FrontEndEngineering/editconfig的使用'
          },
          {
            'text': 'jsDoc',
            'link': '/FrontEndEngineering/jsDoc'
          },
          {
            'text': 'npmAndWebpack',
            'link': '/FrontEndEngineering/npmAndWebpack'
          },
          {
            'text': 'nvm和volta的工具对比',
            'link': '/FrontEndEngineering/nvm和volta的工具对比'
          },
          {
            'text': 'pnmp使用问题整理',
            'link': '/FrontEndEngineering/pnmp使用问题整理'
          },
          {
            'text': 'sourcemap原理解析和实战',
            'link': '/FrontEndEngineering/sourcemap原理解析和实战'
          },
          {
            'text': 'vue2中使用pinia和pinia持久化插件及问题处理',
            'link': '/FrontEndEngineering/vue2中使用pinia和pinia持久化插件及问题处理'
          },
          {
            'text': 'webpackQuickStart',
            'link': '/FrontEndEngineering/webpackQuickStart'
          },
          {
            'text': 'window环境本地前端预构建失败如何弹窗提示失败',
            'link': '/FrontEndEngineering/window环境本地前端预构建失败如何弹窗提示失败'
          },
          {
            'text': '一个前端牛马怎么拉三个磨',
            'link': '/FrontEndEngineering/一个前端牛马怎么拉三个磨'
          },
          {
            'text': '为什么unintall一个包的时候lock文件并没有移除相应依赖记录',
            'link': '/FrontEndEngineering/为什么unintall一个包的时候lock文件并没有移除相应依赖记录'
          },
          {
            'text': '前端关闭代码格式化没有生效的原因',
            'link': '/FrontEndEngineering/前端关闭代码格式化没有生效的原因'
          },
          {
            'text': '前端各个环境下如何开启css的sourcemap',
            'link': '/FrontEndEngineering/前端各个环境下如何开启css的sourcemap'
          },
          {
            'text': '前端调试指南',
            'link': '/FrontEndEngineering/前端调试指南'
          },
          {
            'text': '知乎上一些还不错前端工程化的讨论',
            'link': '/FrontEndEngineering/知乎上一些还不错前端工程化的讨论'
          },
          {
            'text': '项目打包只提取第三方组件库的样式文件不提取内部组件的样式',
            'link': '/FrontEndEngineering/项目打包只提取第三方组件库的样式文件不提取内部组件的样式'
          },
          {
            'text': 'Vite',
            'collapsed': true,
            'items': [
              {
                'text': 'Vite项目自动导入插件的使用',
                'link': '/FrontEndEngineering/Vite/Vite项目自动导入插件的使用'
              },
              {
                'text': 'vite使用记录',
                'link': '/FrontEndEngineering/Vite/vite使用记录'
              },
              {
                'text': '利用v-html和raw-loader直接导入svg',
                'link': '/FrontEndEngineering/Vite/利用v-html和raw-loader直接导入svg'
              }
            ]
          },
          {
            'text': 'test',
            'collapsed': true,
            'items': [
              {
                'text': 'asyncTest',
                'link': '/FrontEndEngineering/test/asyncTest'
              }
            ]
          },
          {
            'text': 'webpack',
            'collapsed': true,
            'items': [
              {
                'text': '基础知识',
                'link': '/FrontEndEngineering/webpack/基础知识'
              },
              {
                'text': '实现剔除打包后文件中所有url的功能',
                'link': '/FrontEndEngineering/webpack/实现剔除打包后文件中所有url的功能'
              },
              {
                'text': '通用配置设计',
                'link': '/FrontEndEngineering/webpack/通用配置设计'
              }
            ]
          }
        ]
      },
      {
        'text': 'problemSolve',
        'collapsed': true,
        'items': [
          {
            'text': 'antdPopContainerInvalid',
            'link': '/problemSolve/antdPopContainerInvalid'
          },
          {
            'text': 'antdSelectDropRender',
            'link': '/problemSolve/antdSelectDropRender'
          },
          {
            'text': 'corejsVersionProblem',
            'link': '/problemSolve/corejsVersionProblem'
          },
          {
            'text': 'deployGithubActiveNameNotValid',
            'link': '/problemSolve/deployGithubActiveNameNotValid'
          },
          {
            'text': 'eslint中全局变量出现未定义的错误',
            'link': '/problemSolve/eslint中全局变量出现未定义的错误'
          },
          {
            'text': 'hashRouterChangeToHistoryRouter',
            'link': '/problemSolve/hashRouterChangeToHistoryRouter'
          },
          {
            'text': 'nodeInternalProblemSolve1',
            'link': '/problemSolve/nodeInternalProblemSolve1'
          },
          {
            'text': 'npm-cbNeverCalled',
            'link': '/problemSolve/npm-cbNeverCalled'
          },
          {
            'text': 'pdfShowProblem',
            'link': '/problemSolve/pdfShowProblem'
          },
          {
            'text': 'record',
            'link': '/problemSolve/record'
          },
          {
            'text': 'try和catch捕获不到WebSocket构造函数的连接错误',
            'link': '/problemSolve/try和catch捕获不到WebSocket构造函数的连接错误'
          },
          {
            'text': 'vue-cli-npm-install-wrong',
            'link': '/problemSolve/vue-cli-npm-install-wrong'
          },
          {
            'text': 'vue-style-config-eslint-prettier',
            'link': '/problemSolve/vue-style-config-eslint-prettier'
          },
          {
            'text': '文件预览综合解决方案',
            'link': '/problemSolve/文件预览综合解决方案'
          },
          {
            'text': '浏览器报错-NoResourceWithGivenIdentifierData',
            'link': '/problemSolve/浏览器报错-NoResourceWithGivenIdentifierData'
          },
          {
            'text': '解决vue-cli中安装VueUse11后找不到esm文件',
            'link': '/problemSolve/解决vue-cli中安装VueUse11后找不到esm文件'
          },
          {
            'text': '页面返回命中bfcache没有刷新页面',
            'link': '/problemSolve/页面返回命中bfcache没有刷新页面'
          }
        ]
      },
      {
        'text': 'MicroApp',
        'collapsed': true,
        'items': [
          {
            'text': 'DifferenceBetweenUmd_CommomJS_ESM',
            'link': '/MicroApp/DifferenceBetweenUmd_CommomJS_ESM'
          },
          {
            'text': 'train',
            'link': '/MicroApp/train'
          },
          {
            'text': '集成Vue2子系统遇到的问题',
            'link': '/MicroApp/集成Vue2子系统遇到的问题'
          }
        ]
      },
      {
        'text': 'design-pattern',
        'collapsed': true,
        'items': [
          {
            'text': 'UMLClassGraph',
            'link': '/design-pattern/UMLClassGraph'
          },
          {
            'text': 'basicOOP',
            'link': '/design-pattern/basicOOP'
          },
          {
            'text': 'design-principle',
            'link': '/design-pattern/design-principle'
          },
          {
            'text': 'factory-pattern',
            'link': '/design-pattern/factory-pattern'
          },
          {
            'text': 'iterator-pattern',
            'link': '/design-pattern/iterator-pattern'
          },
          {
            'text': 'observer-pattern',
            'link': '/design-pattern/observer-pattern'
          },
          {
            'text': 'proxy-pattern',
            'link': '/design-pattern/proxy-pattern'
          },
          {
            'text': 'release-subscribe-pattern',
            'link': '/design-pattern/release-subscribe-pattern'
          },
          {
            'text': 'singleton-pattern',
            'link': '/design-pattern/singleton-pattern'
          }
        ]
      },
      {
        'text': 'DataVisualize',
        'collapsed': true,
        'items': [
          {
            'text': 'ECharts',
            'collapsed': true,
            'items': [
              {
                'text': 'VisualMapAddTitle',
                'link': '/DataVisualize/ECharts/VisualMapAddTitle'
              },
              {
                'text': '带有渐变色的柱状图',
                'link': '/DataVisualize/ECharts/带有渐变色的柱状图'
              }
            ]
          }
        ]
      },
      {
        'text': 'CSS',
        'collapsed': true,
        'items': [
          {
            'text': 'CSS中transform变换中的顺序',
            'link': '/CSS/CSS中transform变换中的顺序'
          },
          {
            'text': 'CSS技巧网站',
            'link': '/CSS/CSS技巧网站'
          },
          {
            'text': 'CSS新特性anchor-position',
            'link': '/CSS/CSS新特性anchor-position'
          },
          {
            'text': 'CSS新特性corner-shap',
            'link': '/CSS/CSS新特性corner-shap'
          },
          {
            'text': 'CSS新特性if',
            'link': '/CSS/CSS新特性if'
          },
          {
            'text': 'antdvue1.7.8的主题色切换方案',
            'link': '/CSS/antdvue1.7.8的主题色切换方案'
          },
          {
            'text': 'clip-path的使用',
            'link': '/CSS/clip-path的使用'
          },
          {
            'text': '加入购物车的效果',
            'link': '/CSS/加入购物车的效果'
          },
          {
            'text': '如何优雅地实现一个带小数的星星评分显示效果',
            'link': '/CSS/如何优雅地实现一个带小数的星星评分显示效果'
          },
          {
            'text': '媒体查询汇总',
            'link': '/CSS/媒体查询汇总'
          },
          {
            'text': '触发分层的CSS样式',
            'link': '/CSS/触发分层的CSS样式'
          },
          {
            'text': 'CSS的Baseline基准',
            'collapsed': true,
            'items': [
              {
                'text': '2024CSS新基准功能',
                'link': '/CSS/CSS的Baseline基准/2024CSS新基准功能'
              },
              {
                'text': '2025CSS基准特性',
                'link': '/CSS/CSS的Baseline基准/2025CSS基准特性'
              }
            ]
          }
        ]
      },
      {
        'text': 'Canvas',
        'collapsed': true,
        'items': [
          {
            'text': 'record',
            'link': '/Canvas/record'
          }
        ]
      },
      {
        'text': 'Git',
        'collapsed': true,
        'items': [
          {
            'text': 'howCheckFileHistory',
            'link': '/Git/howCheckFileHistory'
          },
          {
            'text': '如何对比当前工作目录和某个commit的代码差异',
            'link': '/Git/如何对比当前工作目录和某个commit的代码差异'
          }
        ]
      },
      {
        'text': 'JavaScript',
        'collapsed': true,
        'items': [
          {
            'text': 'CloseAnOpenedWindow',
            'link': '/JavaScript/CloseAnOpenedWindow'
          },
          {
            'text': 'DragableSort',
            'link': '/JavaScript/DragableSort'
          },
          {
            'text': 'PromiseLearn',
            'link': '/JavaScript/PromiseLearn'
          },
          {
            'text': 'WeakSet',
            'link': '/JavaScript/WeakSet'
          },
          {
            'text': 'ajax',
            'link': '/JavaScript/ajax'
          },
          {
            'text': 'crossAera',
            'link': '/JavaScript/crossAera'
          },
          {
            'text': 'storage',
            'link': '/JavaScript/storage'
          },
          {
            'text': '词法作用域和作用域链和执行上下文',
            'link': '/JavaScript/词法作用域和作用域链和执行上下文'
          },
          {
            'text': 'postMessage',
            'collapsed': true,
            'items': [
              {
                'text': 'postMessage的使用',
                'link': '/JavaScript/postMessage/postMessage的使用'
              }
            ]
          },
          {
            'text': 'websocket',
            'collapsed': true,
            'items': [
              {
                'text': 'websocket封装',
                'link': '/JavaScript/websocket/websocket封装'
              },
              {
                'text': '带有重试机制的websocket思考',
                'link': '/JavaScript/websocket/带有重试机制的websocket思考'
              }
            ]
          },
          {
            'text': '闭包从入门到精通',
            'collapsed': true,
            'items': [
              {
                'text': 'deepseek设计的以战带练学习路线',
                'link': '/JavaScript/闭包从入门到精通/deepseek设计的以战带练学习路线'
              },
              {
                'text': '学习总结',
                'link': '/JavaScript/闭包从入门到精通/学习总结'
              },
              {
                'text': '通义设计的学习路线',
                'link': '/JavaScript/闭包从入门到精通/通义设计的学习路线'
              }
            ]
          }
        ]
      },
      {
        'text': '安全security',
        'collapsed': true,
        'items': [
          {
            'text': 'CSRF攻击',
            'link': '/security/CSRF攻击'
          },
          {
            'text': '前端漏洞处理',
            'collapsed': true,
            'items': [
              {
                'text': 'DOM-XSS',
                'link': '/security/FrontEndVulnerability/DOM-XSS'
              },
              {
                'text': 'ElementPlus漏洞整理',
                'link': '/security/FrontEndVulnerability/ElementPlus漏洞整理'
              },
              {
                'text': '软件库漏洞来源整理',
                'link': '/security/FrontEndVulnerability/软件库漏洞来源整理'
              },
              {
                'text': 'Axios漏洞',
                'collapsed': true,
                'items': [
                  {
                    'text': '2025Axios高危漏洞CVE-2025-58754分析',
                    'link': '/security/FrontEndVulnerability/AxiosVulnerability/2025Axios高危漏洞CVE-2025-58754分析'
                  },
                  {
                    'text': 'Axios漏洞整理',
                    'link': '/security/FrontEndVulnerability/AxiosVulnerability/Axios漏洞整理'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        'text': 'leetcode',
        'collapsed': true,
        'items': [
          {
            'text': 'binarySearch',
            'link': '/leetcode/binarySearch'
          },
          {
            'text': 'evalRPN',
            'link': '/leetcode/evalRPN'
          },
          {
            'text': 'groupAnagrams',
            'link': '/leetcode/groupAnagrams'
          },
          {
            'text': 'isPalindrome',
            'link': '/leetcode/isPalindrome'
          },
          {
            'text': 'largestRectangleArea',
            'link': '/leetcode/largestRectangleArea'
          },
          {
            'text': 'longestConsecutive',
            'link': '/leetcode/longestConsecutive'
          },
          {
            'text': 'maxProfit',
            'link': '/leetcode/maxProfit'
          },
          {
            'text': 'removeElement',
            'link': '/leetcode/removeElement'
          },
          {
            'text': 'twoSum',
            'link': '/leetcode/twoSum'
          }
        ]
      },
      {
        'text': 'Test',
        'collapsed': true,
        'items': [
          {
            'text': '几种Xpath浏览器插件对比',
            'link': '/Test/几种Xpath浏览器插件对比'
          },
          {
            'text': 'PlayWright',
            'collapsed': true,
            'items': [
              {
                'text': 'palywight快速开始入门',
                'link': '/Test/PlayWright/palywight快速开始入门'
              },
              {
                'text': 'playwright中如何模拟websocket',
                'link': '/Test/PlayWright/playwright中如何模拟websocket'
              },
              {
                'text': 'playwright使用setup来保存登录状态信息',
                'link': '/Test/PlayWright/playwright使用setup来保存登录状态信息'
              },
              {
                'text': 'playwright参数化测试',
                'link': '/Test/PlayWright/playwright参数化测试'
              },
              {
                'text': 'playwright在use里面设置的配置不生效怎么处理',
                'link': '/Test/PlayWright/playwright在use里面设置的配置不生效怎么处理'
              },
              {
                'text': 'playwright处理组件库文件上传组件input的display为none怎么处理上传逻辑',
                'link': '/Test/PlayWright/playwright处理组件库文件上传组件input的display为none怎么处理上传逻辑'
              },
              {
                'text': 'playwright如何在多个串行的测试用例之间重用单个Page对象',
                'link': '/Test/PlayWright/playwright如何在多个串行的测试用例之间重用单个Page对象'
              },
              {
                'text': 'playwright常用配置介绍',
                'link': '/Test/PlayWright/playwright常用配置介绍'
              },
              {
                'text': 'playwright常见问题梳理',
                'link': '/Test/PlayWright/playwright常见问题梳理'
              },
              {
                'text': 'playwright的Fixtures夹具的使用',
                'link': '/Test/PlayWright/playwright的Fixtures夹具的使用'
              }
            ]
          },
          {
            'text': 'vitest',
            'collapsed': true,
            'items': [
              {
                'text': 'Vitest基本使用',
                'link': '/Test/vitest/Vitest基本使用'
              }
            ]
          }
        ]
      },
      {
        'text': 'libraryUseRecord',
        'collapsed': true,
        'items': [
          {
            'text': 'PDFJSUseRecord',
            'link': '/libraryUseRecord/PDFJSUseRecord'
          },
          {
            'text': 'axios的拦截器执行顺序',
            'link': '/libraryUseRecord/axios的拦截器执行顺序'
          },
          {
            'text': '使用jimp库生成图片',
            'link': '/libraryUseRecord/使用jimp库生成图片'
          },
          {
            'text': '轻量级JSON存储库lowdb的使用',
            'link': '/libraryUseRecord/轻量级JSON存储库lowdb的使用'
          }
        ]
      },
      {
        'text': 'performanceOptimization',
        'collapsed': true,
        'items': [
          {
            'text': 'cssOptimization',
            'link': '/performanceOptimization/cssOptimization'
          },
          {
            'text': '加快网页加载速度方案',
            'link': '/performanceOptimization/加快网页加载速度方案'
          },
          {
            'text': '网络层面的优化',
            'link': '/performanceOptimization/网络层面的优化'
          }
        ]
      },
      {
        'text': 'sourceCodeRead',
        'collapsed': true,
        'items': [
          {
            'text': '源码阅读计划',
            'link': '/sourceCodeRead/源码阅读计划'
          }
        ]
      },
      {
        'text': 'thinking',
        'collapsed': true,
        'items': [
          {
            'text': '学习探索123',
            'link': '/thinking/学习探索123'
          },
          {
            'text': '知道的越多越胆小还是知道的越多越胆大',
            'link': '/thinking/知道的越多越胆小还是知道的越多越胆大'
          },
          {
            'text': '学习的本质',
            'collapsed': true,
            'items': [
              {
                'text': '学习的本质之体验与实践',
                'link': '/thinking/学习的本质/学习的本质之体验与实践'
              },
              {
                'text': '学习的本质之情感和上下文',
                'link': '/thinking/学习的本质/学习的本质之情感和上下文'
              },
              {
                'text': '学习的本质之直觉与顿悟',
                'link': '/thinking/学习的本质/学习的本质之直觉与顿悟'
              },
              {
                'text': '学习的本质之组合技',
                'link': '/thinking/学习的本质/学习的本质之组合技'
              }
            ]
          }
        ]
      },
      {
        'text': 'typescript',
        'collapsed': true,
        'items': [
          {
            'text': 'basic',
            'link': '/typescript/basic'
          }
        ]
      },
      {
        'text': '开源项目架构分析和学习',
        'collapsed': true,
        'items': [
          {
            'text': 'Dify项目web架构分析',
            'link': '/开源项目架构分析和学习/Dify项目web架构分析'
          }
        ]
      },
      {
        'text': 'electron',
        'collapsed': true,
        'items': [
          {
            'text': 'basic',
            'link': '/electron/basic'
          },
          {
            'text': 'electron-vite-project',
            'link': '/electron/electron-vite-project'
          },
          {
            'text': 'engineer-environment-config',
            'link': '/electron/engineer-environment-config'
          }
        ]
      },
      {
        'text': 'html',
        'collapsed': true,
        'items': [
          {
            'text': 'data-属性的使用',
            'link': '/html/data-属性的使用'
          },
          {
            'text': 'iframe加载支付宝的二维码',
            'link': '/html/iframe加载支付宝的二维码'
          },
          {
            'text': 'images-show',
            'link': '/html/images-show'
          },
          {
            'text': 'ps-usage',
            'link': '/html/ps-usage'
          },
          {
            'text': 'tag-a',
            'link': '/html/tag-a'
          },
          {
            'text': 'ul-ol',
            'link': '/html/ul-ol'
          }
        ]
      },
      {
        'text': 'ChromeExtensions',
        'collapsed': true,
        'items': [
          {
            'text': '支持热更新的浏览器插件开发框架和工具推荐',
            'link': '/ChromeExtensions/支持热更新的浏览器插件开发框架和工具推荐'
          }
        ]
      },
      {
        'text': 'NodeJS',
        'collapsed': true,
        'items': [
          {
            'text': 'express',
            'collapsed': true,
            'items': [
              {
                'text': 'https',
                'link': '/NodeJS/express/https'
              },
              {
                'text': 'middleware',
                'link': '/NodeJS/express/middleware'
              }
            ]
          }
        ]
      },
      {
        'text': 'SVG',
        'collapsed': true,
        'items': [
          {
            'text': 'SVG拾遗',
            'link': '/SVG/SVG拾遗'
          },
          {
            'text': '深入浅出SVG学习笔记',
            'link': '/SVG/深入浅出SVG学习笔记'
          }
        ]
      },
      {
        'text': 'VSCode',
        'collapsed': true,
        'items': [
          {
            'text': 'VSCode关于Git的settings和插件',
            'link': '/VSCode/VSCode关于Git的settings和插件'
          },
          {
            'text': 'vscode1.106更新总结和实用配置推荐',
            'link': '/VSCode/vscode1.106更新总结和实用配置推荐'
          },
          {
            'text': 'vscodePlugins',
            'link': '/VSCode/vscodePlugins'
          },
          {
            'text': 'vscode从1.92版本开始去除了incoming和outgoing替代方案',
            'link': '/VSCode/vscode从1.92版本开始去除了incoming和outgoing替代方案'
          },
          {
            'text': 'vscode开启fileNesting支持文件折叠达到分类的效果',
            'link': '/VSCode/vscode开启fileNesting支持文件折叠达到分类的效果'
          },
          {
            'text': 'vscode相关学习资料整理',
            'link': '/VSCode/vscode相关学习资料整理'
          },
          {
            'text': '多重光标多位置编辑',
            'link': '/VSCode/多重光标多位置编辑'
          },
          {
            'text': '新版vscode去除快捷键显示Copilot的AI对话框功能',
            'link': '/VSCode/新版vscode去除快捷键显示Copilot的AI对话框功能'
          }
        ]
      },
      {
        'text': 'backend',
        'collapsed': true,
        'items': [
          {
            'text': 'java',
            'collapsed': true,
            'items': [
              {
                'text': 'maven',
                'link': '/backend/java/maven'
              }
            ]
          }
        ]
      },
      {
        'text': 'buildMyOwn',
        'collapsed': true,
        'items': [
          {
            'text': 'MyOwnCLI',
            'link': '/buildMyOwn/MyOwnCLI'
          },
          {
            'text': 'buildMyOwnProjectToSignPDF',
            'link': '/buildMyOwn/buildMyOwnProjectToSignPDF'
          }
        ]
      },
      {
        'text': 'db',
        'collapsed': true,
        'items': [
          {
            'text': 'postgresql',
            'collapsed': true,
            'items': [
              {
                'text': 'PG数据库学习资料整理',
                'link': '/db/postgresql/PG数据库学习资料整理'
              },
              {
                'text': '为什么要学习postgresql',
                'link': '/db/postgresql/为什么要学习postgresql'
              }
            ]
          }
        ]
      },
      {
        'text': 'MDNDocLearn',
        'collapsed': true,
        'items': [
          {
            'text': 'WebAPI',
            'collapsed': true,
            'items': [
              {
                'text': 'EventTarget',
                'link': '/MDNDocLearn/WebAPI/EventTarget'
              }
            ]
          }
        ]
      },
      {
        'text': 'http',
        'collapsed': true,
        'items': [
          {
            'text': 'status',
            'link': '/http/status'
          }
        ]
      },
      {
        'text': 'python',
        'collapsed': true,
        'items': [
          {
            'text': 'mkdocs使用',
            'link': '/python/mkdocs使用'
          }
        ]
      },
      {
        'text': 'wxdev',
        'collapsed': true,
        'items': [
          {
            'text': '微信小程序原生开发基础知识',
            'link': '/wxdev/微信小程序原生开发基础知识'
          }
        ]
      },
      {
        'text': 'systems',
        'collapsed': true,
        'items': [
          {
            'text': 'window',
            'collapsed': true,
            'items': [
              {
                'text': '如何解决windows系统中sdxhelper占用高CPU问题',
                'link': '/systems/window/如何解决windows系统中sdxhelper占用高CPU问题'
              }
            ]
          }
        ]
      },
      {
        'text': 'toolInstall',
        'collapsed': true,
        'items': [
          {
            'text': 'Draw.io',
            'link': '/toolInstall/Draw.io'
          },
          {
            'text': 'installMermaidInVitepress',
            'link': '/toolInstall/installMermaidInVitepress'
          },
          {
            'text': 'windows中安装just工具',
            'link': '/toolInstall/windows中安装just工具'
          }
        ]
      },
      {
        'text': '庄子阅读笔记和读后感',
        'collapsed': true,
        'items': [
          {
            'text': '养生主',
            'link': '/庄子阅读笔记和读后感/养生主'
          }
        ]
      },
      {
        'text': 'life',
        'collapsed': true,
        'items': [
          {
            'text': '眼睛疼痛中医辩证治疗记录',
            'link': '/life/眼睛疼痛中医辩证治疗记录'
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
