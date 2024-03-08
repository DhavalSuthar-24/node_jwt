const corsOptions = {
    origin: 'http://localhost:4200' // Replace with your frontend's origin
  };
  
  const corsMiddleware = cors(corsOptions);
  