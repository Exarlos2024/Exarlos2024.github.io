---
创建时间: {{date:YYYY-MM-DD-ddd HH:mm}} 
year: {{date:YYYY}}
month: {{date:MM}}
week: {{date:WW}}
tags: 
-- 周记
- {{date:YYYY-MM-ww}} 
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
from "周记/2025" or "_posts/周记/2025"
where contains(file.name, "周记")
where file.frontmatter.year = this.file.frontmatter.year
where file.frontmatter.month = this.file.frontmatter.month
sort file.name ascending
```

## 月记
```dataview
table file.cday as "创建时间"
from "月记"
where year = this.file.cday.year
where month = this.file.cday.month

sort ascnding
```

---
## 任务集合

<%* /* 使用setTimeout延迟执行脚本，等待Obsidian环境加载完成 */
tR += "<!-- 正在加载本周任务集合... -->\n- [ ] 加载中...\n\n";

// 定义一个函数，在文件创建后执行
window.setTimeout(async () => {
  try {
    // 获取当前文件
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
      console.error("无法获取当前文件");
      return;
    }
    
    // 获取当前周的日期范围
    const currentFileName = currentFile.basename;
    // 修改正则表达式以匹配YYYY-W18周记或W18这样的格式
    const weekMatch = currentFileName.match(/W(\d+)/i) || currentFileName.match(/-W(\d+)周记/);
    
    if (!weekMatch) {
      console.error("无法从文件名解析周数:", currentFileName);
      return;
    }
    
    // 根据匹配结果获取周数，考虑两种可能的匹配模式
    const weekNum = weekMatch[1] ? parseInt(weekMatch[1]) : parseInt(weekMatch[2]);
    
    // 从文件frontmatter中获取年份和周数
    const fileContent = await app.vault.read(currentFile);
    const yearMatch = fileContent.match(/year:\s*(\d{4})/);
    const weekNumMatch = fileContent.match(/week:\s*(\d{1,2})/);
    
    if (!yearMatch || !weekNumMatch) {
      console.error("无法从文件内容获取年份或周数");
      return;
    }
    
    const year = parseInt(yearMatch[1]);
    // 从frontmatter中获取周数
    const weekNumFromFrontmatter = parseInt(weekNumMatch[1]);
    // 确定使用哪个周数值（文件名中的或frontmatter中的）
    let finalWeekNum;
    if (typeof weekNum === 'undefined' || isNaN(weekNum)) {
      console.log("使用frontmatter中的周数:", weekNumFromFrontmatter);
      finalWeekNum = weekNumFromFrontmatter;
    } else {
      console.log("使用文件名中的周数:", weekNum);
      finalWeekNum = weekNum;
    }
    
    // 计算本周的起始日期和结束日期
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (finalWeekNum - 1) * 7 - (firstDayOfYear.getDay() || 7) + 1;
    const weekStart = new Date(year, 0, daysOffset);
    const weekEnd = new Date(year, 0, daysOffset + 6);
    console.log(`计算的周范围：第${finalWeekNum}周，从${weekStart.toISOString().split('T')[0]}到${weekEnd.toISOString().split('T')[0]}`);
    
    // 格式化日期为YYYY-MM-DD格式
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const weekStartStr = formatDate(weekStart);
    const weekEndStr = formatDate(weekEnd);
    
    console.log(`查找本周(${weekStartStr}至${weekEndStr})的日记文件`);
    
    // 查找本周的所有日记文件
    const files = app.vault.getMarkdownFiles();
    const weekDiaries = files.filter(f => {
      if (!f.path.includes('/日记/')) return false;
      
      const dateMatch = f.basename.match(/^(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) return false;
      
      const fileDate = new Date(dateMatch[1]);
      return fileDate >= weekStart && fileDate <= weekEnd;
    });
    
    console.log(`找到${weekDiaries.length}个本周日记文件`);
    
    // 从所有日记文件中提取未完成任务
    let allTasks = [];
    
    for (const diaryFile of weekDiaries) {
      const content = await app.vault.read(diaryFile);
      const lines = content.split('\n');
      let inTaskSection = false;
      
      for (const line of lines) {
        if (line.trim() === '## 今日计划(当天需要完成的任务)') {
          inTaskSection = true;
          continue;
        }
        if (inTaskSection && line.trim().startsWith('## ')) {
          inTaskSection = false;
          break;
        }
        if (inTaskSection && line.trim().startsWith('- [ ]') && !line.includes('加载中')) {
          // 添加日期前缀到任务
          const dateMatch = diaryFile.basename.match(/^(\d{4}-\d{2}-\d{2})/);
          if (dateMatch) {
            const taskWithDate = `${line.trim()} (${dateMatch[1]})`;
            allTasks.push(taskWithDate);
          } else {
            allTasks.push(line.trim());
          }
        }
      }
    }
    
    console.log(`从日记中提取了${allTasks.length}个未完成任务`);
    
    // 更新当前文件内容
    let fileContent = await app.vault.read(currentFile);
    let newContent;
    
    const placeholderRegex = /<!-- 正在加载本周任务集合... -->\n- \[ \] 加载中...\n\n/;
    
    if (allTasks.length > 0) {
      const tasksText = allTasks.join('\n') + '\n\n';
      newContent = fileContent.replace(placeholderRegex, tasksText);
    } else {
      newContent = fileContent.replace(placeholderRegex, "- [ ] <!-- 本周暂无未完成任务 -->\n\n");
    }
    
    if (newContent !== fileContent) {
      await app.vault.modify(currentFile, newContent);
      console.log("已更新任务集合部分");
    } else {
      console.error("无法更新任务集合，可能是占位符不匹配");
    }
  } catch (error) {
    console.error("加载本周任务时出错:", error);
  }
}, 2000); // 延迟2秒执行
*%>

---
## 项目集合
<%* /* 使用setTimeout延迟执行脚本，等待Obsidian环境加载完成 */
tR += "<!-- 正在加载本周项目集合... -->\n- [ ] 加载中...\n\n";

// 定义一个函数，在文件创建后执行
window.setTimeout(async () => {
  try {
    // 获取当前文件
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
      console.error("无法获取当前文件");
      return;
    }
    
    // 获取当前周的日期范围
    const currentFileName = currentFile.basename;
    // 修改正则表达式以匹配YYYY-W18周记或W18这样的格式
    const weekMatch = currentFileName.match(/W(\d+)/i) || currentFileName.match(/-W(\d+)周记/);
    
    if (!weekMatch) {
      console.error("无法从文件名解析周数:", currentFileName);
      return;
    }
    
    // 根据匹配结果获取周数，考虑两种可能的匹配模式
    const weekNum = weekMatch[1] ? parseInt(weekMatch[1]) : parseInt(weekMatch[2]);
    
    // 从文件frontmatter中获取年份和周数
    const fileContent = await app.vault.read(currentFile);
    const yearMatch = fileContent.match(/year:\s*(\d{4})/);
    const weekNumMatch = fileContent.match(/week:\s*(\d{1,2})/);
    
    if (!yearMatch || !weekNumMatch) {
      console.error("无法从文件内容获取年份或周数");
      return;
    }
    
    const year = parseInt(yearMatch[1]);
    // 从frontmatter中获取周数
    const weekNumFromFrontmatter = parseInt(weekNumMatch[1]);
    // 确定使用哪个周数值（文件名中的或frontmatter中的）
    let finalWeekNum;
    if (typeof weekNum === 'undefined' || isNaN(weekNum)) {
      console.log("使用frontmatter中的周数:", weekNumFromFrontmatter);
      finalWeekNum = weekNumFromFrontmatter;
    } else {
      console.log("使用文件名中的周数:", weekNum);
      finalWeekNum = weekNum;
    }
    
    // 计算本周的起始日期和结束日期
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (finalWeekNum - 1) * 7 - (firstDayOfYear.getDay() || 7) + 1;
    const weekStart = new Date(year, 0, daysOffset);
    const weekEnd = new Date(year, 0, daysOffset + 6);
    console.log(`计算的周范围：第${finalWeekNum}周，从${weekStart.toISOString().split('T')[0]}到${weekEnd.toISOString().split('T')[0]}`);
    
    // 格式化日期为YYYY-MM-DD格式
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const weekStartStr = formatDate(weekStart);
    const weekEndStr = formatDate(weekEnd);
    
    console.log(`查找本周(${weekStartStr}至${weekEndStr})的日记文件`);
    
    // 查找本周的所有日记文件
    const files = app.vault.getMarkdownFiles();
    const weekDiaries = files.filter(f => {
      if (!f.path.includes('/日记/')) return false;
      
      const dateMatch = f.basename.match(/^(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) return false;
      
      const fileDate = new Date(dateMatch[1]);
      return fileDate >= weekStart && fileDate <= weekEnd;
    });
    
    console.log(`找到${weekDiaries.length}个本周日记文件`);
    
    // 从所有日记文件中提取未完成项目
    let allProjects = [];
    
    for (const diaryFile of weekDiaries) {
      const content = await app.vault.read(diaryFile);
      const lines = content.split('\n');
      let inProjectSection = false;
      
      for (const line of lines) {
        if (line.trim() === '## 编程项目') {
          inProjectSection = true;
          continue;
        }
        if (inProjectSection && line.trim().startsWith('## ')) {
          inProjectSection = false;
          break;
        }
        if (inProjectSection && line.trim().startsWith('- [ ]') && !line.includes('加载中')) {
          // 添加日期前缀到项目
          const dateMatch = diaryFile.basename.match(/^(\d{4}-\d{2}-\d{2})/);
          if (dateMatch) {
            const projectWithDate = `${line.trim()} (${dateMatch[1]})`;
            allProjects.push(projectWithDate);
          } else {
            allProjects.push(line.trim());
          }
        }
      }
    }
    
    console.log(`从日记中提取了${allProjects.length}个未完成项目`);
    
    // 更新当前文件内容
    let fileContent = await app.vault.read(currentFile);
    let newContent;
    
    const placeholderRegex = /<!-- 正在加载本周项目集合... -->\n- \[ \] 加载中...\n\n/;
    
    if (allProjects.length > 0) {
      const projectsText = allProjects.join('\n') + '\n\n';
      newContent = fileContent.replace(placeholderRegex, projectsText);
    } else {
      newContent = fileContent.replace(placeholderRegex, "- [ ] <!-- 本周暂无未完成项目 -->\n\n");
    }
    
    if (newContent !== fileContent) {
      await app.vault.modify(currentFile, newContent);
      console.log("已更新项目集合部分");
    } else {
      console.error("无法更新项目集合，可能是占位符不匹配");
    }
  } catch (error) {
    console.error("加载本周项目时出错:", error);
  }
}, 2500); // 延迟2.5秒执行
*%>

---
## 工作集合
<%* /* 使用setTimeout延迟执行脚本，等待Obsidian环境加载完成 */
tR += "<!-- 正在加载本周工作集合... -->\n- [ ] 加载中...\n\n";

// 定义一个函数，在文件创建后执行
window.setTimeout(async () => {
  try {
    // 获取当前文件
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
      console.error("无法获取当前文件");
      return;
    }
    
    // 获取当前周的日期范围
    const currentFileName = currentFile.basename;
    // 修改正则表达式以匹配YYYY-W18周记或W18这样的格式
    const weekMatch = currentFileName.match(/W(\d+)/i) || currentFileName.match(/-W(\d+)周记/);
    
    if (!weekMatch) {
      console.error("无法从文件名解析周数:", currentFileName);
      return;
    }
    
    // 根据匹配结果获取周数，考虑两种可能的匹配模式
    const weekNum = weekMatch[1] ? parseInt(weekMatch[1]) : parseInt(weekMatch[2]);
    
    // 从文件frontmatter中获取年份和周数
    const fileContent = await app.vault.read(currentFile);
    const yearMatch = fileContent.match(/year:\s*(\d{4})/);
    const weekNumMatch = fileContent.match(/week:\s*(\d{1,2})/);
    
    if (!yearMatch || !weekNumMatch) {
      console.error("无法从文件内容获取年份或周数");
      return;
    }
    
    const year = parseInt(yearMatch[1]);
    // 从frontmatter中获取周数
    const weekNumFromFrontmatter = parseInt(weekNumMatch[1]);
    // 确定使用哪个周数值（文件名中的或frontmatter中的）
    let finalWeekNum;
    if (typeof weekNum === 'undefined' || isNaN(weekNum)) {
      console.log("使用frontmatter中的周数:", weekNumFromFrontmatter);
      finalWeekNum = weekNumFromFrontmatter;
    } else {
      console.log("使用文件名中的周数:", weekNum);
      finalWeekNum = weekNum;
    }
    
    // 计算本周的起始日期和结束日期
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (finalWeekNum - 1) * 7 - (firstDayOfYear.getDay() || 7) + 1;
    const weekStart = new Date(year, 0, daysOffset);
    const weekEnd = new Date(year, 0, daysOffset + 6);
    console.log(`计算的周范围：第${finalWeekNum}周，从${weekStart.toISOString().split('T')[0]}到${weekEnd.toISOString().split('T')[0]}`);
    
    // 格式化日期为YYYY-MM-DD格式
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const weekStartStr = formatDate(weekStart);
    const weekEndStr = formatDate(weekEnd);
    
    console.log(`查找本周(${weekStartStr}至${weekEndStr})的日记文件`);
    
    // 查找本周的所有日记文件
    const files = app.vault.getMarkdownFiles();
    const weekDiaries = files.filter(f => {
      if (!f.path.includes('/日记/')) return false;
      
      const dateMatch = f.basename.match(/^(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) return false;
      
      const fileDate = new Date(dateMatch[1]);
      return fileDate >= weekStart && fileDate <= weekEnd;
    });
    
    console.log(`找到${weekDiaries.length}个本周日记文件`);
    
    // 从所有日记文件中提取未完成工作事项
    let allWorks = [];
    
    for (const diaryFile of weekDiaries) {
      const content = await app.vault.read(diaryFile);
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
        if (inWorkSection && line.trim().startsWith('- [ ]') && !line.includes('加载中')) {
          // 添加日期前缀到工作事项
          const dateMatch = diaryFile.basename.match(/^(\d{4}-\d{2}-\d{2})/);
          if (dateMatch) {
            const workWithDate = `${line.trim()} (${dateMatch[1]})`;
            allWorks.push(workWithDate);
          } else {
            allWorks.push(line.trim());
          }
        }
      }
    }
    
    console.log(`从日记中提取了${allWorks.length}个未完成工作事项`);
    
    // 更新当前文件内容
    let fileContent = await app.vault.read(currentFile);
    let newContent;
    
    const placeholderRegex = /<!-- 正在加载本周工作集合... -->\n- \[ \] 加载中...\n\n/;
    
    if (allWorks.length > 0) {
      const worksText = allWorks.join('\n') + '\n\n';
      newContent = fileContent.replace(placeholderRegex, worksText);
    } else {
      newContent = fileContent.replace(placeholderRegex, "- [ ] <!-- 本周暂无未完成工作事项 -->\n\n");
    }
    
    if (newContent !== fileContent) {
      await app.vault.modify(currentFile, newContent);
      console.log("已更新工作集合部分");
    } else {
      console.error("无法更新工作集合，可能是占位符不匹配");
    }
  } catch (error) {
    console.error("加载本周工作事项时出错:", error);
  }
}, 3000); // 延迟3秒执行
*%>

---


## Task集合
>这周解决了什么问题?

<%* /* 使用setTimeout延迟执行脚本，等待Obsidian环境加载完成 */
tR += "<!-- 正在加载本周TODO任务... -->\n- [ ] 加载中...\n\n";

// 定义一个函数，在文件创建后执行
window.setTimeout(async () => {
  try {
    // 获取当前文件
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
      console.error("无法获取当前文件");
      return;
    }
    
    // 获取当前周的日期范围
    const currentFileName = currentFile.basename;
    // 修改正则表达式以匹配YYYY-W18周记或W18这样的格式
    const weekMatch = currentFileName.match(/W(\d+)/i) || currentFileName.match(/-W(\d+)周记/);
    
    if (!weekMatch) {
      console.error("无法从文件名解析周数:", currentFileName);
      return;
    }
    
    // 根据匹配结果获取周数，考虑两种可能的匹配模式
    const weekNum = weekMatch[1] ? parseInt(weekMatch[1]) : parseInt(weekMatch[2]);
    
    // 从文件frontmatter中获取年份和周数
    const fileContent = await app.vault.read(currentFile);
    const yearMatch = fileContent.match(/year:\s*(\d{4})/);
    const weekNumMatch = fileContent.match(/week:\s*(\d{1,2})/);
    
    if (!yearMatch || !weekNumMatch) {
      console.error("无法从文件内容获取年份或周数");
      return;
    }
    
    const year = parseInt(yearMatch[1]);
    // 从frontmatter中获取周数
    const weekNumFromFrontmatter = parseInt(weekNumMatch[1]);
    // 确定使用哪个周数值（文件名中的或frontmatter中的）
    let finalWeekNum;
    if (typeof weekNum === 'undefined' || isNaN(weekNum)) {
      console.log("使用frontmatter中的周数:", weekNumFromFrontmatter);
      finalWeekNum = weekNumFromFrontmatter;
    } else {
      console.log("使用文件名中的周数:", weekNum);
      finalWeekNum = weekNum;
    }
    
    // 计算本周的起始日期和结束日期
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (finalWeekNum - 1) * 7 - (firstDayOfYear.getDay() || 7) + 1;
    const weekStart = new Date(year, 0, daysOffset);
    const weekEnd = new Date(year, 0, daysOffset + 6);
    console.log(`计算的周范围：第${finalWeekNum}周，从${weekStart.toISOString().split('T')[0]}到${weekEnd.toISOString().split('T')[0]}`);
    
    // 格式化日期为YYYY-MM-DD格式
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const weekStartStr = formatDate(weekStart);
    const weekEndStr = formatDate(weekEnd);
    
    console.log(`查找本周(${weekStartStr}至${weekEndStr})的日记文件`);
    
    // 查找本周的所有日记文件
    const files = app.vault.getMarkdownFiles();
    const weekDiaries = files.filter(f => {
      if (!f.path.includes('/日记/')) return false;
      
      const dateMatch = f.basename.match(/^(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) return false;
      
      const fileDate = new Date(dateMatch[1]);
      return fileDate >= weekStart && fileDate <= weekEnd;
    });
    
    console.log(`找到${weekDiaries.length}个本周日记文件`);
    
    // 从所有日记文件中提取未完成TODO任务
    let allTodos = [];
    
    for (const diaryFile of weekDiaries) {
      const content = await app.vault.read(diaryFile);
      const lines = content.split('\n');
      let inTodoSection = false;
      
      for (const line of lines) {
        if (line.trim() === '## TODO(最近一周内的任务)') {
          inTodoSection = true;
          continue;
        }
        if (inTodoSection && line.trim().startsWith('## ')) {
          inTodoSection = false;
          break;
        }
        if (inTodoSection && line.trim().startsWith('- [ ]') && !line.includes('加载中')) {
          // 添加日期前缀到TODO任务
          const dateMatch = diaryFile.basename.match(/^(\d{4}-\d{2}-\d{2})/);
          if (dateMatch) {
            const todoWithDate = `${line.trim()} (${dateMatch[1]})`;
            allTodos.push(todoWithDate);
          } else {
            allTodos.push(line.trim());
          }
        }
      }
    }
    
    console.log(`从日记中提取了${allTodos.length}个未完成TODO任务`);
    
    // 更新当前文件内容
    let fileContent = await app.vault.read(currentFile);
    let newContent;
    
    const placeholderRegex = /<!-- 正在加载本周TODO任务... -->\n- \[ \] 加载中...\n\n/;
    
    if (allTodos.length > 0) {
      const todosText = allTodos.join('\n') + '\n\n';
      newContent = fileContent.replace(placeholderRegex, todosText);
    } else {
      newContent = fileContent.replace(placeholderRegex, "- [ ] <!-- 本周暂无未完成TODO任务 -->\n\n");
    }
    
    if (newContent !== fileContent) {
      await app.vault.modify(currentFile, newContent);
      console.log("已更新TODO任务部分");
    } else {
      console.error("无法更新TODO任务，可能是占位符不匹配");
    }
  } catch (error) {
    console.error("加载本周TODO任务时出错:", error);
  }
}, 3500); // 延迟3.5秒执行
*%>

---
## 这周发生的事情
- [ ]

## 这周总结



## 下周计划
- [ ]

