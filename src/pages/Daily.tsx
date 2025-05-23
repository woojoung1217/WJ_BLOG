import { Typography, Paper, Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useState, useEffect } from "react";

interface DailyPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

const Daily = () => {
  const [posts, setPosts] = useState<DailyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://server-coral-two.vercel.app/daily");
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
      <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mt: 4 }}>
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        일상 이야기
      </Typography>
      <Paper elevation={3}>
        <List>
          {posts.map((post, index) => (
            <Box key={post.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={post.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {post.date}
                      </Typography>
                      {" — "}
                      {post.content}
                    </>
                  }
                />
              </ListItem>
              {index < posts.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Daily;
