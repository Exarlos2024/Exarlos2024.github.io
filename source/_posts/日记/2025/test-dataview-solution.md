---
title: Dataview代码块解决方案测试
date: 2025-04-26 01:09:03
updated: 2025-04-26 01:09:03
author: Exarlos 艾克萨罗斯
email: 452361419@qq.com
description: 测试Obsidian和Hexo中dataview代码块的显示方案
keywords: 测试
categories:
  - 测试
tags:
  - Obsidian
  - Hexo
  - Dataview
cover:
thumbnail:
---

# Dataview代码块解决方案测试

## 问题描述

在Obsidian中，我们希望在编辑模式下直接看到dataview查询结果，而不是代码块。同时，我们希望在Hexo中隐藏这些代码块。

## 解决方案

### 方案一：使用HTML注释和代码块折叠（推荐）

这种方式在Obsidian编辑模式下会显示dataview结果，在Hexo中会被完全隐藏：

<!-- 以下内容仅在Obsidian中显示，在Hexo中会被忽略 -->
<!-- 代码块已折叠，编辑时点击展开 -->
```dataviewjs
// 简单的dataview示例
dv.paragraph("✅ 这段文字在Obsidian编辑模式下可见，在Hexo中被隐藏");
dv.paragraph("📅 当前日期: " + moment().format("YYYY-MM-DD"));
```

<!-- 在Hexo中显示的替代内容 -->
<div class="note info">
<p><strong>Obsidian特有内容</strong></p>
<p>此内容在Hexo中不可见，请在Obsidian中查看</p>
</div>

### 方案二：使用单行HTML注释（不推荐）

这种方式在Obsidian编辑模式下会显示为代码块，不会执行：

<!-- 以下内容仅在Obsidian中显示，在Hexo中会被忽略 -->
<!-- ```dataviewjs
// 简单的dataview示例
dv.paragraph("❌ 这段文字在Obsidian编辑模式下不可见，只能看到代码");
dv.paragraph("📅 当前日期: " + moment().format("YYYY-MM-DD"));
``` -->

## 工作原理

1. **Obsidian编辑模式**：
   - 方案一：代码块正常执行，显示查询结果
   - 方案二：显示为代码块，不执行

2. **Hexo渲染**：
   - 两种方案都会被HTML注释语法`<!-- -->`完全隐藏

## 建议

在日记模板中，对所有dataviewjs代码块使用方案一的格式：

```markdown
<!-- 以下内容仅在Obsidian中显示，在Hexo中会被忽略 -->
<!-- 代码块已折叠，编辑时点击展开 -->
```dataviewjs
// 你的dataview代码
```
```

这样在Obsidian编辑模式下可以直接看到查询结果，而在Hexo中这些内容会被完全隐藏。

---

> 本文由 Exarlos 创作，用于测试Obsidian和Hexo的兼容性方案。