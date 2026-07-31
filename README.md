# Our Story — 我们的故事

一个记录两人爱情点滴的情侣纪念网站：纪念日恋爱天数、博客、相册与后台管理，采用液态玻璃质感 UI。

## 功能特性

- 💖 纪念日恋爱天数计数器（首页实时跳动）
- 📝 博客系统：Markdown 写作、发布、编辑与删除
- 📷 相册：图片上传、浏览与删除
- 🔐 管理员登录与**审核机制**：副管理员登录需主管理员审批
- 📊 管理后台：文章 / 相册 / 登录日志 / 登录审核
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

## 数据库迁移

所有数据库结构变更以迁移脚本形式保存在 `supabase/migrations/` 目录：

| 文件 | 说明 |
|---|---|
| `202607150001_enable_rls_admins.sql` | admins / photos / posts / pending_approvals 行级安全（RLS）策略 |
| `202607300001_create_core_tables.sql` | 核心业务表：admins / photos / posts / pending_approvals |
| `202607300002_create_storage.sql` | 存储桶 photos / posts-images 及访问策略 |
| `202607270001_create_admin_login_logs.sql` | 副管理员登录日志表 |
| `202607270002_add_delete_policy_admin_login_logs.sql` | 日志删除策略 |

## 从零部署

1. **创建 Supabase 项目**：https://supabase.com/dashboard → New Project
2. **开启邮箱密码登录**：Authentication → Providers → Email
3. **执行迁移**：在 SQL Editor 中按顺序执行 `supabase/migrations/` 下全部脚本（或使用 Supabase CLI `supabase db push`）
4. **创建主管理员**：在 Authentication → Users 中手动创建主管理员账号，然后执行：

   ```sql
   INSERT INTO public.admins (email, needs_approval)
   VALUES ('你的邮箱', false);
   ```

5. **配置环境变量**：将项目 Settings → API 中的 URL 与 anon key 填入 `.env.local`
6. **配置回调白名单**：Authentication → URL Configuration，将网站域名加入 Redirect URLs
7. **部署**：将代码部署至 Vercel 或自有服务器，并设置同样的环境变量

## 后台管理

- 访问 `/dashboard` 进入管理后台（需管理员登录）
- 文章管理：`/dashboard/blog`；相册管理：`/dashboard/gallery`
- 登录审核：`/dashboard/approvals`（副管理员登录申请在此审批）
- 登录日志：`/dashboard/messages`（记录副管理员登录时间，可一键清空）

## 目录结构

```
src/
├── app/
│   ├── (site)/        # 前台页面：首页 / 关于 / 博客 / 相册
│   ├── (auth)/        # 登录 / 待审核页
│   └── (admin)/       # 后台：控制台 / 博客 / 相册 / 审核 / 消息
├── components/
│   ├── site/          # 前台组件（头部、底部、Hero、灯箱等）
│   ├── admin/         # 后台组件（侧边栏、Markdown 编辑器等）
│   └── ui/            # shadcn/ui 基础组件
└── lib/
    ├── supabase/      # Supabase 客户端与会话管理
    └── constants.ts   # 纪念日等常量
```
