mport { serve } from "https://deno.land/std/http/server.ts";
import { parse } from "https://deno.land/std/encoding/json.ts";

const API_KEY = "AIzaSyD8MUNhsbpLb1YHRBB6ah2hQjbqln-QKS0"; // 你的 Gemini API 密钥

const handleRequest = async (req: Request) => {
  if (req.method === "POST") {
    const { headers, body } = req;

    // 检查 API 密钥
    const authHeader = headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 解析请求的 JSON 数据
    const { question } = await parse(body);

    // 在此模拟与 Gemini API 的交互
    const answer = await callGeminiAPI(question);

    // 返回结果
    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("Method Not Allowed", { status: 405 });
};

const callGeminiAPI = async (question: string) => {
  // 此处模拟调用 Gemini API，您可以根据实际 API 接口进行请求
  // 假设调用返回了一个简答的回答
  return `这是您问题 "${question}" 的回答！`;
};

serve(handleRequest);
