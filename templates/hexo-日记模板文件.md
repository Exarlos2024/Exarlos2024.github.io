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
year: {{date:YYYY}}
month: {{date:MM}}
week: {{date:ww}}
每日运动: false
每日编程: false
每日弹钢琴: false
每日背单词: false
学习阅读: false
每日输出: false
每日冥想: false
每日日记: false
每日思考: false
---

<!-- 在此处添加文章摘要 -->
{% note info %}
**文章摘要**
{% endnote %}
<!-- more -->

# {{date:YYYY-MM-DD}}-{{date:dddd}} #日记
```dataview
table file.name as "周记", file.cday as "创建时间"
from "002hexoblog/source/_posts/周记/2025"
where year = this.file.cday.year
where month = this.file.cday.month
where week = this.file.cday.week
sort ascending
```
## 热力图

```contributionGraph startOfWeek: 1
showCellRuleIndicators: true
titleStyle:
  textAlign: center
  fontSize: 30px
  fontWeight: normal
dataSource:
  type: PAGE
  value: '"002hexoblog/source/_posts/日记/2025"'
  dateField: {}
  filters: []
  countField:
    type: PAGE_PROPERTY
    value: 每日运动
countField:
  type: PAGE_PROPERTY
  value: 每日运动
fillTheScreen: true
enableMainContainerShadow: false
cellStyleRules: []
title: 每日运动
leRules: []
graphType: default
dateRangeValue: 180
dateRangeType: LATEST_DAYS
e: 180

 每日运动
leRules: []
 
```

## 习惯追踪
- [ ] 早起（6:00前）
- [ ] 早睡（23:00前）
- [ ] 冥想15分钟
- [ ] 喝水2000ml
- [ ] 吃蛋白粉
- [ ] 过午不食
- [ ] 每日运动
- [ ] 锻炼30分钟
- [ ] 每日编程
- [ ] 每日弹钢琴
- [ ] 每天阅读-要具体书-要多久
- [ ] 每日输出
- [ ] 写作500字
- [ ] 每日日语
- [ ] 每日背单词


## 今日计划(当天需要完成的任务)
- [ ] 

```dataviewjs
// 打印当前页面的 week 属性用于调试
console.log("当前页面的 week 属性值:", dv.current().week || dv.current().file.frontmatter.week);

// 使用绝对路径尝试查找文件
const validPages = dv.pages('"002hexoblog/source/日志/2025"')
 .filter(p => {
    // 尝试多种方式获取week属性
    const pageWeek = p.week || (p.file.frontmatter ? p.file.frontmatter.week : null);
    const currentWeek = dv.current().week || (dv.current().file.frontmatter ? dv.current().file.frontmatter.week : null);
    
    console.log(`页面 ${p.file.name} 的week属性: ${pageWeek}, 类型: ${typeof pageWeek}`);
    console.log(`当前页面week属性: ${currentWeek}, 类型: ${typeof currentWeek}`);
    
    if (!pageWeek) {
      console.log(`页面 ${p.file.name} 无法获取week属性`);
      return false;
    }
    
    // 确保进行数字比较而非字符串比较
    const isSameWeek = Number(pageWeek) === Number(currentWeek);
    console.log(`页面 ${p.file.name} 比较结果: ${isSameWeek}`);
    
    if (!isSameWeek) {
      console.log(`页面 ${p.file.name} 的week属性值为 ${pageWeek}，与当前页面(${currentWeek})不同`);
    }
    return isSameWeek;
  });

console.log("找到符合week条件的页面数量:", validPages.length);
validPages.forEach(p => console.log("符合条件的页面:", p.file.name));

// 尝试多种方式获取任务
let tasks = [];
try {
  // 先获取所有任务，不做筛选
  const allTasks = validPages.flatMap(p => {
    const pageTasks = p.file.tasks || [];
    console.log(`页面 ${p.file.name} 的所有任务数量: ${pageTasks.length}`);
    
    // 输出每个任务的section信息
    pageTasks.forEach((t, i) => {
      console.log(`任务${i+1}: ${t.text}, section: ${t.section ? t.section.subpath : '无section'}`);
    });
    
    return pageTasks;
  });
  
  console.log("所有任务数量:", allTasks.length);
  
  // 修改排序逻辑，避免访问不存在的属性
  tasks = allTasks.filter(t => {
    if (!t || !t.section || !t.section.subpath) {
      console.log(`任务 "${t ? t.text : '未知'}" 没有section信息`);
      return false;
    }
    
    const result = t.section.subpath.includes("今日计划") ;
    console.log(`任务 "${t.text}" section: ${t.section.subpath}, 匹配结果: ${result}`);
    return result;
  })
  .sort((a, b) => {
    // 安全地获取日期属性，如果不存在则使用默认值
    let dayA = 0;
    let dayB = 0;
    
    try {
      if (a.file && (a.file.day || a.file.cday)) {
        dayA = a.file.day || a.file.cday;
      }
      
      if (b.file && (b.file.day || b.file.cday)) {
        dayB = b.file.day || b.file.cday;
      }
    } catch (e) {
      console.log("排序时出错:", e);
    }
    
    return dayA - dayB;
  });
} catch (e) {
  console.log("处理任务时出错:", e);
}

// 去重逻辑
const uniqueTasks = [];
const taskTexts = new Set();
tasks.forEach(task => {
  if (!taskTexts.has(task.text)) {
    uniqueTasks.push(task);
    taskTexts.add(task.text);
  }
});

// 打印筛选出的任务数量用于调试
console.log("筛选出的任务数量:", uniqueTasks.length);

// 如果没有任务，显示提示信息
if (uniqueTasks.length === 0) {
  dv.paragraph("⚠️ 未找到符合条件的任务，请检查日记文件的frontmatter格式和week属性");
  
  // 显示找到的页面信息，帮助调试
  dv.header(3, "调试信息");
  dv.paragraph(`当前周记week值: ${dv.current().week || dv.current().file.frontmatter.week}`);
  dv.paragraph(`找到符合week条件的页面数量: ${validPages.length}`);
  
  if (validPages.length > 0) {
    dv.table(
      ["文件名", "Week值", "任务数"],
      validPages.map(p => [
        p.file.name,
        p.week || (p.file.frontmatter ? p.file.frontmatter.week : "无"),
        p.file.tasks ? p.file.tasks.length : 0
      ])
    );
  }
} else {
  dv.taskList(uniqueTasks);
}
```

## TODO(最近一周内的任务)
- [ ] 

```dataviewjs
// 打印当前页面的 week 属性用于调试
console.log("当前页面的 week 属性值:", dv.current().week || dv.current().file.frontmatter.week);

// 使用绝对路径尝试查找文件
const validPages = dv.pages('"002hexoblog/source/日志/2025"')
 .filter(p => {
    // 尝试多种方式获取week属性
    const pageWeek = p.week || (p.file.frontmatter ? p.file.frontmatter.week : null);
    const currentWeek = dv.current().week || (dv.current().file.frontmatter ? dv.current().file.frontmatter.week : null);
    
    console.log(`页面 ${p.file.name} 的week属性: ${pageWeek}, 类型: ${typeof pageWeek}`);
    console.log(`当前页面week属性: ${currentWeek}, 类型: ${typeof currentWeek}`);
    
    if (!pageWeek) {
      console.log(`页面 ${p.file.name} 无法获取week属性`);
      return false;
    }
    
    // 确保进行数字比较而非字符串比较
    const isSameWeek = Number(pageWeek) === Number(currentWeek);
    console.log(`页面 ${p.file.name} 比较结果: ${isSameWeek}`);
    
    if (!isSameWeek) {
      console.log(`页面 ${p.file.name} 的week属性值为 ${pageWeek}，与当前页面(${currentWeek})不同`);
    }
    return isSameWeek;
  });

console.log("找到符合week条件的页面数量:", validPages.length);
validPages.forEach(p => console.log("符合条件的页面:", p.file.name));

// 尝试多种方式获取任务
let tasks = [];
try {
  // 先获取所有任务，不做筛选
  const allTasks = validPages.flatMap(p => {
    const pageTasks = p.file.tasks || [];
    console.log(`页面 ${p.file.name} 的所有任务数量: ${pageTasks.length}`);
    
    // 输出每个任务的section信息
    pageTasks.forEach((t, i) => {
      console.log(`任务${i+1}: ${t.text}, section: ${t.section ? t.section.subpath : '无section'}`);
    });
    
    return pageTasks;
  });
  
  console.log("所有任务数量:", allTasks.length);
  
  // 修改排序逻辑，避免访问不存在的属性
  tasks = allTasks.filter(t => {
    if (!t || !t.section || !t.section.subpath) {
      console.log(`任务 "${t ? t.text : '未知'}" 没有section信息`);
      return false;
    }
    
    const result = t.section.subpath.includes("TODO");
    console.log(`任务 "${t.text}" section: ${t.section.subpath}, 匹配结果: ${result}`);
    return result;
  })
  .sort((a, b) => {
    // 安全地获取日期属性，如果不存在则使用默认值
    let dayA = 0;
    let dayB = 0;
    
    try {
      if (a.file && (a.file.day || a.file.cday)) {
        dayA = a.file.day || a.file.cday;
      }
      
      if (b.file && (b.file.day || b.file.cday)) {
        dayB = b.file.day || b.file.cday;
      }
    } catch (e) {
      console.log("排序时出错:", e);
    }
    
    return dayA - dayB;
  });
} catch (e) {
  console.log("处理任务时出错:", e);
}

// 去重逻辑
const uniqueTasks = [];
const taskTexts = new Set();
tasks.forEach(task => {
  if (!taskTexts.has(task.text)) {
    uniqueTasks.push(task);
    taskTexts.add(task.text);
  }
});

// 打印筛选出的任务数量用于调试
console.log("筛选出的任务数量:", uniqueTasks.length);

// 如果没有任务，显示提示信息
if (uniqueTasks.length === 0) {
  dv.paragraph("⚠️ 未找到符合条件的任务，请检查日记文件的frontmatter格式和week属性");
  
  // 显示找到的页面信息，帮助调试
  dv.header(3, "调试信息");
  dv.paragraph(`当前周记week值: ${dv.current().week || dv.current().file.frontmatter.week}`);
  dv.paragraph(`找到符合week条件的页面数量: ${validPages.length}`);
  
  if (validPages.length > 0) {
    dv.table(
      ["文件名", "Week值", "任务数"],
      validPages.map(p => [
        p.file.name,
        p.week || (p.file.frontmatter ? p.file.frontmatter.week : "无"),
        p.file.tasks ? p.file.tasks.length : 0
      ])
    );
  }
} else {
  dv.taskList(uniqueTasks);
}
```

## 工作事项

[[00301-工作汇总]]

### 今天到期工作
```dataview
TASK
FROM "002hexoblog/source/工作目录"
WHERE due = date(today)
SORT due ASC
```

### 明天到期工作
```dataview
TASK
FROM "002hexoblog/source/工作目录"
WHERE due = date(today) + dur(1 day)
SORT due ASC
```

### 过期工作
```dataview
TASK
FROM "002hexoblog/source/工作目录"
WHERE due < date(today)
SORT due ASC
```

### 本周的工作
```dataviewjs
const now = new Date();
const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - now.getDay() + 1);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(now);
endOfWeek.setDate(now.getDate() - now.getDay() + 7);
endOfWeek.setHours(23, 59, 59, 999);

const tasks = dv.pages('"002hexoblog/source/工作目录"')
.flatMap(p => p.file.tasks)
.filter(t => {
    const dueDate = t.due;
    return dueDate && dueDate >= startOfWeek && dueDate <= endOfWeek;
})
.sort(t => t.due);
dv.taskList(tasks);
```
## 编程项目

在这里需要列出编程文档的链接。
还有一些需要完成的编程项目的todo块 

- [ ] 

```dataviewjs
// 打印当前页面的 week 属性用于调试
console.log("当前页面的 week 属性值:", dv.current().week || dv.current().file.frontmatter.week);

// 使用绝对路径尝试查找文件
const validPages = dv.pages('"002hexoblog/source/日志/2025"')
 .filter(p => {
    // 尝试多种方式获取week属性
    const pageWeek = p.week || (p.file.frontmatter ? p.file.frontmatter.week : null);
    const currentWeek = dv.current().week || (dv.current().file.frontmatter ? dv.current().file.frontmatter.week : null);
    
    console.log(`页面 ${p.file.name} 的week属性: ${pageWeek}, 类型: ${typeof pageWeek}`);
    console.log(`当前页面week属性: ${currentWeek}, 类型: ${typeof currentWeek}`);
    
    if (!pageWeek) {
      console.log(`页面 ${p.file.name} 无法获取week属性`);
      return false;
    }
    
    // 确保进行数字比较而非字符串比较
    const isSameWeek = Number(pageWeek) === Number(currentWeek);
    console.log(`页面 ${p.file.name} 比较结果: ${isSameWeek}`);
    
    if (!isSameWeek) {
      console.log(`页面 ${p.file.name} 的week属性值为 ${pageWeek}，与当前页面(${currentWeek})不同`);
    }
    return isSameWeek;
  });

console.log("找到符合week条件的页面数量:", validPages.length);
validPages.forEach(p => console.log("符合条件的页面:", p.file.name));

// 尝试多种方式获取任务
let tasks = [];
try {
  // 先获取所有任务，不做筛选
  const allTasks = validPages.flatMap(p => {
    const pageTasks = p.file.tasks || [];
    console.log(`页面 ${p.file.name} 的所有任务数量: ${pageTasks.length}`);
    
    // 输出每个任务的section信息
    pageTasks.forEach((t, i) => {
      console.log(`任务${i+1}: ${t.text}, section: ${t.section ? t.section.subpath : '无section'}`);
    });
    
    return pageTasks;
  });
  
  console.log("所有任务数量:", allTasks.length);
  
  // 修改排序逻辑，避免访问不存在的属性
  tasks = allTasks.filter(t => {
    if (!t || !t.section || !t.section.subpath) {
      console.log(`任务 "${t ? t.text : '未知'}" 没有section信息`);
      return false;
    }
    
    const result = t.section.subpath.includes("编程项目") ;
    console.log(`任务 "${t.text}" section: ${t.section.subpath}, 匹配结果: ${result}`);
    return result;
  })
  .sort((a, b) => {
    // 安全地获取日期属性，如果不存在则使用默认值
    let dayA = 0;
    let dayB = 0;
    
    try {
      if (a.file && (a.file.day || a.file.cday)) {
        dayA = a.file.day || a.file.cday;
      }
      
      if (b.file && (b.file.day || b.file.cday)) {
        dayB = b.file.day || b.file.cday;
      }
    } catch (e) {
      console.log("排序时出错:", e);
    }
    
    return dayA - dayB;
  });
} catch (e) {
  console.log("处理任务时出错:", e);
}

// 去重逻辑
const uniqueTasks = [];
const taskTexts = new Set();
tasks.forEach(task => {
  if (!taskTexts.has(task.text)) {
    uniqueTasks.push(task);
    taskTexts.add(task.text);
  }
});

// 打印筛选出的任务数量用于调试
console.log("筛选出的任务数量:", uniqueTasks.length);

// 如果没有任务，显示提示信息
if (uniqueTasks.length === 0) {
  dv.paragraph("⚠️ 未找到符合条件的任务，请检查日记文件的frontmatter格式和week属性");
  
  // 显示找到的页面信息，帮助调试
  dv.header(3, "调试信息");
  dv.paragraph(`当前周记week值: ${dv.current().week || dv.current().file.frontmatter.week}`);
  dv.paragraph(`找到符合week条件的页面数量: ${validPages.length}`);
  
  if (validPages.length > 0) {
    dv.table(
      ["文件名", "Week值", "任务数"],
      validPages.map(p => [
        p.file.name,
        p.week || (p.file.frontmatter ? p.file.frontmatter.week : "无"),
        p.file.tasks ? p.file.tasks.length : 0
      ])
    );
  }
} else {
  dv.taskList(uniqueTasks);
}
```
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

<!-- 以下内容仅在Obsidian中显示，在Hexo中会被忽略 -->
<!-- 月记和周记查询 (Obsidian Dataview) -->
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

