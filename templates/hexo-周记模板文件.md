---
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
from "周记/2025" or "source/_posts/周记/2025"
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
sort ascending
```

---
## 任务集合
```dataview
TASK FROM "002hexoblog/source/_posts/日记/2025"
WHERE file.frontmatter.week = this.file.frontmatter.week
WHERE contains(section, "今日计划") OR contains(section, "TODO")
GROUP BY file.link
SORT file.day ASC
```


```dataviewjs
// 打印当前页面的 week 属性用于调试
console.log("当前页面的 week 属性值:", dv.current().frontmatter?.week);

const validPages = dv.pages('"002hexoblog/source/_posts/日记/2025"')
 .filter(p => {
    if (!p.frontmatter) {
      console.log(`页面 ${p.file.name} 没有 frontmatter`);
      return false;
    }
    if (!p.frontmatter.week) {
      console.log(`页面 ${p.file.name} 的 frontmatter 中没有 week 属性`);
      return false;
    }
    const isSameWeek = p.frontmatter.week === dv.current().frontmatter.week;
    if (!isSameWeek) {
      console.log(`页面 ${p.file.name} 的 week 属性值为 ${p.frontmatter.week}，与当前页面不同`);
    }
    return isSameWeek;
  });

const tasks = validPages.flatMap(p => p.file.tasks)
 .filter(t => t.section.subpath.includes("今日计划") || t.section.subpath.includes("TODO"))
 .sort(t => t.file.day || t.file.cday);

// 打印筛选出的任务数量用于调试
console.log("筛选出的任务数量:", tasks.length);

dv.taskList(tasks);

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
```dataview
TASK
FROM "source/_posts/日记/2025"
WHERE contains(section, "工作事项")
WHERE file.day >= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-01")
WHERE file.day <= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-31")
WHERE file.frontmatter.week = this.file.frontmatter.week
GROUP BY file.link
SORT file.day ASC
```

---


## 已完成任务集合
>这周解决了什么问题?

```dataview
TASK
FROM "source/_posts/日记/2025"
WHERE completed
WHERE file.day >= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-01")
WHERE file.day <= date(this.file.frontmatter.year + "-" + this.file.frontmatter.month + "-31")
WHERE file.frontmatter.week = this.file.frontmatter.week
GROUP BY file.link
SORT file.day ASC
```

---

