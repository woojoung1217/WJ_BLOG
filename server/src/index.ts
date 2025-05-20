import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use(cors());

app.use(express.json());

// 타입 정의
interface DailyPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface DailyData {
  posts: DailyPost[];
}

// JSON 파일 경로
const dataPath = path.join(__dirname, "data", "daily.json");

// JSON 파일 읽기 함수
const readData = (): DailyData => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return { posts: [] };
  }
};

// JSON 파일 쓰기 함수
const writeData = (data: DailyData): void => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the WJBLOG" });
});

// 모든 일상 조회
app.get("/daily", (req, res) => {
  const data = readData();
  res.json(data.posts);
});

// 특정 일상 조회
app.get("/daily/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const post = data.posts.find((p: DailyPost) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "일상을 찾을 수 없습니다." });
  }

  res.json(post);
});

// 새로운 일상 생성
app.post("/daily", (req, res) => {
  const { title, content, date } = req.body;
  const data = readData();

  const newPost: DailyPost = {
    id: Date.now().toString(),
    title,
    content,
    date: date || new Date().toISOString().split("T")[0],
  };

  data.posts.unshift(newPost);
  writeData(data);

  res.status(201).json(newPost);
});

// 일상 수정
app.put("/daily/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, date } = req.body;
  const data = readData();

  const postIndex = data.posts.findIndex((p: DailyPost) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "일상을 찾을 수 없습니다." });
  }

  data.posts[postIndex] = {
    ...data.posts[postIndex],
    title: title || data.posts[postIndex].title,
    content: content || data.posts[postIndex].content,
    date: date || data.posts[postIndex].date,
  };

  writeData(data);
  res.json(data.posts[postIndex]);
});

// 일상 삭제
app.delete("/daily/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();

  const postIndex = data.posts.findIndex((p: DailyPost) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "일상을 찾을 수 없습니다." });
  }

  data.posts.splice(postIndex, 1);
  writeData(data);

  res.json({ message: "일상이 삭제되었습니다." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
