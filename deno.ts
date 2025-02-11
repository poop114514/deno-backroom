import { serve } from "https://deno.land/std/http/server.ts";

const API_KEY = "AIzaSyAlD9wkqIvLbtY3-d8o1ztxxGhQze_DyaA"; // 替换为你的 API 密钥

// 处理请求
const handleRequest = async (req: Request) => {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*'); // 允许所有来源
    headers.set('Access-Control-Allow-Methods', 'POST');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // 如果是预检请求（CORS），直接返回
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    // 处理 POST 请求
    if (req.method === 'POST') {
        try {
            const { question } = await req.json();

            // 调用 Gemini API 或其他外部服务
            const answer = await callGeminiAPI(question);
            
            return new Response(JSON.stringify({ answer }), {
                headers: { "Content-Type": "application/json" }
            });
        } catch (error) {
            return new Response("Invalid request", { status: 400 });
        }
    }

    return new Response("Method Not Allowed", { status: 405 });
};

// 模拟调用 Gemini API（请替换为实际调用）
const callGeminiAPI = async (question: string) => {
    // 模拟外部 API 的调用，可以替换为实际的 API 调用代码
    return `这是您问题 "${question}" 的回答！`;
};

// 启动服务器并监听请求
serve(handleRequest);
