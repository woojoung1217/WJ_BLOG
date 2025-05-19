import { Typography, Paper, Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          환영합니다
        </Typography>
        <Typography variant="body1" paragraph>
          제 블로그에 오신 것을 환영합니다. 여기서는 개발과 일상에 대한 이야기를 나눕니다.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
