<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/static/images/logo-dark.svg">
    <img alt="Skyplume" src="public/static/images/skyplume-card.svg" width="480">
  </picture>
</p>

<p align="center">
  一个精致、内容优先的 Next.js 博客模板。<br/>适合个人发布、工程笔记、项目记录和长篇 MDX 写作。
</p>

<p align="center">
  <a href="https://github.com/ruoduan-hub/next-blog-skyplume-template/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ruoduan-hub/next-blog-skyplume-template?style=flat&color=%2317897e">
  </a>
  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-17897e?style=flat">
  </a>
  <a href="https://github.com/ruoduan-hub/next-blog-skyplume-template">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ruoduan-hub/next-blog-skyplume-template?color=17897e&style=flat">
  </a>
  <br/>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js">
  <img alt="React" src="https://img.shields.io/badge/React-19-087ea4?style=flat&logo=react">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat&logo=typescript">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat&logo=tailwindcss">
  <img alt="Contentlayer" src="https://img.shields.io/badge/Contentlayer-2-000?style=flat">
  <img alt="MDX" src="https://img.shields.io/badge/MDX-1b1f24?style=flat&logo=mdx">
  <a href="https://www.0x1ai.com/">
    <img alt="Production" src="https://img.shields.io/badge/production-0x1ai.com-17897e?style=flat">
  </a>
</p>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fruoduan-hub%2Fnext-blog-skyplume-template&project-name=skyplume-blog&repository-name=skyplume-blog">
    <img src="https://vercel.com/button" alt="Deploy with Vercel">
  </a>
  <a href="https://github.com/ruoduan-hub/next-blog-skyplume-template/generate">
    <img alt="使用此模板" src="https://img.shields.io/badge/使用此模板-238636?style=flat&logo=github">
  </a>
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> ·
  <a href="#亮点">亮点</a> ·
  <a href="#配置站点">配置</a> ·
  <a href="#写文章">写作</a> ·
  <a href="#部署到-vercel">部署</a> ·
  <a href="./README.md">English</a>
</p>

---

![Skyplume 博客模板首页截图，展示简洁导航、首屏介绍、文章列表和内容优先的排版](intro/demo-blog.png)

---

## 为什么选择 Skyplume

Skyplume 源自 [Ruoduan](https://www.0x1ai.com/) 的个人博客 [0x1ai.com](https://www.0x1ai.com/) —— 一个经过多年生产环境打磨、持续维护的真实站点。它保留了一个认真对待个人发布所需要的全部要素：

- **写作体验。** MDX 优先，内置 front matter、阅读时间、目录、数学公式、引用、代码高亮和自定义组件。
- **搜索可见性。** 完整的 SEO 体系 —— metadata、Open Graph、Twitter 卡片、JSON-LD、sitemap、robots.txt、RSS。
- **阅读舒适度。** 克制的排版、安静的配色、暗色模式、流畅的页面过渡。
- **开发者掌控。** 纯数据文件 + 小型 React 组件，没有 CMS 锁定，没有隐藏的配置层。

---

## 亮点

| | |
| --- | --- |
| **框架** | Next.js 15 App Router、React 19、TypeScript、Tailwind CSS 4、Contentlayer 2 |
| **写作** | MDX、KaTeX 数学、引用、代码标题 + 高亮、标题锚点、GitHub Alerts |
| **SEO** | Open Graph、Twitter 卡片、JSON-LD `BlogPosting`、canonical URL、sitemap、robots.txt、RSS |
| **发现** | 构建时本地搜索索引、标签页、结构化归档、RSS feed |
| **阅读** | 暗色模式、响应式布局、阅读时间、目录、上一篇/下一篇导航 |
| **动效** | 路由过渡、错落渐入首屏、滚动显现、列表动画、进度条 |
| **性能** | 静态生成、优化的字体加载、静态资源长期缓存、支持静态导出 |
| **安全** | CSP、Referrer Policy、HSTS、Frame 保护、Content-Type 保护 |
| **Lighthouse** | 基础模板调优至 **100 性能 / 100 最佳实践 / 100 SEO** |

![Lighthouse 三项 100 分截图](intro/lighthouse.png)

---

## 设计理念

Skyplume 的设计原则是**先阅读，后装饰**。界面使用克制的间距、清晰的字体层级、安静的边框，让内容始终处于第一位。动效刻意保持短促、轻量 —— 只为导航和列表增添质感，不喧宾夺主。

**Mineral Teal 配色。** 低饱和、带实验室气质的矿物绿，搭配青绿倾向的灰阶。正文和元信息由安静的灰阶承载，让长文阅读保持稳定。主色只用于链接、焦点状态和关键交互。暗色模式下，接近墨绿的灰阶底色让长文阅读舒适不刺眼。

模板强调**可拥有性**。大多数定制从数据文件和 MDX 开始 —— 而不是一个隐藏的管理后台。

---

## 快速开始

```bash
yarn install
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000)。

### 可用脚本

```bash
yarn dev       # 启动开发服务器
yarn build     # 生产构建 + RSS 生成
yarn serve     # 本地预览生产构建
yarn analyze   # Bundle 分析
yarn lint      # 检查 app、components、layouts、scripts
```

### 静态导出

```bash
EXPORT=true UNOPTIMIZED=true yarn build
```

如需部署在子路径下，设置 `BASE_PATH` 环境变量。

---

## 配置站点

优先修改以下文件，每个文件均有注释说明：

| 文件 | 用途 |
| --- | --- |
| `data/siteMetadata.js` | 站点标题、URL、作者、SEO 默认值、搜索、评论 |
| `data/profile.ts` | 关于页：个人简介、链接、技能 |
| `data/authors/default.mdx` | 默认作者信息 |
| `data/headerNavLinks.ts` | 顶部导航链接 |
| `data/projectsData.ts` | 项目页内容 |
| `public/static/images/skyplume-card.svg` | 社交分享卡片 |
| `public/static/favicons/favicon.svg` | 浏览器图标 |

### 评论（Giscus）

复制 `.env.example` 为 `.env.local` 并填写 Giscus 配置。如需关闭评论，在 `data/siteMetadata.js` 中将 `comments.provider` 设为空字符串。

---

## 写文章

在 `data/blog` 下创建 MDX 文件：

```mdx
---
title: 我的第一篇文章
date: '2026-01-01'
tags:
  - nextjs
  - writing
categories:
  - notes
draft: false
summary: 用于卡片、feed 和 SEO 的简短描述。
authors:
  - default
---

用 MDX 写你的文章。
```

图片放在 `public/static/blog/<post-slug>` 下，然后这样引用：

```mdx
![截图](/static/blog/my-first-post/screenshot.png)
```

模板内置了一篇示例文章：`data/blog/term-proxy.mdx`。

---

## 部署到 Vercel

点击上方一键部署按钮即可。模板无需 newsletter、analytics 或评论密钥即可直接启动 —— 一切可选。

---

## 项目结构

```
app/                 App Router 页面、metadata、sitemap、robots
components/          通用 UI、MDX 组件、搜索、主题、动效
data/                站点元数据、作者、个人资料、项目、文章
layouts/             博客文章和列表布局
public/static/       图片、favicon、文章资源
scripts/             RSS 和构建后工具
css/                 Tailwind、语法高亮、动画
```

---

## 推荐到 Vercel

Skyplume 适合提交到 Vercel 模板社区：

- **分类：** Blog、Next.js、Tailwind CSS、MDX
- **仓库：** [ruoduan-hub/next-blog-skyplume-template](https://github.com/ruoduan-hub/next-blog-skyplume-template)
- **生产参考：** [0x1ai.com](https://www.0x1ai.com/)

> Skyplume 是一个源于真实生产站点的精致 Next.js 15 博客模板。内置 MDX 写作、Contentlayer、Tailwind CSS 4、本地搜索、RSS、sitemap、JSON-LD、Open Graph 默认配置、暗色模式、Giscus 评论、静态导出、安全 headers，并针对 Lighthouse Performance、Best Practices、SEO 三项 100 分做了基础调优。

---

## 致谢

源自 [0x1ai.com](https://www.0x1ai.com/) 的生产博客系统，由 [Ruoduan](https://www.0x1ai.com/) 构建和维护。

## License

MIT — 自由使用、修改和发布。
