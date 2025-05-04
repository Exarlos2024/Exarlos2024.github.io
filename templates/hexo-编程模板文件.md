---
title: <% tp.date.now("YYYY-MM") %>-编程
date: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
updated: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
author: Exarlos 艾克萨罗斯
email: 452361419@qq.com
description: 世界上没有低级的法术,只有低级的法师!
keywords: 编程
year: <% tp.date.now("YYYY") %>
month: <% tp.date.now("MM") %>
week: <% tp.date.now("WW") %>
day: <% tp.date.now("DD") %>
categories: 
  - 学习
tags: 
  - 编程
isOriginal: true
---

# <% tp.file.title %>

## 项目概述

<!-- more -->
## 项目设计

## 项目进度

## 项目计划

## 项目问题

## 项目bug修复

## 项目总结

## 文档
```dataview
table file.name as "文档", file.cday as "创建时间"
from "002hexoblog/source/_posts/编程/项目" 
sort file.name ascending
```

## 本月日记
```dataview
table file.name as "日记", file.cday as "创建时间"
from "002hexoblog/source/_posts/日记/2025" or "source/_posts/日记/2025"
where file.frontmatter.year = this.file.frontmatter.year
where file.frontmatter.month = this.file.frontmatter.month
sort file.name ascending
```






---
> 本文由 Exarlos 创作，采用 [知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc-sa/4.0/) 进行许可。

<!-- Obsidian 元数据 (不会影响 Hexo 解析) -->
<!-- 
创建时间: <% tp.file.creation_date("YYYY-MM-DD-dddd HH:mm") %> 
year: <% tp.date.now("YYYY") %>
month: <% tp.date.now("MM") %>
week: <% tp.date.now("WW") %>
day: <% tp.date.now("DD") %>
-->