# OrbitAtlas 项目纲领与分阶段执行提示词

## 一、项目总纲领

### 1. 项目定位

项目名称建议：**OrbitAtlas**

中文内部名：**航天图谱 / 轨道图谱**

一句话定位：

> OrbitAtlas is a space launch and rocket database for tracking rockets, launches, missions, companies, and space programs around the world.

中文解释：

> OrbitAtlas 是一个面向英文用户的航天发射与火箭数据库网站，用结构化数据展示全球火箭、发射任务、航天公司、发动机、发射场和航天计划。

核心方向：

* 主站做全球航天数据库
* 中国航天作为重点专题
* 不做单纯新闻站
* 不做 SpaceX 仿站
* 不做带明显官方误导的 SpaceX / NASA / CNSA 品牌站
* 不做中美航天商业撮合
* 先做 SEO 数据资产，再考虑商业化

---

## 二、项目战略判断

### 1. 为什么不要先做 Blog

新闻内容生命周期短。

例如某次发射新闻，几周后搜索价值就下降。

长期有价值的是实体页面：

* Rocket
* Launch
* Mission
* Company
* Engine
* Launch Site
* Payload
* Recovery
* Space Program

所以 OrbitAtlas 不应该从 `blog/` 开始，而应该从这些页面开始：

* `/rockets`
* `/launches`
* `/missions`
* `/companies`
* `/engines`
* `/launch-sites`
* `/china-space-program`

News 或 Article 应该放在后面。

---

### 2. 项目的核心不是页面，而是数据模型

OrbitAtlas 不应该被当成普通 Nuxt 内容站，而应该当成一个：

> Space Knowledge Graph

也就是：

> Entity + Relationship

实体包括：

* Rocket
* Engine
* Launch
* Mission
* Company
* Launch Site
* Payload
* Recovery
* Article
* Tag
* Entity Index

关系包括：

* 一个 Company 可以拥有多个 Rocket
* 一个 Rocket 可以使用多个 Engine
* 一个 Engine 可以被多个 Rocket 使用
* 一个 Launch 属于一个 Rocket
* 一个 Launch 发生在一个 Launch Site
* 一个 Launch 可以携带多个 Payload
* 一个 Mission 可以对应多次 Launch
* 一个 Launch 可以关联 Recovery
* 一个 Article 可以关联 Rocket / Launch / Company / Mission

---

## 三、目标用户

### 1. 第一目标用户

英文航天爱好者：

* SpaceX 粉丝
* 火箭发射爱好者
* 关注 Starship / Falcon / Long March / Zhuque / New Glenn 的用户
* 经常搜索 launch schedule 的用户

### 2. 第二目标用户

研究型用户：

* 科技媒体作者
* 学生
* 产业研究人员
* 投资人
* 地缘科技观察者

### 3. 第三目标用户

泛科技用户：

* 关注 China vs SpaceX
* 关注中国可重复使用火箭
* 关注登月竞赛
* 关注卫星互联网
* 关注商业航天公司

---

## 四、内容战略

### 1. 主站定位

不要把整个网站命名为 Chinese Space 或 China Rocket。

主站应该是全球视角：

> OrbitAtlas — Space Launch & Rocket Database

然后开一个强专题：

> China Space Program

这样既可以吃中国航天 SEO，又不会把网站品牌锁死在中国航天上。

---

### 2. 第一批重点栏目

主导航建议：

* Launches
* Rockets
* Missions
* Companies
* Engines
* Launch Sites
* China Space Program
* Compare

---

### 3. 第一批高价值 SEO 页面

#### 全球页面

* `/rockets/falcon-9`
* `/rockets/starship`
* `/rockets/new-glenn`
* `/rockets/electron`
* `/companies/spacex`
* `/companies/rocket-lab`
* `/missions/starlink`
* `/engines/raptor`
* `/launch-sites/starbase`

#### 中国专题页面

* `/china-space-program`
* `/china/launches`
* `/china/rockets`
* `/china/companies`
* `/china/reusable-rockets`
* `/china/moon-program`
* `/china/space-station`
* `/china/launch-sites`

#### 对比页面

* `/compare/falcon-9-vs-long-march-8`
* `/compare/starship-vs-zhuque-3`
* `/compare/spacex-vs-chinese-commercial-space`
* `/compare/china-moon-program-vs-artemis`

---

## 五、技术总路线

### 阶段 1：零数据库 MVP

技术栈：

* Nuxt 3
* TypeScript Strict
* Nuxt Content 或本地 JSON
* 纯 CSS / CSS Modules / Tailwind 可选
* Sitemap
* SEO Meta
* Cloudflare DNS/CDN
* Vercel 部署
* GitHub 管理数据

数据来源：

* `database/rockets/*.json`
* `database/companies/*.json`
* `database/launches/*.json`
* `database/engines/*.json`
* `database/missions/*.json`
* `database/launch-sites/*.json`

这一阶段不要用：

* Prisma
* 数据库
* 登录系统
* CMS
* Redis
* Vector Database
* AI Chat
* Algolia
* Meilisearch
* 后台管理系统

目标：

> 用最低成本验证 Google 是否愿意收录这些结构化页面。

---

### 阶段 2：结构化数据站

当页面超过 100 个之后，开始加强：

* 数据校验
* JSON Schema
* 自动生成页面
* 自动生成 sitemap
* 自动生成 related entities
* 自动生成 compare 页面
* 自动生成 country/program 专题页

---

### 阶段 3：数据库化

当数据达到：

* 100+ rockets
* 1000+ launches
* 300+ companies / missions / engines
* 需要搜索、筛选、后台录入

再迁移到：

* Turso + Prisma

未来数据更大时再考虑：

* Neon / PostgreSQL

---

### 阶段 4：自动化与商业化

可以逐步加入：

* RSS 抓取
* Launch schedule 更新
* AI 摘要
* Newsletter
* AdSense
* Affiliate
* 火箭模型 / 航天礼物评测
* API
* 会员数据工具

---

## 六、推荐项目目录

```txt
orbitatlas/
├── app/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.vue
│   │   ├── rockets/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   ├── launches/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   ├── missions/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   ├── companies/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   ├── engines/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   ├── launch-sites/
│   │   │   ├── index.vue
│   │   │   └── [slug].vue
│   │   ├── china-space-program.vue
│   │   ├── china/
│   │   │   ├── launches.vue
│   │   │   ├── rockets.vue
│   │   │   ├── companies.vue
│   │   │   ├── reusable-rockets.vue
│   │   ├── compare/
│   │   │   └── [slug].vue
├── database/
│   ├── rockets/
│   ├── companies/
│   ├── launches/
│   ├── missions/
│   ├── engines/
│   ├── launch-sites/
│   ├── payloads/
│   ├── recoveries/
│   ├── schemas/
│   │   ├── rocket.schema.ts
│   │   ├── company.schema.ts
│   │   ├── launch.schema.ts
│   │   ├── mission.schema.ts
│   │   ├── engine.schema.ts
│   │   └── launch-site.schema.ts
├── providers/
│   ├── spacex.ts
│   ├── nasa.ts
│   ├── cnsa.ts
│   ├── casc.ts
│   ├── landspace.ts
│   └── rocketlab.ts
├── utils/
│   ├── slug.ts
│   ├── seo.ts
│   ├── dates.ts
│   ├── units.ts
│   └── relations.ts
├── public/
│   └── images/
│       ├── rockets/
│       ├── companies/
│       └── missions/
├── types/
│   ├── rocket.ts
│   ├── launch.ts
│   ├── company.ts
│   ├── engine.ts
│   └── mission.ts
├── content/
│   ├── guides/
│   └── explainers/
├── nuxt.config.ts
└── package.json
```

---

# 七、初始化项目提示词

下面这段可以直接复制给 Cursor、Claude Code、ChatGPT Codex 或其他开发助手。

## 初始化项目总提示词

```txt
You are a senior full-stack engineer and technical architect.
I want to build a website called OrbitAtlas.
OrbitAtlas is a space launch and rocket database focused on rockets, launches, missions, companies, engines, launch sites, payloads, and space programs. It should not be a normal blog-first content site. It should be an entity-first, data-driven SEO website.

Core positioning:
- Global space launch and rocket database
- China Space Program as a major topic section
- English-first website
- SEO-first architecture
- Static JSON-first MVP
- No database in the first version
- No authentication
- No CMS
- No AI features yet
- No overengineering

Tech stack:
- Nuxt 3
- TypeScript strict mode
- File-based routing
- JSON data stored under /database
- Schema/type definitions under /schemas and /types
- Pages generated from structured data
- SEO metadata for every entity page
- Sitemap support
- Clean, fast, minimal UI
- Deployable to Vercel
- Cloudflare can be used for DNS/CDN later

Please initialize the project structure and create the first working MVP.

Requirements:
1. Create a clean Nuxt 3 project structure.
2. Create directories for:
   - database/rockets
   - database/companies
   - database/launches
   - database/missions
   - database/engines
   - database/launch-sites
   - schemas
   - types
   - utils
   - providers
3. Define TypeScript types for:
   - Rocket
   - Company
   - Launch
   - Mission
   - Engine
   - LaunchSite
   - Payload
   - Recovery
4. Create sample JSON data for at least:
   - Falcon 9
   - Starship
   - Long March 5
   - Long March 8
   - Zhuque-3
   - SpaceX
   - CASC
   - LandSpace
5. Create the following pages:
   - Homepage
   - /rockets
   - /rockets/[slug]
   - /companies
   - /companies/[slug]
   - /launches
   - /launches/[slug]
   - /china-space-program
   - /china/rockets
   - /china/companies
   - /compare/[slug]
6. Each entity detail page should:
   - Load data from JSON
   - Show key facts in a structured table
   - Show description
   - Show related entities where available
   - Generate SEO title and meta description
7. The homepage should explain:
   - What OrbitAtlas is
   - Featured rockets
   - Latest launches
   - China Space Program section
   - Compare section
8. Keep the code simple and maintainable.
9. Do not add a database yet.
10. Do not add authentication.
11. Do not add AI features.
12. Do not use external paid services.

Please generate the files step by step, explain the architecture briefly, and make sure the project can run locally with npm install and npm run dev.
```

---

# 八、分阶段执行路线与每阶段提示词

## Phase 0：项目原则确认

### 目标

确定项目边界，避免一开始做偏。

### 交付物

* 项目定位
* 非目标清单
* 第一版功能范围
* 第一批页面清单

### 验收标准

* 能用一句话解释项目
* 明确不做什么
* 明确第一版只做数据页，不做新闻站

### 提示词

```txt
Act as a product strategist for OrbitAtlas.
Help me define the product scope for an English-first space launch and rocket database website.

Please produce:
1. One-sentence positioning
2. Target users
3. Core use cases
4. What we should build in MVP
5. What we should NOT build in MVP
6. First 30 SEO pages to create
7. First 10 China Space Program pages to create
8. Risks and how to avoid them

Important constraints:
- Entity-first, not blog-first
- JSON-first, no database initially
- SEO-first
- China Space Program is a major topic but not the whole brand
- Avoid SpaceX/NASA/CNSA trademark confusion
```

---

## Phase 1：数据模型设计

### 目标

先设计数据结构，再写页面。

### 核心实体

* Company
* Rocket
* Engine
* Launch
* LaunchSite
* Mission
* Payload
* Recovery
* Article
* EntityIndex

### 交付物

* TypeScript interfaces
* JSON Schema
* Entity relationship explanation
* Sample JSON files

### 验收标准

* 每个实体都有 slug
* 每个实体都有 SEO title / description 可生成
* Rocket 能关联 Company、Engine、Launch
* Launch 能关联 Rocket、LaunchSite、Payload、Mission、Recovery
* Mission 能关联多次 Launch

### 提示词

```txt
Act as a data architect.
Design the data model for OrbitAtlas, an entity-first space launch database.

Entities:
- Company
- Rocket
- Engine
- RocketEngine
- Launch
- LaunchSite
- Mission
- LaunchMission
- Payload
- Recovery
- Article
- EntityIndex

Please produce:
1. TypeScript interfaces
2. JSON file examples for each entity
3. Relationship rules
4. Required fields vs optional fields
5. Slug strategy
6. SEO metadata strategy
7. Folder structure under /database
8. Validation strategy without using a database

Constraints:
- MVP uses JSON files only
- Future migration to Prisma/Turso/Postgres should be easy
- Avoid designing around articles
- Entity pages should be generated from structured data
- Keep the schema practical, not academic
```

---

## Phase 2：Nuxt 项目初始化

### 目标

搭出能跑的 Nuxt 站点骨架。

### 交付物

* Nuxt 3 项目
* 基础布局
* 首页
* 导航栏
* 数据读取工具
* 基础 CSS
* SEO 工具函数

### 验收标准

* 本地能运行
* 首页能打开
* 能读取 JSON 数据
* `/rockets` 能显示列表
* `/rockets/[slug]` 能显示详情

### 提示词

```txt
Act as a senior Nuxt 3 engineer.
Initialize the OrbitAtlas MVP using Nuxt 3 and TypeScript.

Build:
1. Basic Nuxt 3 structure
2. Global layout
3. Header navigation
4. Homepage
5. Utility functions for reading local JSON data
6. Rocket list page
7. Rocket detail page
8. Company list page
9. Company detail page
10. Basic SEO helper

Data should be loaded from /database JSON files.

Do not add:
- Database
- Prisma
- Auth
- CMS
- AI
- Tailwind unless necessary
- Complex state management

The goal is a clean, fast, SEO-friendly static-first site.
```

---

## Phase 3：第一批种子数据

### 目标

填充第一批高价值实体数据。

### 第一批数据建议

Rockets：

* Falcon 9
* Starship
* Long March 5
* Long March 8
* Long March 10
* Zhuque-2
* Zhuque-3
* New Glenn
* Electron
* Ariane 6

Companies：

* SpaceX
* NASA
* CASC
* LandSpace
* Galactic Energy
* Rocket Lab
* Blue Origin
* ESA
* Arianespace

Engines：

* Merlin
* Raptor
* YF-100
* YF-77
* TQ-12
* BE-4
* Rutherford

### 交付物

* JSON 数据文件
* 图片占位字段
* 来源字段
* 更新时间字段

### 验收标准

* 至少 10 个 Rocket 页面
* 至少 8 个 Company 页面
* 至少 5 个 Engine 页面
* 每个页面都有 SEO title 和 description

### 提示词

```txt
Act as a spaceflight data editor and structured data specialist.
Create the first seed dataset for OrbitAtlas.

Please generate JSON data files for:
- 10 rockets
- 8 companies
- 6 engines
- 5 launch sites
- 5 missions
- 10 launches

Focus on:
- SpaceX
- NASA
- CASC
- LandSpace
- Rocket Lab
- Blue Origin
- Chinese reusable rocket programs
- China Space Program

Each entity must include:
- slug
- name
- shortName if useful
- country
- description
- key technical facts
- related entity slugs
- image placeholder
- sourceUrls array
- lastUpdated date

Important:
- Keep descriptions factual and neutral.
- Do not invent exact numbers if uncertain.
- Use null for unknown values.
- Make the JSON easy to migrate to a database later.
```

---

## Phase 4：实体详情页

### 目标

把每个实体页面做成 SEO 资产。

### 页面模板

Rocket 页面应包含：

* 标题
* 简介
* Key facts
* Manufacturer
* Country
* Status
* Reusable or not
* Height / diameter / mass / payload
* Engines
* Launch history
* Related missions
* Related companies
* Compare links

Company 页面应包含：

* 公司简介
* 国家
* 类型
* 成立时间
* 火箭列表
* 任务列表
* 相关发射
* 相关专题

Launch 页面应包含：

* Mission name
* Rocket
* Launch site
* Launch time
* Status
* Payload
* Orbit
* Webcast
* Recovery
* Related rocket/company/mission

### 验收标准

* 页面不是 Markdown 文章，而是结构化数据页
* 每个页面都有表格、关系链接、SEO 文案
* 页面可以自动扩展

### 提示词

```txt
Act as a Nuxt 3 SEO engineer.
Build reusable entity detail page templates for OrbitAtlas.

Create detail pages for:
1. Rocket
2. Company
3. Launch
4. Engine
5. Mission
6. LaunchSite

Each detail page should:
- Load entity data by slug
- Render a strong H1
- Render a short summary
- Render a key facts table
- Render related entities
- Render internal links
- Generate SEO title
- Generate SEO meta description
- Handle missing data gracefully
- Return a 404 if slug does not exist

Keep the design clean, fast, and readable.
Do not make it look like a blog post.
Make it feel like a structured database page.
```

---

## Phase 5：中国航天专题

### 目标

用中国航天切入美国 SEO 市场。

### 页面

* `/china-space-program`
* `/china/launches`
* `/china/rockets`
* `/china/companies`
* `/china/reusable-rockets`
* `/china/moon-program`
* `/china/space-station`
* `/china/launch-sites`

### 内容角度

不要写成宣传口吻。

要写成中立数据站口吻：

* China launch schedule
* Chinese rockets
* Chinese commercial space companies
* Chinese reusable rockets
* China moon program
* China space station
* China vs SpaceX
* China vs NASA Artemis

### 验收标准

* 页面英文自然
* 数据中立
* 不夸张
* 不使用政治化语言
* 能链接到 Rocket / Company / Launch / Mission 页面

### 提示词

```txt
Act as an English SEO editor and space industry analyst.
Create the China Space Program section for OrbitAtlas.

Pages to build:
1. /china-space-program
2. /china/rockets
3. /china/launches
4. /china/companies
5. /china/reusable-rockets
6. /china/moon-program
7. /china/space-station
8. /china/launch-sites

Tone:
- Neutral
- Factual
- Data-driven
- Written for American and international readers
- No propaganda tone
- No anti-China tone
- No official-sounding claims

Each page should include:
- SEO title
- Meta description
- H1
- Intro paragraph
- Key facts
- Internal links to relevant rockets, companies, launches, and missions
- Suggested FAQ section
- Suggested related comparison pages

Focus on search intent such as:
- China rocket launch schedule
- Chinese reusable rockets
- China space companies
- China moon program
- China vs SpaceX
```

---

## Phase 6：对比页面

### 目标

用对比页面获得高点击率。

### 第一批对比页

* Falcon 9 vs Long March 8
* Starship vs Zhuque-3
* SpaceX vs Chinese Commercial Space
* China Moon Program vs Artemis
* Raptor vs TQ-12
* Long March 5 vs Falcon Heavy
* Rocket Lab Electron vs Chinese small launchers

### 页面结构

* 概览
* 参数对比表
* 用途对比
* 可重复使用能力
* 发射记录
* 成本/商业模式，未知则写 unknown
* 结论
* FAQ

### 验收标准

* 不夸张
* 不造数据
* 不用"谁碾压谁"的标题党
* 表格清晰
* 内链充足

### 提示词

```txt
Act as a technical SEO writer and aerospace analyst.
Create comparison page templates for OrbitAtlas.

Build a reusable compare page for:
- Rocket vs Rocket
- Engine vs Engine
- Company vs Company
- Program vs Program

First comparison pages:
1. Falcon 9 vs Long March 8
2. Starship vs Zhuque-3
3. Raptor vs TQ-12
4. SpaceX vs Chinese commercial space companies
5. China Moon Program vs NASA Artemis

Each page should include:
- SEO title
- Meta description
- H1
- Short answer
- Comparison table
- Key similarities
- Key differences
- Use cases
- Limitations and unknowns
- Related entity links
- FAQ

Important:
- Do not invent data.
- Use unknown/null when data is not confirmed.
- Keep tone neutral and analytical.
- Avoid nationalist or fanboy tone.
```

---

## Phase 7：SEO 基础设施

### 目标

让 Google 更容易收录网站。

### 必做

* 每页 title
* 每页 meta description
* canonical URL
* sitemap.xml
* robots.txt
* Open Graph
* JSON-LD structured data
* 内链
* 面包屑
* 404 页面
* 页面速度优化

### 验收标准

* 每个实体页面有唯一 title
* 每个实体页面有唯一 description
* sitemap 包含全部动态页面
* 首页 3 次点击内能到大部分重要页面

### 提示词

```txt
Act as a technical SEO engineer.
Audit and improve OrbitAtlas SEO infrastructure.

Please implement:
1. Dynamic title and meta description for every entity page
2. Canonical URLs
3. Sitemap generation
4. robots.txt
5. Open Graph metadata
6. Breadcrumbs
7. Internal linking strategy
8. JSON-LD structured data where appropriate
9. Clean 404 page
10. Performance improvements

Entity pages include:
- rockets
- companies
- launches
- missions
- engines
- launch-sites
- compare pages
- China Space Program pages

The site is a static-first Nuxt 3 website using local JSON data.
Keep everything simple and deployable to Vercel.
```

---

## Phase 8：部署与上线

### 目标

低成本上线。

### 推荐架构

```txt
User
  ↓
Cloudflare DNS/CDN
  ↓
Vercel
  ↓
Nuxt static/SSR site
  ↓
JSON data in GitHub
```

### 上线前检查

* 域名已配置
* Cloudflare DNS 已接入
* Vercel 项目已连接 GitHub
* 环境变量为空或最小化
* sitemap 可访问
* robots.txt 可访问
* 页面无明显 404
* Search Console 已提交
* Analytics 已接入

### 提示词

```txt
Act as a deployment engineer.
Help me deploy OrbitAtlas to Vercel with Cloudflare DNS/CDN.

Please provide:
1. Deployment checklist
2. Vercel settings
3. Cloudflare DNS settings
4. Build command
5. Output settings
6. SEO launch checklist
7. Post-launch monitoring checklist
8. Common deployment errors and fixes

Project details:
- Nuxt 3
- JSON-first data
- No database
- GitHub repository
- English SEO website
- Domain will be managed through Cloudflare
```

---

## Phase 9：内容生产流程

### 目标

建立稳定的内容和数据更新机制。

### 每周任务

* 新增 5 个 Rocket / Launch / Company 实体
* 新增 1 个 China Space Program 专题页面
* 新增 1 个 Compare 页面
* 检查 Search Console 关键词
* 修复低质量页面
* 增加内链

### 内容优先级

第一优先级：

* 中国可重复使用火箭
* Long March 系列
* 中国商业航天公司
* SpaceX 对比
* 发射时间表

第二优先级：

* NASA Artemis
* Starship
* Rocket Lab
* Blue Origin
* ESA / Ariane

第三优先级：

* 航天科普
* 火箭模型
* 航天礼物
* Newsletter

### 提示词

```txt
Act as an SEO content strategist for OrbitAtlas.
Create a 4-week content production plan.

Goal:
Build topical authority around space launches, rockets, and China Space Program.

Please include:
1. Weekly publishing plan
2. Entity pages to create
3. Compare pages to create
4. China Space Program pages to create
5. Internal linking plan
6. Keyword intent for each page
7. Page priority score
8. Estimated difficulty
9. Monetization potential
10. Data fields needed for each page

Constraints:
- Do not focus on short-lived news first
- Focus on evergreen entity pages
- English-first
- Neutral and factual tone
- SEO-driven but not spammy
```

---

## Phase 10：数据校验与质量控制

### 目标

防止网站变成低质量 AI 内容站。

### 必须控制

* 不确定数据用 `null`
* 每个数据点尽量保留 sourceUrls
* 每个实体保留 lastUpdated
* 不写"最强""碾压""领先世界"等夸张词
* 不把推测写成事实
* 不滥用 SpaceX/NASA/CNSA 官方口吻

### 提示词

```txt
Act as a data quality auditor for OrbitAtlas.
Review the JSON data and entity pages.

Check for:
1. Missing required fields
2. Broken slugs
3. Broken internal links
4. Inconsistent country names
5. Inconsistent unit formats
6. Unsupported claims
7. Overly promotional language
8. Missing source URLs
9. Missing lastUpdated fields
10. SEO titles that are duplicated or too generic

Output:
- Issues found
- Severity
- Suggested fixes
- Files likely affected
- Improved data examples
```

---

## Phase 11：数据库迁移准备

### 触发条件

不要太早迁移数据库。

满足以下条件再迁移：

* 页面超过 300 个
* Launch 数据超过 1000 条
* JSON 管理开始痛苦
* 需要后台录入
* 需要复杂筛选
* 需要 API
* 需要自动抓取数据

### 推荐路线

第一选择：

* Turso + Prisma

未来升级：

* Neon / PostgreSQL

### 提示词

```txt
Act as a database architect.
Prepare OrbitAtlas for migration from JSON files to Prisma + Turso.

Current state:
- Nuxt 3
- Local JSON data under /database
- Entity-first architecture
- Types already exist
- Pages already load data from utility functions

Please produce:
1. Prisma schema
2. Migration strategy
3. Data import script plan
4. Mapping from JSON files to database tables
5. Repository pattern so frontend pages do not need major rewrites
6. Risks during migration
7. Rollback plan
8. Future Postgres compatibility notes

Entities:
- Company
- Rocket
- Engine
- RocketEngine
- Launch
- LaunchSite
- Mission
- LaunchMission
- Payload
- Recovery
- Article
- Tag
- EntityIndex

Important:
- Do not redesign everything.
- Preserve existing slugs.
- Preserve SEO URLs.
- Keep the frontend page structure stable.
```

---

## Phase 12：商业化

### 不建议一开始做

* 付费会员
* 周边商城
* 复杂广告系统
* API 收费
* 数据订阅

### 可以后面做

当自然流量稳定后：

* AdSense
* 航天书籍 affiliate
* 火箭模型 affiliate
* 天文望远镜 affiliate
* 航天礼物指南
* Newsletter
* 高级发射日历
* API
* 数据下载
* 专业版研究工具

### 提示词

```txt
Act as an indie website monetization strategist.
Design a monetization plan for OrbitAtlas.

Context:
- English-first space launch and rocket database
- Organic SEO traffic
- Strong China Space Program section
- Entity-first data pages
- Audience includes space fans, students, researchers, and tech readers

Please produce:
1. Monetization options ranked by suitability
2. What to avoid early
3. Affiliate content ideas
4. Ad placement strategy
5. Newsletter strategy
6. API/data product ideas
7. Commercialization timeline
8. Risks around trademarks and user trust
9. Revenue experiments to run after traffic grows

Important:
- Do not damage SEO quality
- Do not make the site look spammy
- Do not imply official SpaceX/NASA/CNSA affiliation
```

---

# 九、第一阶段最小可行版本 MVP

## MVP 只做这些

### 页面

* 首页
* Rockets 列表
* Rocket 详情
* Companies 列表
* Company 详情
* Launches 列表
* Launch 详情
* China Space Program
* China Rockets
* China Companies
* Compare 页面

### 数据

* 10 个 Rockets
* 8 个 Companies
* 10 个 Launches
* 5 个 Engines
* 5 个 Launch Sites
* 3 个 Missions
* 3 个 Compare 页面

### 技术

* Nuxt 3
* JSON 数据
* SEO meta
* Sitemap
* Vercel
* Cloudflare

### 不做

* 数据库
* 登录
* CMS
* AI 问答
* 支付
* 会员
* 爬虫
* 后台管理
* 评论系统

---

# 十、最重要的执行原则

## 原则 1：先做数据页，不做新闻站

新闻会过期，实体页会积累权重。

---

## 原则 2：先做英文，不做中英文同时起步

英文 SEO 是主战场。

中文可以以后做 i18n。

---

## 原则 3：先做中国专题，但不要把品牌锁死在中国

OrbitAtlas 是全球航天数据库。

China Space Program 是重点栏目，不是整个品牌。

---

## 原则 4：先用 JSON，不要急着上数据库

第一版真正要验证的是：

> Google 是否收录，用户是否搜索，页面是否有曝光。

不是验证数据库设计多高级。

---

## 原则 5：每个页面都必须有内链

每个 Rocket 页面链接到：

* Company
* Engine
* Launches
* Missions
* Compare pages

每个 Company 页面链接到：

* Rockets
* Launches
* Missions
* Country pages

每个 Launch 页面链接到：

* Rocket
* Company
* Launch Site
* Payload
* Mission

---

## 原则 6：不确定的数据不要硬写

未知就写：

* Unknown
* Not publicly confirmed
* To be confirmed
* null

不要编。

---

## 原则 7：把页面做成数据库，不要做成作文

好的页面结构是：

* Summary
* Key facts
* Data table
* Related entities
* Launch history
* Comparison links
* FAQ

不是长篇散文。

---

# 十一、你接下来应该怎么做

## 第一步

先用"初始化项目总提示词"生成 Nuxt 项目骨架。

## 第二步

用 Phase 1 提示词生成 TypeScript 类型和 JSON 数据结构。

## 第三步

手动确认数据结构，不要急着写页面。

## 第四步

生成 Rocket / Company / Launch 三类核心页面。

## 第五步

填充 20–30 个实体页面。

## 第六步

上线 Vercel + Cloudflare。

## 第七步

提交 Google Search Console。

## 第八步

连续 4 周更新数据和页面。

## 第九步

根据 Search Console 关键词决定下一批页面。

## 第十步

等页面规模起来后，再考虑数据库、自动化和商业化。

---

# 十二、最终执行顺序

```txt
01. 定位 OrbitAtlas
02. 确认 MVP 范围
03. 设计数据模型
04. 设计 JSON 文件结构
05. 初始化 Nuxt 项目
06. 创建基础布局
07. 创建 Rocket 页面
08. 创建 Company 页面
09. 创建 Launch 页面
10. 创建 China Space Program 专题
11. 创建 Compare 页面
12. 添加 SEO meta
13. 添加 sitemap
14. 添加内链
15. 部署 Vercel
16. 接入 Cloudflare
17. 提交 Search Console
18. 每周新增实体页面
19. 根据关键词优化页面
20. 数据量上来后迁移数据库
```
