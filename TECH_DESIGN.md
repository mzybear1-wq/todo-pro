# 进阶版待办事项应用 - 技术设计 (TECH_DESIGN)

## 1. 技术选型
本项目基于现代化的前端技术栈构建：
- **核心框架**: React + TypeScript + Vite
- **状态管理**: Zustand（轻量级状态管理库，替代 Redux）
- **样式处理**: Tailwind CSS（原子化 CSS，用于快速开发响应式界面）
- **日期处理**: date-fns（轻量级、功能强大的日期处理库）
- **数据存储**: LocalStorage API（用于数据持久化）

## 2. 数据模型设计 (Data Model)
核心的待办事项对象 (Todo) 需要包含以下明确的字段结构：
- `id` (string): 唯一标识符（例如 UUID 或 `Date.now().toString()`）。
- `title` (string): 标题。
- `description` (string): 详细描述。
- `category` (string): 分类（例如：工作、生活、学习）。
- `priority` (enum): 优先级（`low`, `medium`, `high`）。
- `dueDate` (string/Date): 截止日期。
- `completed` (boolean): 是否已完成。
- `createdAt` (string/Date): 创建时间。

## 3. 系统架构与模块划分
推荐按以下功能模块的顺序进行开发：

1. **数据存储层 (Storage Layer)**
   - 封装 LocalStorage 的读写操作（`saveTodos`, `loadTodos`）。
2. **全局状态管理 (State Management)**
   - 使用 Zustand 创建全局 store。
   - 必须包含所有需要的业务方法：`addTodo`, `deleteTodo`, `updateTodo`, `toggleComplete`, 以及控制筛选条件的 `setFilter`、`setSearchQuery` 等方法。
3. **添加功能 (Add Component)**
   - 包含表单输入、下拉选择（分类/优先级）、日期选择器等，并包含基本验证。
4. **列表展示与筛选 (List & Filter Component)**
   - 渲染 Todo 列表，支持按分类、优先级、状态筛选（多条件组合筛选）。
5. **搜索与统计 (Search & Stats Component)**
   - 模糊搜索逻辑（标题和描述匹配）。
   - 统计面板：显示完成率、各状态的待办数量。

## 4. 关键技术点
- **Zustand 的使用**: 集中管理所有业务逻辑和状态，避免繁琐的 Props 层层传递。
- **多条件过滤逻辑**: `store` 中应提供计算属性或 selector 专门返回已过滤的列表。
- **数据持久化同步**: `Zustand` 应当与 `LocalStorage` 结合，确保每次 state 变化时同步保存到本地。