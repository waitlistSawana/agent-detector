# Humanizer Agent — 产品概念草案

> 目标：先对齐“这是什么产品、为谁解决什么问题、提供哪些核心能力”，不进入实现细节。

## 一句话概念
一个面向个人与小团队的 AI 内容检测 + 人格化改写工具，并支持用户训练自己的“个人化代理”（Personal Agent），让内容更符合其偏好与语言风格。

## 最小可行场景（MVS）
- 自媒体作者的风格改写 + 风格训练
- 重点覆盖：博客与 X/Twitter 文章的改写

## 核心模块（产品层）
1. AI 内容 Detector
   - 识别内容的 AI 迹象与风险点
   - 提供可解释的风险提示（如重复结构、过度模板化、语气不自然）

2. Humanizer（人类化改写）
   - 基于检测结果进行有目标的改写
   - 可选“风格目标”（更口语/更正式/更具个性）

3. 个人化 Agent 训练
   - 用户可以训练自己的代理，使其逐步贴合个人风格与偏好
   - 训练核心围绕“提示词优化 + 上下文工程”
   - 引入“渐进式披露”的知识结构：Agent 只在需要时引用资料，避免上下文膨胀

## 用户流程（高层）
- 检测 + 提示 → 改写 + 提示
- 在改写与提示的过程中可切换执行改写的 Agent
  - 默认改写 Agent
  - 用户自训 Agent（逐步贴合个人风格）

## 个人化 Agent 的结构设想
- `agent.md`：代理的“记忆与偏好”，可持续更新
- `references/`：可被代理按需引用的资料库（如过往文章、写作模板、行业术语）
- 面向个人：每个用户拥有独立的 Agent 与资料库
- 实时更新：用户在日常使用中不断“训练/校准”风格与偏好

## 训练方式（待讨论）
- 倾向：纠错反馈更合适
- 对示例学习持保留意见
- 下一步：调研业内做法与相关研究，再定方案

## 适用人群
- 需要输出内容且有明确风格偏好的人
  - 个人创作者 / 自媒体
  - 品牌与市场团队
  - 教育与培训内容生产
  - 简历/申请材料/商务沟通等

## 非目标（当前不讨论）
- 具体实现技术路线
- 模型选型与训练细节
- 架构与工程方案

## 需要进一步讨论的问题
- “检测 + 改写 + 个性化训练”的主流程如何衔接更顺畅？
- 个人化 Agent 的“训练粒度”和“可解释性”到什么程度最合适？
- 个人 Agent 与通用 Humanizer 如何协同？
- 数据与隐私的承诺边界是什么？

---

# Project Development (Next.js)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
