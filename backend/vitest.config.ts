import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    pool: 'forks',
    coverage: {
      provider: 'v8', // 或 'istanbul'
      // 確保 'json-summary' 在 reporter 陣列中
      reporter: ['text', 'html', 'json-summary'], // <--- 重要的部分
      reportsDirectory: './coverage', // 預設的報告輸出目錄
      // ... 其他覆蓋率設定 ...
    },
  }
  
})
