import server from './shared/infrastructure/config/server';

const PORT: number | string = 3000 || process.env.PORT_SERVER;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
