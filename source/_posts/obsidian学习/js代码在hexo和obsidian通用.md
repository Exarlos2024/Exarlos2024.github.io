---
title: js代码在hexo和obsidian通用
date: 2025-05-02 22:45:48
updated: 2025-05-02 22:45:48
author: Exarlos 艾克萨罗斯
email: 452361419@qq.com
description: 
keywords: 
categories:
  - obsidian
tags:
  - obsidian
cover: 
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

# 未命名

## 写作背景
我需要一个代码,
用js来运行来实现功能,
但同时在hexo看不见,
在obsidian里也看不见.
用template生成的文章里应该看不见代码块的

## 主要内容

```js
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

```

## 参考资料

---
> 本文由 Exarlos 创作，采用 [知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc-sa/4.0/) 进行许可。

<!-- Obsidian 元数据 (不会影响 Hexo 解析) -->
<!-- 
创建时间: 2025-05-02-星期五 22:45 
year: 2025
month: 05
week: 18
day: 02
-->