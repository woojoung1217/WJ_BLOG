import { Typography, Box, Card, CardContent, CardMedia, Chip } from "@mui/material";
import { useState, useEffect } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "daily" | "dev";
  image?: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
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
      <Typography variant="h4" component="h1" gutterBottom>
        최근 포스트
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            {post.image && (
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:3000${post.image}`}
                alt={post.title}
                sx={{ objectFit: "cover" }}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Chip
                  label={post.type === "daily" ? "일상" : "개발"}
                  size="small"
                  color={post.type === "daily" ? "primary" : "secondary"}
                />
                <Typography variant="body2" color="text.secondary">
                  {post.date}
                </Typography>
              </Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
