import { serve } from "https://deno.land/std/http/server.ts";

// 处理请求的函数
const handleRequest = async (req: Request) => {
  // 设置 CORS 响应头
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');  // 允许所有来源访问
  headers.set('Access-Control-Allow-Methods', 'POST');  // 允许 POST 方法
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // 允许的请求头

  // 如果是 OPTIONS 请求，返回空响应
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // 处理 POST 请求
  if (req.method === 'POST') {
    try {
      // 获取请求体内容
      const { question } = await req.json();

      // 生成一个模拟的答案
      const answer = `这是你提问的答案：${question}`;

      // 返回 JSON 格式的响应
      return new Response(
        JSON.stringify({ answer }),
        {
          headers: {
            "Content-Type": "application/json",
            ...headers,  // 保留 CORS 头
          }
        }
      );
    } catch (error) {
      // 捕获 JSON 解析错误或其他错误
      return new Response("请求格式错误", { status: 400, headers });
    }
  }

  // 如果是其他方法，返回 405 Method Not Allowed
  return new Response("Method Not Allowed", { status: 405, headers });
};

// 启动 HTTP 服务器并监听 8000 端口
console.log("服务器启动，监听 8000 端口...");
serve(handleRequest, { port: 8000 });
