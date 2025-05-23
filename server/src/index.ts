import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import multer from "multer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use(cors());

app.use(express.json());

// 이미지 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 정적 파일 제공
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 타입 정의
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "daily" | "dev";
  image?: string;
}

interface PostData {
  posts: Post[];
}

// JSON 파일 경로
const dailyDataPath = path.join(__dirname, "data", "daily.json");
const devDataPath = path.join(__dirname, "data", "dev.json");

// JSON 파일 읽기 함수
const readData = (filePath: string): PostData => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return { posts: [] };
  }
};

// JSON 파일 쓰기 함수
const writeData = (filePath: string, data: PostData): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the WJBLOG" });
});

// 모든 일상 조회
app.get("/daily", (req, res) => {
  const data = readData(dailyDataPath);
  res.json(data.posts);
});

// 모든 개발 포스트 조회
app.get("/dev", (req, res) => {
  const data = readData(devDataPath);
  res.json(data.posts);
});

// 모든 포스트 조회 (일상 + 개발)
app.get("/posts", (req, res) => {
  const dailyData = readData(dailyDataPath);
  const devData = readData(devDataPath);

  const allPosts = [
    ...dailyData.posts.map((post) => ({ ...post, type: "daily" as const })),
    ...devData.posts.map((post) => ({ ...post, type: "dev" as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  res.json(allPosts);
});

// 새로운 일상 생성
app.post("/daily", upload.single("image"), (req, res) => {
  const { title, content, date } = req.body;
  const data = readData(dailyDataPath);

  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    date: date || new Date().toISOString().split("T")[0],
    type: "daily",
    image: req.file ? `/uploads/${req.file.filename}` : undefined,
  };

  data.posts.unshift(newPost);
  writeData(dailyDataPath, data);

  res.status(201).json(newPost);
});

// 새로운 개발 포스트 생성
app.post("/dev", upload.single("image"), (req, res) => {
  const { title, content, date } = req.body;
  const data = readData(devDataPath);

  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    date: date || new Date().toISOString().split("T")[0],
    type: "dev",
    image: req.file ? `/uploads/${req.file.filename}` : undefined,
  };

  data.posts.unshift(newPost);
  writeData(devDataPath, data);

  res.status(201).json(newPost);
});

// 일상 수정
app.put("/daily/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, date } = req.body;
  const data = readData(dailyDataPath);

  const postIndex = data.posts.findIndex((p: Post) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "일상을 찾을 수 없습니다." });
  }

  data.posts[postIndex] = {
    ...data.posts[postIndex],
    title: title || data.posts[postIndex].title,
    content: content || data.posts[postIndex].content,
    date: date || data.posts[postIndex].date,
  };

  writeData(dailyDataPath, data);
  res.json(data.posts[postIndex]);
});

// 개발 포스트 수정
app.put("/dev/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, date } = req.body;
  const data = readData(devDataPath);

  const postIndex = data.posts.findIndex((p: Post) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "개발 포스트를 찾을 수 없습니다." });
  }

  data.posts[postIndex] = {
    ...data.posts[postIndex],
    title: title || data.posts[postIndex].title,
    content: content || data.posts[postIndex].content,
    date: date || data.posts[postIndex].date,
  };

  writeData(devDataPath, data);
  res.json(data.posts[postIndex]);
});

// 일상 삭제
app.delete("/daily/:id", (req, res) => {
  const { id } = req.params;
  const data = readData(dailyDataPath);

  const postIndex = data.posts.findIndex((p: Post) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "일상을 찾을 수 없습니다." });
  }

  data.posts.splice(postIndex, 1);
  writeData(dailyDataPath, data);

  res.json({ message: "일상이 삭제되었습니다." });
});

// 개발 포스트 삭제
app.delete("/dev/:id", (req, res) => {
  const { id } = req.params;
  const data = readData(devDataPath);

  const postIndex = data.posts.findIndex((p: Post) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "개발 포스트를 찾을 수 없습니다." });
  }

  data.posts.splice(postIndex, 1);
  writeData(devDataPath, data);

  res.json({ message: "개발 포스트가 삭제되었습니다." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
