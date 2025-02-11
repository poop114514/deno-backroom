// 使用正确的 import 语法
import { serve } from "https://deno.land/std/http/server.ts";

const API_KEY = "AIzaSyAlD9wkqIvLbtY3-d8o1ztxxGhQze_DyaA"; // 替换为你实际的 API 密钥

// CORS 设置：允许所有来源访问 API
const handleRequest = async (req: Request) => {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');  // 可以指定具体域名代替 '*' 来限制跨域来源
  headers.set('Access-Control-Allow-Methods', 'GET, POST');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 请求（预检请求）
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // 处理 POST 请求
  if (req.method === 'POST') {
    try {
      const { question } = await req.json();

      // 调用 Gemini API 或处理逻辑
      const answer = await callGeminiAPI(question);
      
      return new Response(JSON.stringify({ answer }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response("Invalid request", { status: 400 });
    }
  }

  // 处理不支持的方法
  return new Response("Method Not Allowed", { status: 405 });
};

// 示例函数，用于模拟调用 Gemini API
const callGeminiAPI = async (question: string) => {
  // 在此处替换为实际的 Gemini API 调用逻辑
  // 这里只是一个示例，返回固定的答案
  return `这是您问题 "${question}" 的回答！`;
};

// 启动服务器并监听请求
serve(handleRequest);
