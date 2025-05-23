import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Chip, Button, CircularProgress, Container, ImageList, ImageListItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "daily" | "dev";
  images?: string[];
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://server-coral-two.vercel.app/posts/${id}`);
        if (!response.ok) {
          throw new Error("게시글을 찾을 수 없습니다.");
        }
        const data = await response.json();
        setPost(data);

        // 이미지 존재 여부 확인
        if (data.images) {
          const validImages = await Promise.all(
            data.images.map(async (image: string) => {
              try {
                const response = await fetch(`https://server-coral-two.vercel.app${image}`);
                return response.ok ? image : null;
              } catch {
                return null;
              }
            })
          );
          setLoadedImages(validImages.filter((img): img is string => img !== null));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 에러가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const renderContent = (content: string) => {
    const parts = content.split(/(\[이미지:.*?\])/);
    return parts.map((part, index) => {
      if (part.startsWith("[이미지:")) {
        const imageName = part.slice(7, -1);
        return (
          <Box
            key={index}
            sx={{
              my: 4,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={`https://server-coral-two.vercel.app/uploads/${imageName.toLowerCase().replace(/\s+/g, "")}.jpg`}
              alt={imageName}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 1,
                color: "text.secondary",
              }}
            >
              {imageName}
            </Typography>
          </Box>
        );
      }
      return (
        <Typography
          key={index}
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
            fontSize: "1.1rem",
            color: "text.primary",
            "& p": {
              mb: 2,
            },
            "& pre": {
              backgroundColor: "grey.100",
              p: 2,
              borderRadius: 1,
              overflowX: "auto",
              my: 2,
            },
            "& code": {
              fontFamily: "monospace",
            },
          }}
        >
          {part}
        </Typography>
      );
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error" variant="h6" gutterBottom>
          {error || "게시글을 찾을 수 없습니다."}
        </Typography>
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          돌아가기
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        목록으로
      </Button>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          backgroundColor: "background.paper",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Chip
              label={post.type === "daily" ? "일상" : "개발"}
              color={post.type === "daily" ? "primary" : "secondary"}
              sx={{ fontWeight: 500 }}
            />
            <Typography variant="body2" color="text.secondary">
              {post.date}
            </Typography>
          </Box>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>
        </Box>

        {loadedImages.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <ImageList
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              cols={1}
              rowHeight={400}
            >
              {loadedImages.map((image, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    width: "100%",
                    height: "auto !important",
                    marginBottom: 2,
                  }}
                >
                  <img
                    src={`https://server-coral-two.vercel.app${image}`}
                    alt={`${post.title} - 이미지 ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}

        {renderContent(post.content)}
      </Paper>
    </Container>
  );
};

export default PostDetail;
