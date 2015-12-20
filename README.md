
# nw-chat

NW.js + React + Redux + Webpack => Chat

## 开发工具链

- `npm run lint` eslint (confg-rackt)
- `npm run test` mocha:test
- `npm run dev` webpack:build+watch

## 设计理念

- 尽量用promise 不用thunk(callback)
  
  ```js
  
  ```

- const取消依赖keymirror 影响解构export test保障

  ```js
  export const AAA = 'AAA'
  export const BBB = 'BBB'
  ```
