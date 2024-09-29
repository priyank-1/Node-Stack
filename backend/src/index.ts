import  express  from "express";
import http from 'http';
import morgan from "morgan";
import db from "./modules/db";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import cors from 'cors';




const app = express();
const origins = [
    "http://192.168.144.83:3000",
    "http://192.168.153.83:3000",
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
];
app.use(cors({
    origin: origins,
    credentials: true,
}));
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    const submissions = await db.newSubmission.findMany();
    res.json(submissions)
});

const startServer = async () =>{

    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs : schema,
        resolvers : resolvers,
        csrfPrevention : true,
        cache :'bounded',
        context: async ({ req }) => ({ token: req.headers.token }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({embed : true}),
        ]
    })
    await server.start();
    server.applyMiddleware({ app });
    const port = Number(process.env.PORT || 5000)
    await new Promise<void>((resolve) => httpServer.listen({ host :'0.0.0.0' ,port: port , }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startServer();


// app.listen(port,'0.0.0.0',()=>{
//     console.log(`Server is running on  http://localhost:${port}`)
// });