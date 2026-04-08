# 待办事项应用 (进阶版) - 开发指令 (AGENTS)

## 1. 代码规范
- **语言**: React + TypeScript
- **组件范式**: 必须使用函数式组件 (Functional Components) 和 React Hooks (useState, useEffect 等)。
- **样式方案**: 必须使用 Tailwind CSS 类名，禁止使用行内样式 (Inline Styles) 或独立的 CSS 文件（特殊全局重置除外）。
- **状态管理**: 必须使用 **Zustand** 创建全局 Store，禁止使用 Redux 或 Context API。
- **日期处理**: 统一使用 `date-fns` 进行日期的格式化和比较操作。

## 2. 数据与存储规范
- **数据持久化**: 必须封装 LocalStorage 的读写操作，在 Zustand 的 Store 中每次更新数据时同步持久化到 LocalStorage。页面加载时必须从 LocalStorage 恢复初始状态。
- **类型定义**: 必须明确声明 `Todo` 接口模型，包含所有要求的字段（`id`, `title`, `description`, `category`, `priority`, `dueDate`, `completed`, `createdAt`）。

## 3. 开发执行步骤
建议按以下顺序开发和测试：
1. **定义数据模型和存储工具函数**: 创建 `Todo` 接口和 `LocalStorage` 工具函数。
2. **创建 Zustand 状态管理**: 创建完整的全局 Store，包含数据数组和所有增删改查、筛选方法。
3. **实现 AddTodo 组件**: 包含表单输入、下拉选择（优先级/分类）、日期选择器（利用 HTML5 `input type="date"` 或第三方库），并添加基本验证。
4. **实现列表展示与筛选**: 渲染任务卡片，实现按分类、优先级、状态筛选。
5. **实现模糊搜索**: 在标题和描述中查找相关关键词。
6. **实现统计功能面板**: 实时计算并显示任务完成率、待办数量等。

## 4. 注意事项
- 每完成一个功能模块，务必在本地进行测试，确保正常工作后再进行下一步。
- 确保多条件筛选时逻辑的正确性（如：同时按“工作分类”且“高优先级”且“包含某个关键词”进行过滤）。
- 添加合理的错误提示和边界处理（例如：标题不能为空）。