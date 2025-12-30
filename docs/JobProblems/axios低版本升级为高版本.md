# axios 低版本升级为高版本

低版本的 axios 被安全扫描，说是存在安全漏洞，现在需要进行一个升级。

主要需要注意的地方是 API 的兼容性问题。

官方的升级指南地址贴上：<https://github.com/axios/axios/blob/v1.x/MIGRATION_GUIDE.md>

这里总结一下，如果实操的话还是去官方最新的，因为官方文档会保持更新，更加准确。

## 重试逻辑

官方指导文档：<https://github.com/axios/axios/blob/v1.x/MIGRATION_GUIDE.md#common-patterns>

官方是给了一个重试的例子，这里贴一下：

```js
// Retry interceptor for 1.x
function createRetryInterceptor(maxRetries = 3, retryDelay = 1000) {
  return axios.interceptors.response.use(
    response => response,
    async error => {
      const config = error.config;
      
      if (!config || !config.retry) {
        return Promise.reject(error);
      }
      
      config.__retryCount = config.__retryCount || 0;
      
      if (config.__retryCount >= maxRetries) {
        return Promise.reject(error);
      }
      
      config.__retryCount += 1;
      
      // Exponential backoff
      const delay = retryDelay * Math.pow(2, config.__retryCount - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return axios(config);
    }
  );
}

// Usage
const api = axios.create();
createRetryInterceptor(3, 1000);

// Make request with retry
api.get('/api/data', { retry: true });
```

注意：

这里官方使用了 axios 的全局拦截器，但是的话我们一般不推荐使用全局拦截器，而是推荐使用实例上的拦截器
参考本仓库其他文章：`docs\ArchitectThinking\axios的拦截器应该放在axios上还是axios.create的实例上.md`
