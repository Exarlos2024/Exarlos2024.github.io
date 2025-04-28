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
- [ ] 
---
## 项目集合
- [ ] 
---
## Task集合
>这周解决了什么问题?

- [ ] 


---
## 这周发生的事情
- [ ]

## 这周总结



## 下周计划
- [ ]

