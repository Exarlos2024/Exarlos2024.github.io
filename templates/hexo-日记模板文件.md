---
title: {{date:YYYY-MM-DD}}-{{date:dddd}}
date: {{date:YYYY-MM-DD HH:mm:ss}}
updated: {{date:YYYY-MM-DD HH:mm:ss}}
author: Exarlos 艾克萨罗斯
email: 452361419@qq.com
description: 世界上没有低级的法术,只有低级的法师!
keywords: 日记
categories:
  - 日记
tags:
  - 日记
cover:
thumbnail:
password: 747937
message: 请输入密码访问
abstract: 这篇文章受到了保护。
wrong_pass_message: 密码错误，请重试。
---

<!-- 在此处添加文章摘要 -->
{% note info %}
**文章摘要**
{% endnote %}

<!-- more -->

# {{date:YYYY-MM-DD}}-{{date:dddd}} #日记

## 今日计划



## TODO
<%* /* 使用setTimeout延迟执行脚本，等待Obsidian环境加载完成 */
tR += "<!-- 正在加载昨日未完成TODO... -->\n- [ ] 加载中...\n\n";

// 定义一个函数，在文件创建后执行
window.setTimeout(async () => {
  try {
    // 获取当前文件
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
      console.error("无法获取当前文件");
      return;
    }
    
    // 获取昨天的日期（基于当前文件名）
    const currentFileName = currentFile.basename;
    const dateMatch = currentFileName.match(/^(\d{4}-\d{2}-\d{2})/);
    
    if (!dateMatch) {
      console.error("无法从文件名解析日期:", currentFileName);
      return;
    }
    
    const currentDate = new Date(dateMatch[1]);
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const yesterdayStr = yesterday.toISOString().slice(0, 10); // YYYY-MM-DD
    const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const yesterdayDayName = dayNames[yesterday.getDay()];
    const yesterdayFileName = `${yesterdayStr}-${yesterdayDayName}`;
    const yesterdayYear = yesterdayStr.slice(0, 4);
    const folderPath = `source/_posts/日记/${yesterdayYear}`;
    
    console.log("查找昨日文件:", yesterdayFileName, "在路径:", folderPath);
    
    // 查找昨天的文件
    let yesterdayFile = app.vault.getAbstractFileByPath(`${folderPath}/${yesterdayFileName}.md`);
    
    // 如果没找到，尝试搜索
    if (!yesterdayFile) {
      console.log("未找到精确路径，尝试搜索包含日期的文件");
      const files = app.vault.getMarkdownFiles();
      const potentialFiles = files.filter(f => 
        f.path.includes('/日记/') && 
        f.basename.startsWith(yesterdayStr)
      );
      
      if (potentialFiles.length > 0) {
        console.log("找到潜在文件:", potentialFiles.map(f => f.path).join(", "));
        const exactMatch = potentialFiles.find(f => f.basename === yesterdayFileName);
        yesterdayFile = exactMatch || potentialFiles[0];
      }
    }
    
    // 处理找到的文件
    let unfinishedTasks = [];
    if (yesterdayFile) {
      console.log("找到昨日文件:", yesterdayFile.path);
      const content = await app.vault.read(yesterdayFile);
      const lines = content.split('\n');
      let inTodoSection = false;
      
      for (const line of lines) {
        if (line.trim() === '## TODO') {
          inTodoSection = true;
          continue;
        }
        if (inTodoSection && line.trim().startsWith('## ')) {
          inTodoSection = false;
          break;
        }
        if (inTodoSection && line.trim().startsWith('- [ ]')) {
          unfinishedTasks.push(line.trim());
        }
      }
      
      console.log("找到未完成TODO任务:", unfinishedTasks.length);
    } else {
      console.log("未找到昨日文件");
    }
    
    // 更新当前文件内容
    let fileContent = await app.vault.read(currentFile);
    let newContent;
    
    const placeholderRegex = /<!-- 正在加载昨日未完成TODO... -->\n- \[ \] 加载中...\n\n/;
    
    if (unfinishedTasks.length > 0) {
      const tasksText = unfinishedTasks.join('\n') + '\n- [ ] \n\n';
      newContent = fileContent.replace(placeholderRegex, tasksText);
    } else {
      newContent = fileContent.replace(placeholderRegex, "- [ ] <!-- 昨日TODO已完成 -->\n- [ ] \n\n");
    }
    
    if (newContent !== fileContent) {
      await app.vault.modify(currentFile, newContent);
      console.log("已更新TODO部分");
    } else {
      console.error("无法更新TODO，可能是占位符不匹配");
    }
  } catch (error) {
    console.error("加载昨日TODO时出错:", error);
  }
}, 2500); // 延迟2.5秒执行，比工作事项早一些
_%>

## 工作事项
<%* /* 使用setTimeout延迟执行脚本，等待Obsidian环境加载完成 */
tR += "<!-- 正在加载昨日未完成任务... -->\n- [ ] 加载中...\n\n";

// 定义一个函数，在文件创建后执行
window.setTimeout(async () => {
  try {
    // 获取当前文件
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
      console.error("无法获取当前文件");
      return;
    }
    
    // 获取昨天的日期（基于当前文件名）
    const currentFileName = currentFile.basename;
    const dateMatch = currentFileName.match(/^(\d{4}-\d{2}-\d{2})/);
    
    if (!dateMatch) {
      console.error("无法从文件名解析日期:", currentFileName);
      return;
    }
    
    const currentDate = new Date(dateMatch[1]);
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const yesterdayStr = yesterday.toISOString().slice(0, 10); // YYYY-MM-DD
    const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const yesterdayDayName = dayNames[yesterday.getDay()];
    const yesterdayFileName = `${yesterdayStr}-${yesterdayDayName}`;
    const yesterdayYear = yesterdayStr.slice(0, 4);
    const folderPath = `source/_posts/日记/${yesterdayYear}`;
    
    console.log("查找昨日文件:", yesterdayFileName, "在路径:", folderPath);
    
    // 查找昨天的文件
    let yesterdayFile = app.vault.getAbstractFileByPath(`${folderPath}/${yesterdayFileName}.md`);
    
    // 如果没找到，尝试搜索
    if (!yesterdayFile) {
      console.log("未找到精确路径，尝试搜索包含日期的文件");
      const files = app.vault.getMarkdownFiles();
      const potentialFiles = files.filter(f => 
        f.path.includes('/日记/') && 
        f.basename.startsWith(yesterdayStr)
      );
      
      if (potentialFiles.length > 0) {
        console.log("找到潜在文件:", potentialFiles.map(f => f.path).join(", "));
        const exactMatch = potentialFiles.find(f => f.basename === yesterdayFileName);
        yesterdayFile = exactMatch || potentialFiles[0];
      }
    }
    
    // 处理找到的文件
    let unfinishedTasks = [];
    if (yesterdayFile) {
      console.log("找到昨日文件:", yesterdayFile.path);
      const content = await app.vault.read(yesterdayFile);
      const lines = content.split('\n');
      let inWorkSection = false;
      
      for (const line of lines) {
        if (line.trim() === '## 工作事项') {
          inWorkSection = true;
          continue;
        }
        if (inWorkSection && line.trim().startsWith('## ')) {
          inWorkSection = false;
          break;
        }
        if (inWorkSection && line.trim().startsWith('- [ ]')) {
          unfinishedTasks.push(line.trim());
        }
      }
      
      console.log("找到未完成工作任务:", unfinishedTasks.length);
    } else {
      console.log("未找到昨日文件");
    }
    
    // 更新当前文件内容
    let fileContent = await app.vault.read(currentFile);
    let newContent;
    
    const placeholderRegex = /<!-- 正在加载昨日未完成任务... -->\n- \[ \] 加载中...\n\n/;
    
    if (unfinishedTasks.length > 0) {
      const tasksText = unfinishedTasks.join('\n') + '\n- [ ] \n\n';
      newContent = fileContent.replace(placeholderRegex, tasksText);
    } else {
      newContent = fileContent.replace(placeholderRegex, "- [ ] <!-- 昨日工作已完成 -->\n- [ ] \n\n");
    }
    
    if (newContent !== fileContent) {
      await app.vault.modify(currentFile, newContent);
      console.log("已更新工作事项部分");
    } else {
      console.error("无法更新工作事项，可能是占位符不匹配");
    }
  } catch (error) {
    console.error("加载昨日任务时出错:", error);
  }
}, 3000); // 延迟3秒执行
_%>

## 编程项目
<%* /* 使用setTimeout延迟执行脚本，等待Obsidian环境加载完成 */
tR += "<!-- 正在加载昨日未完成项目... -->\n- [ ] 加载中...\n\n";

// 定义一个函数，在文件创建后执行
window.setTimeout(async () => {
  try {
    // 获取当前文件
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
      console.error("无法获取当前文件");
      return;
    }
    
    // 获取昨天的日期（基于当前文件名）
    const currentFileName = currentFile.basename;
    const dateMatch = currentFileName.match(/^(\d{4}-\d{2}-\d{2})/);
    
    if (!dateMatch) {
      console.error("无法从文件名解析日期:", currentFileName);
      return;
    }
    
    const currentDate = new Date(dateMatch[1]);
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const yesterdayStr = yesterday.toISOString().slice(0, 10); // YYYY-MM-DD
    const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const yesterdayDayName = dayNames[yesterday.getDay()];
    const yesterdayFileName = `${yesterdayStr}-${yesterdayDayName}`;
    const yesterdayYear = yesterdayStr.slice(0, 4);
    const folderPath = `source/_posts/日记/${yesterdayYear}`;
    
    console.log("查找昨日文件:", yesterdayFileName, "在路径:", folderPath);
    
    // 查找昨天的文件
    let yesterdayFile = app.vault.getAbstractFileByPath(`${folderPath}/${yesterdayFileName}.md`);
    
    // 如果没找到，尝试搜索
    if (!yesterdayFile) {
      console.log("未找到精确路径，尝试搜索包含日期的文件");
      const files = app.vault.getMarkdownFiles();
      const potentialFiles = files.filter(f => 
        f.path.includes('/日记/') && 
        f.basename.startsWith(yesterdayStr)
      );
      
      if (potentialFiles.length > 0) {
        console.log("找到潜在文件:", potentialFiles.map(f => f.path).join(", "));
        const exactMatch = potentialFiles.find(f => f.basename === yesterdayFileName);
        yesterdayFile = exactMatch || potentialFiles[0];
      }
    }
    
    // 处理找到的文件
    let unfinishedTasks = [];
    if (yesterdayFile) {
      console.log("找到昨日文件:", yesterdayFile.path);
      const content = await app.vault.read(yesterdayFile);
      const lines = content.split('\n');
      let inProgrammingSection = false;
      
      for (const line of lines) {
        if (line.trim() === '## 编程项目') {
          inProgrammingSection = true;
          continue;
        }
        if (inProgrammingSection && line.trim().startsWith('## ')) {
          inProgrammingSection = false;
          break;
        }
        if (inProgrammingSection && line.trim().startsWith('- [ ]')) {
          unfinishedTasks.push(line.trim());
        }
      }
      
      console.log("找到未完成编程任务:", unfinishedTasks.length);
    } else {
      console.log("未找到昨日文件");
    }
    
    // 更新当前文件内容
    let fileContent = await app.vault.read(currentFile);
    let newContent;
    
    const placeholderRegex = /<!-- 正在加载昨日未完成项目... -->\n- \[ \] 加载中...\n\n/;
    
    if (unfinishedTasks.length > 0) {
      const tasksText = unfinishedTasks.join('\n') + '\n- [ ] \n\n';
      newContent = fileContent.replace(placeholderRegex, tasksText);
    } else {
      newContent = fileContent.replace(placeholderRegex, "- [ ] <!-- 昨日编程项目已完成 -->\n- [ ] \n\n");
    }
    
    if (newContent !== fileContent) {
      await app.vault.modify(currentFile, newContent);
      console.log("已更新编程项目部分");
    } else {
      console.error("无法更新编程项目，可能是占位符不匹配");
    }
  } catch (error) {
    console.error("加载昨日项目时出错:", error);
  }
}, 3500); // 延迟3.5秒执行，比工作事项稍晚一些
_%>


## 习惯追踪
- [ ] 早起（6:00前）
- [ ] 冥想15分钟
- [ ] 阅读30分钟
- [ ] 写作500字
- [ ] 喝水2000ml
- [ ] 锻炼30分钟
- [ ] 学习1小时
- [ ] 早睡（23:00前）

## 今日时间块
- 06:00-07:00：晨间routine
- 07:00-09:00：深度工作
- 09:00-09:30：休息
- 09:30-11:30：会议/沟通
- 11:30-12:30：午餐/休息
- 12:30-14:30：深度工作
- 14:30-15:00：休息
- 15:00-17:00：处理邮件/杂务
- 17:00-18:30：运动
- 18:30-19:30：晚餐
- 19:30-21:30：学习/阅读
- 21:30-22:30：放松/准备睡眠

## 今日运动

- [ ] 跑步一小时
- [ ] 俯卧撑50个
- [ ] 引体向上30个
- [ ] 引体向上1分钟
- [ ] 卧推30个
- [ ] 深蹲2组
- [ ] 跳绳2000次

## 今日学习
- [ ] 学习英语
- [ ] 学习日语
- [ ] 学习编程
- [ ] 学习音乐
- [ ] 学习舞蹈

## 今日阅读和上网
- [ ] 阅读 
- [ ] youtube
- [ ] 

## 今日日语
- [ ] 单词300个
- [ ] 语法
- [ ] 阅读
- [ ] 听力
- [ ] 口语
- [ ] 翻译
- [ ] 写作
- [ ] 阅读
- [ ] 听力

## 今日总结

- [ ] 今天体重
- [ ] 今天睡眠
- [ ] 今天黄金
- [ ] 今天学习
- [ ] 今天阅读
- [ ] 今天上网
- [ ] 今天工作
- [ ] 今天运动

## 今日目标
- [ ] 完成今天的工作
- [ ] 完成今天的学习
- [ ] 完成今天的阅读
- [ ] 完成今天的运动
- [ ] 完成今天的总结
- [ ] 完成今天的目标

## 今日计划
- [ ] 完成今天的工作
- [ ] 完成今天的学习
- [ ] 完成今天的阅读


<!-- 以下内容仅在Obsidian中显示，在Hexo中会被忽略 -->
<!-- 月记和周记查询 (Obsidian Dataview) -->
```dataview
table file.name as "周记与月记", file.cday as "创建时间"
from "周记" or "月记"
where year = this.file.cday.year
where month = this.file.cday.month
sort ascending
```
<!-- 在Hexo中显示的替代内容 -->
<!-- 请访问我的周记和月记分类查看更多内容 -->




---
> 本文由 Exarlos 创作，采用 [知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc-sa/4.0/) 进行许可。

<!-- Obsidian 元数据 (不会影响 Hexo 解析) -->
<!--
创建时间: {{date:YYYY-MM-DD-dddd HH:mm}}
year: {{date:YYYY}}
month: {{date:MM}}
week: {{date:WW}}
day: {{date:DD}}
-->

