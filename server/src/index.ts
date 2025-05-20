import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// 일상 관련 라우트
// 모든 일상 조회
app.get("/daily", (req, res) => {
  // TODO: 데이터베이스에서 일상 데이터 조회
  res.json({ message: "모든 일상 조회" });
});

// 특정 일상 조회
app.get("/daily/:id", (req, res) => {
  const { id } = req.params;
  // TODO: 특정 ID의 일상 데이터 조회
  res.json({ message: `ID ${id}의 일상 조회` });
});

// 새로운 일상 생성
app.post("/daily", (req, res) => {
  const { title, content, date } = req.body;
  // TODO: 새로운 일상 데이터 저장
  res.json({ message: "새로운 일상이 생성되었습니다", data: { title, content, date } });
});

// 일상 수정
app.put("/daily/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, date } = req.body;
  // TODO: 기존 일상 데이터 수정
  res.json({ message: `ID ${id}의 일상이 수정되었습니다`, data: { title, content, date } });
});

// 일상 삭제
app.delete("/daily/:id", (req, res) => {
  const { id } = req.params;
  // TODO: 일상 데이터 삭제
  res.json({ message: `ID ${id}의 일상이 삭제되었습니다` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
