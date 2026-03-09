# Yinglit EV — 项目进度追踪

> 产品展示站：https://github.com/yupeng0512/yinglit-ev
> 技术栈：Next.js 16 + Tailwind CSS + next-intl (EN/ZH) + Static JSON Provider

## 已完成 ✅

| 阶段 | 内容 | 状态 |
|------|------|------|
| Phase 0 | 需求确认：B2B 模式、EN+ZH、Payload CMS 预留 | ✅ |
| Phase 1 | PDF 数据提取 → 35 个产品 + 5 个分类 | ✅ |
| Phase 2 | "Electric Precision" 设计系统 (Exo + Work Sans, Navy + Electric Blue) | ✅ |
| Phase 3 | Next.js 16 + next-intl + Tailwind + Shadcn 脚手架 | ✅ |
| Phase 4 | 8 个核心页面开发 (Home/Products/Detail/Solutions/OEM/Certs/About/Contact) | ✅ |
| Phase 5 | 构建验证 + 浏览器视觉检查 | ✅ |
| Phase 6 | GitHub 推送 (yupeng0512/yinglit-ev) | ✅ |

## 待完成 🔲

### P0 — 部署上线

- [ ] Vercel 导入 GitHub 仓库 → https://vercel.com/new 选择 `yupeng0512/yinglit-ev`
- [ ] 设置 `SITE_URL` 环境变量为生产域名
- [ ] 确认 SSL 和域名解析

### P1 — 产品图片

- [ ] 替换 placeholder 图片为实际产品照片
  - 路径：`public/images/products/`
  - 命名约定：`{category}-{slug}.jpg`（如 `portable-charger-ev-box-3-5kw.jpg`）
  - 建议尺寸：800×600px，WebP 格式
  - 需要覆盖 35 个产品，可按分类批量处理：
    - portable-charger (3 张)
    - home-ac-charger (6 张)
    - public-ac-charger (9 张)
    - dc-charger (14 张)
    - energy-storage (3 张)

### P2 — Payload CMS 集成

- [ ] 按 `src/lib/types.ts` 的 `DataProvider` 接口实现 Payload Provider
- [ ] 配置 Payload 集合（Products, Categories, Settings）
- [ ] 在 `.env` 中配置 `DATA_PROVIDER=payload` 和 Payload 连接串
- [ ] 数据迁移：从 `products.json` 导入到 Payload
- [ ] 参考：`site-builder` skill 中的 `references/admin-guide.md`

### P3 — 新增页面内容

- [ ] Cloud Platform 页面 — 云平台和 APP 功能介绍
  - 路由已预留：`/[locale]/cloud-platform`
  - 内容：OCPP 管理系统、移动 APP、远程监控、数据分析
- [ ] Project Cases 页面 — 全球项目案例展示
  - 路由已预留：`/[locale]/cases`
  - 内容：按国家/地区展示安装案例，含图片和规模数据

### P4 — 表单后端

- [ ] Contact 页面询盘表单对接后端 API
  - 方案 A：Vercel Serverless Function + Resend/SendGrid 邮件通知
  - 方案 B：连接 Payload CMS 的 Form Submissions 集合
  - 方案 C：第三方表单服务（Formspree / Tally）
- [ ] 表单提交后发送邮件通知到 `John@yinglitech.com`
- [ ] 可选：存储询盘记录到数据库/CMS

### P5 — SEO 增强

- [ ] 提交 Sitemap 到 Google Search Console
- [ ] 配置 Google Analytics / Vercel Analytics
- [ ] 添加 Organization 类型的 JSON-LD 到首页
- [ ] 优化 Core Web Vitals（产品图片加载后重点关注 LCP）

### P6 — 功能增强

- [ ] 暗色模式切换（CSS 变量已预设 dark mode）
- [ ] 产品对比功能
- [ ] 产品搜索（考虑 Algolia 或客户端搜索）
- [ ] Blog / News 页面（如有内容需求）

## 技术决策记录

| 决策 | 选择 | 原因 |
|------|------|------|
| 框架 | Next.js 16 App Router | SSG + ISR 支持，SEO 友好 |
| i18n | next-intl (sub-path routing) | Server Component 原生支持，轻量 |
| 样式 | Tailwind CSS + Shadcn/UI | 快速开发 + 一致性 |
| 数据层 | Static JSON Provider（可切换 Payload） | 无服务器依赖，后续可平滑迁移 |
| 部署 | Vercel | Next.js 官方推荐，免运维 |
| 设计 | Electric Precision（科技精密路线） | 符合 EV 充电行业专业调性 |

## 文件结构速查

```
src/
├── app/[locale]/           # 页面路由（i18n）
│   ├── page.tsx            # 首页
│   ├── products/           # 产品列表 + 详情
│   ├── solutions/          # 解决方案
│   ├── oem-odm/            # OEM/ODM
│   ├── certifications/     # 认证资质
│   ├── about/              # 关于我们
│   └── contact/            # 联系我们
├── components/             # 可复用组件
│   ├── home/               # 首页 sections
│   ├── layout/             # Header + Footer
│   ├── product/            # 产品卡片 + 详情
│   └── ui/                 # Shadcn 基础组件
├── data/                   # 静态数据
│   ├── products.json       # 35 个产品
│   ├── categories.json     # 5 个分类
│   └── settings.json       # 站点配置
├── lib/                    # 核心逻辑
│   ├── types.ts            # 类型定义 + DataProvider 接口
│   ├── provider.ts         # 数据提供工厂
│   └── providers/          # 具体实现（static-json）
├── messages/               # i18n 翻译
│   ├── en.json
│   └── zh.json
└── i18n/                   # 路由 + 请求配置
```
