import { Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "daily" | "dev";
  image?: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://server-coral-two.vercel.app/posts");
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
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        최근 포스트
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {posts.map((post, index) => (
          <Box key={post.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                py: 2,
                transition: "background-color 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <ListItemAvatar>
                {post.image ? (
                  <Avatar
                    variant="rounded"
                    src={`http://localhost:3000${post.image}`}
                    alt={post.title}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                ) : (
                  <Avatar variant="rounded" sx={{ width: 80, height: 80, mr: 2 }}>
                    <ImageIcon />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Typography variant="h6" component="span">
                      {post.title}
                    </Typography>
                    <Chip
                      label={post.type === "daily" ? "일상" : "개발"}
                      size="small"
                      color={post.type === "daily" ? "primary" : "secondary"}
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mb: 1,
                      }}
                    >
                      {post.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < posts.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Home;
