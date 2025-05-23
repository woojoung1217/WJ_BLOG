import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CardActions, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

const Dev = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/dev");
        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다.");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 에러가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/dev/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("포스트 삭제에 실패했습니다.");
      }

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("포스트 삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center", mt: 4 }}>
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1">
          개발 포스트
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("/dev/write")}>
          작성하기
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
        }}
      >
        {posts.map((post) => (
          <Card key={post.id}>
            {post.image && <CardMedia component="img" height="200" image={`http://localhost:3000${post.image}`} alt={post.title} />}
            <CardContent>
              <Typography variant="h6" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {post.date}
              </Typography>
              <Typography variant="body1">{post.content}</Typography>
            </CardContent>
            <CardActions>
              <IconButton size="small" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dev;
