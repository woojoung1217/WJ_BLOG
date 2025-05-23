import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useNavigate } from "react-router-dom";

const DevWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", new Date().toISOString().split("T")[0]);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch("http://localhost:3000/dev", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("포스트 생성에 실패했습니다.");
      }

      navigate("/dev");
    } catch (error) {
      console.error("Error:", error);
      alert("포스트 생성에 실패했습니다.");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        개발 포스트 작성
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="제목" value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" required />
          <TextField
            fullWidth
            label="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <input accept="image/*" style={{ display: "none" }} id="image-upload" type="file" onChange={handleImageChange} />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                이미지 업로드
              </Button>
            </label>
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => navigate("/dev")}>
              취소
            </Button>
            <Button type="submit" variant="contained" color="primary">
              작성하기
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default DevWrite;
