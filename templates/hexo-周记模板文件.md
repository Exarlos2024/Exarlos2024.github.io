---
title: 周记-{{date:YYYY}}年第{{date:WW}}周
创建时间: {{date:YYYY-MM-DD-ddd HH:mm}} 
year: {{date:YYYY}}
month: {{date:MM}}
week: {{date:WW}}
tags: 
 - 周记

---
# {{title}} #周记 

---
## 日记集合
[[{{monday:YYYY-MM-DD-ddd}}]]
[[{{tuesday:YYYY-MM-DD-ddd}}]]
[[{{wednesday:YYYY-MM-DD-ddd}}]]
[[{{thursday:YYYY-MM-DD-ddd}}]]
[[{{friday:YYYY-MM-DD-ddd}}]]
[[{{saturday:YYYY-MM-DD-ddd}}]]
[[{{sunday:YYYY-MM-DD-ddd}}]]

---
## 周记-包括这个月所有周
```dataview
table file.name as "周记", file.cday as "创建时间"
from "002hexoblog/source/_posts/周记/2025" or "source/_posts/周记/2025"
where contains(file.name, "周记")
where file.frontmatter.year = this.file.frontmatter.year
where file.frontmatter.month = this.file.frontmatter.month
sort file.name ascending
```

## 月记
```dataview
table file.name as "周记", file.cday as "创建时间"
from "002hexoblog/source/_posts/月记/2025"
where year = this.file.cday.year
where month = this.file.cday.month
sort ascending
```

---
## 任务集合
  ### 今日计划集合
```dataviewjs
// 打印当前页面的 week 属性用于调试
console.log("当前页面的 week 属性值:", dv.current().week || dv.current().file.frontmatter.week);

// 使用绝对路径尝试查找文件
const validPages = dv.pages('"002hexoblog/source/_posts/日记/2025"')
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

### todo集合
```dataviewjs
// 打印当前页面的 week 属性用于调试
console.log("当前页面的 week 属性值:", dv.current().week || dv.current().file.frontmatter.week);

// 使用绝对路径尝试查找文件
const validPages = dv.pages('"002hexoblog/source/_posts/日记/2025"')
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
    
    const result = t.section.subpath.includes("TODO") ;
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
---
## 项目集合
```dataview
TASK
FROM "source/_posts/日记/2025"
WHERE contains(section, "编程项目") OR contains(section, "编程")
WHERE file.day >= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-01")
WHERE file.day <= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-31")
WHERE file.frontmatter.week = this.file.frontmatter.week
GROUP BY file.link
SORT file.day ASC
```
---
## 工作集合
[[ 00301-工作汇总]]

---

## 已完成任务集合
>这周解决了什么问题?

### 工作完成什么了
```dataview 
TASK 
FROM "002hexoblog/source/工作目录" 
WHERE due < date(today) 
SORT due ASC 
```
### 日记完成什么了

```dataviewjs
const now = new Date();
const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - now.getDay() + 1);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(now);
endOfWeek.setDate(now.getDate() - now.getDay() + 7);
endOfWeek.setHours(23, 59, 59, 999);

const pages = dv.pages('"002hexoblog/source/_posts/日记/2025"');
const allTasks = pages.flatMap(p => p.file.tasks);
const tasks = allTasks.filter(t => {
    const dueDate = t.due;
    return dueDate && dueDate >= startOfWeek && dueDate <= endOfWeek && isCompleted;
});

const sortedTasks = tasks.sort(t => t.due);
dv.taskList(sortedTasks);    
```
---

## 已完成任务集合
>这周解决了什么问题?

```dataview
TASK
FROM "002hexoblog/source/_posts/日记/2025"
WHERE completed
WHERE file.day >= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-01")
WHERE file.day <= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-31")
WHERE file.frontmatter.week = this.file.frontmatter.week
GROUP BY file.link
SORT file.day ASC
```

---

