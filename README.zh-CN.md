# Skyplume 博客模板

> 一个精致、内容优先的 Next.js 博客模板，适合个人发布、工程笔记、项目记录和长篇 MDX 写作。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fruoduan-hub%2Fnext-blog-skyplume-template&project-name=skyplume-blog&repository-name=skyplume-blog)
[![GitHub stars](https://img.shields.io/github/stars/ruoduan-hub/next-blog-skyplume-template?style=social)](https://github.com/ruoduan-hub/next-blog-skyplume-template/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)

[English](./README.md)

Skyplume 是一个开源博客模板，源于 [Ruoduan](https://www.0x1ai.com/) 的个人博客 [0x1ai.com](https://www.0x1ai.com/) 的真实生产体验。它保留了一个认真维护的个人站点真正需要的部分：快速加载、清晰排版、良好的 SEO 默认配置、MDX 写作、RSS、站点地图、本地搜索、标签、暗色模式、细腻动画，以及易于二次定制的项目结构。

## 链接

- 生产参考站点：[0x1ai.com](https://www.0x1ai.com/)
- GitHub 仓库：[ruoduan-hub/next-blog-skyplume-template](https://github.com/ruoduan-hub/next-blog-skyplume-template)
- 一键部署：[Deploy Skyplume to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fruoduan-hub%2Fnext-blog-skyplume-template&project-name=skyplume-blog&repository-name=skyplume-blog)
- 使用为 GitHub 模板：[Generate a new repository](https://github.com/ruoduan-hub/next-blog-skyplume-template/generate)

## 亮点

- 基于 Next.js 15 App Router、React 19、TypeScript、Tailwind CSS 4 和 Contentlayer 构建
- MDX 优先的写作流程，支持 front matter、阅读时间、目录、代码高亮、数学公式、引用、提示块、图片、iframe 和自定义组件
- 内置 SEO 元数据、Open Graph 卡片、Twitter 卡片、文章 JSON-LD、canonical URL、sitemap、robots 和 RSS
- 构建时生成本地搜索索引，基于 `pliny`
- 支持标签、分页、作者信息、项目页、关于页和可选 Giscus 评论
- 支持跟随系统的暗色模式
- 细节动画：路由过渡、首页渐入、滚动显现、文章列表显现、悬停状态和顶部进度条
- 包含安全相关的 Next.js headers、静态资源长期缓存和静态导出支持
- 基础模板已针对 Lighthouse 三项 100 分调优：Performance、Best Practices、SEO

## 设计理念

Skyplume 的设计原则是先阅读，后装饰。界面使用克制的间距、清晰的字体层级、安静的边框和聚焦的文章布局，让内容始终处在第一位。动画保持短促、轻量，只用于提升导航和列表的质感，不把博客做成动画展示页。

这个模板也强调可拥有性。大多数定制都从普通的数据文件、MDX 文件和小型 React 组件开始，不依赖庞大的 CMS 或隐藏很深的配置层。

## 主题色设计理念

Skyplume 使用 Mineral Teal 主题色：一组低饱和、带实验室气质的矿物绿，并搭配带轻微青绿色倾向的灰阶。正文、列表、边框和内容容器继续由安静的灰阶承载，让长文阅读保持稳定；主色只用于链接、焦点状态、顶部进度条、标签和关键交互状态。

这套颜色遵循三个原则：

- 阅读先行：正文、列表和元信息继续交给低 chroma 灰阶承载，避免主色抢走长文阅读的注意力。
- 实验室气质：Mineral Teal 只在链接、焦点、进度条和关键状态上出现，像仪器指示灯一样建立站点记忆点。
- 深色稳定：深色模式使用接近墨绿的灰阶做底，主色降到 400/300 色阶，保证 hover、链接和代码细节清楚但不刺眼。

## 功能概览

| 模块     | 已包含能力                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| 内容发布 | `data/blog` MDX 文章、草稿、摘要、图片、分类、标签、作者、阅读时间、目录                                                   |
| 内容渲染 | GitHub 风格 Markdown、KaTeX 数学公式、引用、代码标题、语法高亮、标题锚点、自定义图片和 iframe                              |
| 页面导航 | 首页信息流、博客列表、分页、标签页、项目页、关于页、上一篇/下一篇                                                          |
| SEO      | App Router metadata、页面元数据工具、Open Graph、Twitter Cards、JSON-LD `BlogPosting`、canonical URL、sitemap、robots、RSS |
| 内容发现 | 构建时生成 `search.json`、RSS feed、标签计数、结构化归档页                                                                 |
| 用户体验 | 响应式布局、暗色模式、本地搜索、评论、回到顶部/评论入口、顶部进度条                                                        |
| 性能     | 静态生成、Contentlayer 构建产物、优化字体加载、静态资源缓存、可选静态导出                                                  |
| 安全     | CSP、Referrer Policy、Frame 保护、Content-Type 保护、HSTS、Permissions Policy                                              |

## SEO 与 Lighthouse

Skyplume 提供的是实用的 SEO 基础，而不是事后补上的几个 meta 标签：

- `app/layout.tsx` 中的全站 metadata
- `app/seo.tsx` 中的页面 metadata 工具
- `app/blog/[...slug]/page.tsx` 中的文章 metadata
- 基于 MDX front matter 生成的 JSON-LD `BlogPosting`
- 根据静态路由和已发布文章生成的 `sitemap.xml`
- 带 sitemap 发现能力的 `robots.txt`
- 构建后生成的 `feed.xml`
- 通过 `data/siteMetadata.js` 配置的 Open Graph 和 Twitter 默认图片
- 用于卡片、feed 和搜索摘要的文章 summary

基础模板已针对 Lighthouse 的 Performance、Best Practices、SEO 三项 100 分进行调优。最终分数仍取决于你的内容、第三方脚本、图片、统计工具、评论系统和部署环境，因此在完成定制后建议重新运行 Lighthouse。

![Lighthouse 三项 100 分截图](intro/lighthouse.png)

## 动画细节

模板的动效系统刻意保持轻量：

- `PageTransition` 为路由切换提供短促的淡入上移动画
- `ProgressBar` 提供轻量级导航反馈
- `LabHero` 使用错落渐入呈现首屏
- `PostFeed` 在文章进入视口时显现列表项
- `ScrollReveal` 可用于页面区块的滚动显现
- `css/animations.css` 集中维护关键帧，方便调整

## 技术栈

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Contentlayer 2
- MDX
- Pliny utilities
- Giscus comments
- Yarn

## 快速开始

```bash
yarn install
yarn dev
```

打开 <http://localhost:3000>。

## 部署到 Vercel

最快方式是使用 README 顶部的一键部署按钮。它会把本仓库克隆到你的 Git 服务中，创建 Vercel 项目，并使用默认配置完成部署。

评论是可选能力。模板在没有 newsletter、analytics 或评论密钥的情况下也可以启动。如需启用 Giscus 评论，复制 `.env.example` 为 `.env.local` 并填写对应配置。

## 配置站点

建议优先修改这些文件：

- `data/siteMetadata.js`：站点标题、URL、作者、邮箱、GitHub、评论、搜索和 SEO 默认配置
- `data/profile.ts`：关于页资料、链接、技能和模板说明内容
- `data/authors/default.mdx`：默认作者信息和简介
- `data/headerNavLinks.ts`：顶部导航
- `data/projectsData.ts`：项目页内容
- `public/static/images/skyplume-card.svg`：社交分享图
- `public/static/favicons/favicon.svg`：网站图标

如需评论功能，复制 `.env.example` 为 `.env.local` 并填写 Giscus 配置。若要关闭评论，在 `data/siteMetadata.js` 中把 `comments.provider` 设置为空字符串即可。

## 写文章

在 `data/blog` 中创建 MDX 文件。

```mdx
---
title: My First Post
date: '2026-01-01'
tags:
  - nextjs
  - writing
categories:
  - notes
draft: false
summary: A short description for feeds, cards, and SEO.
authors:
  - default
---

Write your post in MDX.
```

文章图片建议放在 `public/static/blog/<post-slug>` 下，并这样引用：

```mdx
![Screenshot](/static/blog/my-first-post/screenshot.png)
```

模板内置了一篇示例文章：`data/blog/term-proxy.mdx`。

## 可用脚本

```bash
yarn dev       # 启动本地开发
yarn build     # 构建 Next.js 并生成 RSS
yarn serve     # 启动生产构建
yarn analyze   # 运行 bundle analyzer
yarn lint      # 检查 app、components、layouts、scripts
```

## 静态导出

Skyplume 支持导出为静态文件：

```bash
EXPORT=true UNOPTIMIZED=true yarn build
```

如果部署在子路径下，可以配合 `BASE_PATH` 使用。

## 项目结构

```text
app/                 App Router 页面、metadata、sitemap、robots
components/          通用 UI、MDX 组件、搜索、主题、动效
data/                站点元数据、作者、资料、项目、文章
layouts/             博客文章和列表布局
public/static/       图片、favicon 和文章资源
scripts/             RSS 和构建后脚本
css/                 Tailwind、语法高亮、动画
```

## 推荐 GitHub Topics

如果你 fork 或发布基于 Skyplume 的衍生模板，可以使用这些 topics 提升可发现性：

```text
nextjs nextjs-template blog-template mdx contentlayer tailwindcss typescript vercel static-site personal-website
```

## 推荐给 Vercel

Skyplume 适合提交到 Vercel 社区作为精致的博客模板展示：

- 分类匹配：Blog、Next.js、Tailwind CSS、MDX、static content
- 仓库：<https://github.com/ruoduan-hub/next-blog-skyplume-template>
- 生产参考站点：<https://www.0x1ai.com/>
- 一键部署：<https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fruoduan-hub%2Fnext-blog-skyplume-template&project-name=skyplume-blog&repository-name=skyplume-blog>

推荐短文案：

> Skyplume 是一个源于真实生产个人站点的精致 Next.js 15 博客模板。它内置 MDX 写作、Contentlayer、Tailwind CSS 4、本地搜索、RSS、sitemap、JSON-LD、Open Graph 默认配置、暗色模式、Giscus 评论、静态导出、安全 headers，并针对 Lighthouse Performance、Best Practices、SEO 三项 100 分做了基础调优。

## 致谢

本模板源于 [Ruoduan](https://www.0x1ai.com/) 在 [0x1ai.com](https://www.0x1ai.com/) 使用的博客系统，并被整理为一个可复用的开源起点，用于搭建清爽、快速、内容优先的个人博客。

## License

MIT
