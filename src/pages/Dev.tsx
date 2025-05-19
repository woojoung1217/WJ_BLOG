import { Typography, Box, Card, CardContent, CardActions, Button } from "@mui/material";

const Dev = () => {
  const posts = [
    {
      title: "React Hooks 사용하기",
      description: "React Hooks의 기본 개념과 사용법에 대해 알아봅니다.",
      date: "2024-03-20",
    },
    {
      title: "TypeScript 타입 시스템",
      description: "TypeScript의 타입 시스템에 대해 자세히 살펴봅니다.",
      date: "2024-03-18",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        개발 포스트
      </Typography>
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
        {posts.map((post, index) => (
          <Card key={index} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {post.date}
              </Typography>
              <Typography variant="body1">{post.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                자세히 보기
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dev;
