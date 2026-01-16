module.exports = {
  studentsApi: {
    input: 'http://localhost:5000/doc', // The URL from your Hono app
    output: {
      mode: 'tags-split',
      target: './api/generated/students.ts',
      schemas: './api/generated/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './api/axios-client.ts',
          name: 'customInstance',
        },
      },
    },
  },
};