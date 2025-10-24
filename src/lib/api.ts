// Stub API file for common endpoints
export const api = new Proxy({} as any, {
  get: (target, prop: string | symbol) => {
    if (prop === 'get' || prop === 'post') {
      return async (url: string, data?: any) => {
        try {
          const options: RequestInit = {
            method: prop === 'post' ? 'POST' : 'GET',
            headers: { 'Content-Type': 'application/json' },
          };
          if (data && prop === 'post') {
            options.body = JSON.stringify(data);
          }
          const response = await fetch(url, options);
          return await response.json();
        } catch (error) {
          console.error('API Error:', error);
          return null;
        }
      };
    }

    // Handle any other method call (e.g., api.getAchievements())
    return async () => {
      try {
        const endpoint = String(prop)
          .replace(/^get/, '') // Remove 'get' prefix
          .replace(/([A-Z])/g, '-$1') // Add hyphen before capital letters
          .toLowerCase()
          .replace(/^-/, ''); // Remove leading hyphen if it exists
        const response = await fetch(`/api/${endpoint}`);
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        return null;
      }
    };
  }
});
