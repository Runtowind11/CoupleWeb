# Our Story — 我们的故事

一个记录两人爱情点滴的情侣纪念网站：纪念日恋爱天数、博客、相册与后台管理，采用液态玻璃质感 UI。

## 功能特性

- 💖 纪念日恋爱天数计数器（首页实时跳动）
- 📝 博客系统：Markdown 写作、发布、编辑与删除
- 📷 相册：图片上传、浏览与删除
- 🔐 管理员登录：主管理员与副管理员凭邮箱密码直接登录
- 📊 管理后台：文章 / 相册管理
- 🎨 液态玻璃质感界面（毛玻璃 + 光斑背景 + 内高光）
- 🎬 观影平台入口

## 技术栈

- [Next.js 16](https://nextjs.org)（App Router + Turbopack）
- React 19 / TypeScript
- Tailwind CSS v4 + shadcn/ui
- Supabase（PostgreSQL + Auth + Storage）
- pnpm 包管理器

## 本地开发

### 环境要求

- Node.js 20+
- pnpm

### 步骤

```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的 Supabase 项目 URL 与 anon key

# 3. 启动开发服务器
pnpm dev
```

打开 http://localhost:3000 即可访问。

## 数据库

数据库使用 Supabase（PostgreSQL），核心业务表（`admins` / `photos` / `posts`）在线上 Supabase 控制台中手动创建，迁移脚本 `supabase/migrations/` 负责维护行级安全（RLS）策略：

| 文件 | 说明 |
|---|---|
| `202607150001_enable_rls_admins.sql` | admins / photos / posts 行级安全（RLS）策略 |

存储桶：`photos`（相册图片）、`posts-images`（文章插图），均为公开桶，在 Supabase 控制台中配置。

## 后台管理

- 访问 `/dashboard` 进入管理后台（需管理员登录）
- 文章管理：`/dashboard/blog`；相册管理：`/dashboard/gallery`

## 目录结构

```
src/
├── app/
│   ├── (site)/        # 前台页面：首页 / 关于 / 博客 / 相册
│   ├── (auth)/        # 登录页
│   └── (admin)/       # 后台：控制台 / 博客 / 相册
├── components/
│   ├── site/          # 前台组件（头部、底部、Hero、灯箱等）
│   ├── admin/         # 后台组件（侧边栏、Markdown 编辑器等）
│   └── ui/            # shadcn/ui 基础组件
└── lib/
    ├── supabase/      # Supabase 客户端与会话管理
    └── constants.ts   # 纪念日等常量
```
