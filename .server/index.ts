import { serve } from '@hono/node-server'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
// --- 1. DATA STORAGE (In-Memory for Demo) ---
// Note: This resets on Vercel "Cold Starts", but is perfect for a demo/Edge runtime.
let students = [
  {
    id: '1',
    name: 'Alice Johnson test',
    email: 'alice.j@example.com',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
  },
  {
    id: '3',
    name: 'Charlie Davis',
    email: 'charlie.d@example.com',
  },
  {
    id: '4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
  },
  {
    id: '5',
    name: 'Evan Wright',
    email: 'evan.w@example.com',
  },
  {
    id: '6',
    name: 'Fiona Gallagher',
    email: 'fiona.g@example.com',
  },
  {
    id: '7',
    name: 'George Miller',
    email: 'george.m@example.com',
  },
  {
    id: '9',
    name: 'Ian Malcolm',
    email: 'ian.m@example.com',
  },
  {
    id: '10',
    name: 'Julia Roberts',
    email: 'julia.r@example.com',
  },
  {
    name: 'asdfasdfsfee',
    email: 'fdsafsd@fadfasdf.dfs',
    id: '1768745038157',
  },
  {
    name: 'afaasdfs',
    email: 'dfasd@fadsf.asdfasdf',
    id: '1768745261624',
  },
  {
    name: 'adsfasdf',
    email: 'fdasdfa@fasdf.dsfa',
    id: '1768750001921',
  },
  {
    name: 'hd1',
    email: 'hd@gmail.com',
    id: '1768825221699',
  },
  {
    name: 'jerry',
    email: 'jerry@gmail.com',
    id: '1768825332650',
  },
]
// --- 2. SCHEMAS ---
const StudentSchema = z
  .object({
    id: z.string().openapi({ example: '1' }),
    name: z.string().openapi({ example: 'John Doe' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
  })
  .openapi('Student')

const CreateStudentSchema = StudentSchema.omit({ id: true })

const ParamsSchema = z.object({
  id: z.string().openapi({ param: { name: 'id', in: 'path' }, example: '1' }),
})

// --- 3. APP SETUP ---
const api = new OpenAPIHono()

// Apply Middleware
api.use('*', cors())

// --- 4. CRUD ROUTES ---

// [READ ALL]
api.openapi(
  createRoute({
    method: 'get',
    path: '/students',
    tags: ['students'],
    operationId: 'getStudents',
    responses: {
      200: {
        content: { 'application/json': { schema: z.array(StudentSchema) } },
        description: 'Retrieve all students',
      },
    },
  }),
  (c) => c.json(students)
)

// [READ SINGLE]
api.openapi(
  createRoute({
    method: 'get',
    path: '/students/{id}',
    tags: ['students'],
    operationId: 'getStudentById',
    request: { params: ParamsSchema },
    responses: {
      200: { content: { 'application/json': { schema: StudentSchema } }, description: 'Found' },
      404: { description: 'Not found' },
    },
  }),
  (c) => {
    const { id } = c.req.valid('param')
    const student = students.find((s) => s.id === id)
    if (!student) return c.json({ message: 'Not found' }, 404)
    return c.json(student)
  }
)

// [CREATE]
api.openapi(
  createRoute({
    method: 'post',
    path: '/students',
    tags: ['students'],
    operationId: 'createStudent',
    request: { body: { content: { 'application/json': { schema: CreateStudentSchema } } } },
    responses: {
      201: { content: { 'application/json': { schema: StudentSchema } }, description: 'Created' },
    },
  }),
  async (c) => {
    const data = c.req.valid('json')
    const newStudent = { ...data, id: Date.now().toString() }
    students.push(newStudent)
    return c.json(newStudent, 201)
  }
)

// [UPDATE]
api.openapi(
  createRoute({
    method: 'put',
    path: '/students/{id}',
    tags: ['students'],
    operationId: 'updateStudent',
    request: {
      params: ParamsSchema,
      body: { content: { 'application/json': { schema: CreateStudentSchema } } },
    },
    responses: {
      200: { content: { 'application/json': { schema: StudentSchema } }, description: 'Updated' },
      404: { description: 'Not found' },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const data = c.req.valid('json')
    const index = students.findIndex((s) => s.id === id)
    if (index === -1) return c.json({ message: 'Not found' }, 404)

    students[index] = { ...students[index], ...data }
    return c.json(students[index])
  }
)

// [DELETE]
api.openapi(
  createRoute({
    method: 'delete',
    path: '/students/{id}',
    tags: ['students'],
    operationId: 'deleteStudent',
    request: { params: ParamsSchema },
    responses: {
      200: { description: 'Deleted' },
      404: { description: 'Not found' },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const initialLength = students.length
    students = students.filter((s) => s.id !== id)
    if (students.length === initialLength) return c.json({ message: 'Not found' }, 404)
    return c.json({ message: 'Deleted' })
  }
)

// --- 5. DOCUMENTATION ---
api.doc('/doc', {
  openapi: '3.0.0',
  info: { title: 'Student Management API', version: '1.0.0' },
})

api.get('/reference', Scalar({ url: '/doc' }))

// --- 6. EXPORTS & RUNTIME ---

// Local Development
if (process.env.NODE_ENV !== 'production') {
  const port = 5000
  console.log(`Server running on http://localhost:${port}`)
  console.log(`Swagger UI: http://localhost:${port}/reference`)
  serve({ fetch: api.fetch, port })
}

app.route("/", api);

export default app