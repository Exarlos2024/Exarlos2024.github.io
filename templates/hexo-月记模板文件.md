---
title: {{date:YYYY-MM}}-月记
date: {{date:YYYY-MM-DD HH:mm:ss}}
updated: {{date:YYYY-MM-DD HH:mm:ss}}
author: Exarlos 艾克萨罗斯
email: 452361419@qq.com
description: 世界上没有低级的法术,只有低级的法师!
keywords: 月记
year: {{date:YYYY}}
month: {{date:MM}}
week: {{date:WW}}
day: {{date:DD}}
categories: 
  - 生活记录
tags: 
  - 月记
cover: 
# 如果需要密码保护，取消下面的注释并设置密码
password: 747937 # 文章密码
message: 请输入密码访问     # 密码提示信息
abstract: 这篇文章受到了保护。 # 密码提示时显示的文章摘要
wrong_pass_message: 密码错误，请重试。
---

# 月记

<!-- 在此处添加文章摘要 -->
{% note info %}
**文章摘要**
{% endnote %}
<!-- more -->

## 本月周记
```dataview
table file.name as "周记", file.cday as "创建时间"
from "002hexoblog/source/_posts/周记/2025" or "source/_posts/周记/2025"
where contains(file.name, "周记")
where file.frontmatter.year = this.file.frontmatter.year
where file.frontmatter.month = this.file.frontmatter.month
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

## 本月目标

## 本月总结

## 本月工作

## 本月身体

## 本月学到了什么

## 本月遇到了什么问题

## 本月发生了什么事情

## 下个月计划


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