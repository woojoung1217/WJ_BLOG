import { Typography, Paper, Box, List, ListItem, ListItemText, Divider } from "@mui/material";

const Daily = () => {
  const posts = [
    {
      title: "오늘의 일상",
      date: "2024-03-20",
      content: "오늘은 좋은 날씨였다...",
    },
    {
      title: "주말 이야기",
      date: "2024-03-18",
      content: "주말에 가족들과 함께...",
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        일상 이야기
      </Typography>
      <Paper elevation={3}>
        <List>
          {posts.map((post, index) => (
            <Box key={index}>
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
