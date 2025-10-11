import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
import langsRouter from './routes/langsRoutes'

dotenv.config();
const app = express()
const PORT = process.env.PORT

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}))

app.use('/api', langsRouter)

app.listen(PORT, () => {
  console.log('Server is run on port http://localhost:' + PORT)
})