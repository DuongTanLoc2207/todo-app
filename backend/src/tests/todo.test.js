const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Todo = require('../models/Todo');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Todo.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/todos', () => {
  it('tạo thành công khi có title hợp lệ', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Học Node.js', description: 'Ôn tập Express' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: 'Học Node.js',
      description: 'Ôn tập Express',
      status: 'pending',
    });
    expect(res.body._id).toBeDefined();
  });

  it('trả về 400 khi title rỗng', async () => {
    const res = await request(app).post('/api/todos').send({ title: '' });

    expect(res.status).toBe(400);
  });

  it('trả về 400 khi title là số thay vì string', async () => {
    const res = await request(app).post('/api/todos').send({ title: 12345 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Tiêu đề phải là chuỗi ký tự');
  });

  it('trả về 400 khi title vượt quá 200 ký tự', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'a'.repeat(201) });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Tiêu đề không được vượt quá 200 ký tự');
  });

  it('trả về 400 khi description vượt quá 1000 ký tự', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Việc hợp lệ', description: 'a'.repeat(1001) });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Mô tả không được vượt quá 1000 ký tự');
  });
});

describe('GET /api/todos', () => {
  beforeEach(async () => {
    await Todo.create([
      { title: 'Mua sữa', status: 'pending' },
      { title: 'Dọn nhà', status: 'completed' },
      { title: 'Đọc sách', status: 'pending' },
    ]);
  });

  it('trả về danh sách đúng số lượng đã tạo', async () => {
    const res = await request(app).get('/api/todos');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.pagination.totalItems).toBe(3);
  });

  it('filter đúng theo status', async () => {
    const res = await request(app).get('/api/todos').query({ status: 'completed' });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Dọn nhà');
  });

  it('search đúng theo title (không phân biệt hoa/thường)', async () => {
    const res = await request(app).get('/api/todos').query({ search: 'mua sữa' });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Mua sữa');
  });
});

describe('PUT /api/todos/:id', () => {
  it('cập nhật thành công', async () => {
    const todo = await Todo.create({ title: 'Cũ' });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ title: 'Mới', description: 'Đã cập nhật' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Mới');
    expect(res.body.description).toBe('Đã cập nhật');
  });

  it('trả về 404 khi id không tồn tại', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/todos/${nonExistentId}`)
      .send({ title: 'Không tồn tại' });

    expect(res.status).toBe(404);
  });

  it('trả về 400 khi title rỗng', async () => {
    const todo = await Todo.create({ title: 'Cũ' });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ title: '' });

    expect(res.status).toBe(400);
  });

  it('trả về 400 khi title là số thay vì string', async () => {
    const todo = await Todo.create({ title: 'Cũ' });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ title: 999 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Tiêu đề phải là chuỗi ký tự');
  });

  it('trả về 400 khi id không đúng định dạng ObjectId', async () => {
    const res = await request(app)
      .put('/api/todos/abc123')
      .send({ title: 'Mới' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Id công việc không đúng định dạng');
  });

  it('trả về 400 khi title vượt quá 200 ký tự', async () => {
    const todo = await Todo.create({ title: 'Cũ' });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ title: 'a'.repeat(201) });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Tiêu đề không được vượt quá 200 ký tự');
  });

  it('trả về 400 khi description vượt quá 1000 ký tự', async () => {
    const todo = await Todo.create({ title: 'Cũ' });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ description: 'a'.repeat(1001) });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Mô tả không được vượt quá 1000 ký tự');
  });
});

describe('PATCH /api/todos/:id/status', () => {
  it('đổi status thành công', async () => {
    const todo = await Todo.create({ title: 'Việc cần làm' });

    const res = await request(app)
      .patch(`/api/todos/${todo._id}/status`)
      .send({ status: 'completed' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  it('trả về 400 khi status không hợp lệ', async () => {
    const todo = await Todo.create({ title: 'Việc cần làm' });

    const res = await request(app)
      .patch(`/api/todos/${todo._id}/status`)
      .send({ status: 'archived' });

    expect(res.status).toBe(400);
  });

  it('trả về 400 khi id không đúng định dạng ObjectId', async () => {
    const res = await request(app)
      .patch('/api/todos/abc123/status')
      .send({ status: 'completed' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Id công việc không đúng định dạng');
  });
});

describe('DELETE /api/todos/:id', () => {
  it('xóa thành công', async () => {
    const todo = await Todo.create({ title: 'Sẽ bị xóa' });

    const res = await request(app).delete(`/api/todos/${todo._id}`);

    expect(res.status).toBe(200);
    expect(await Todo.findById(todo._id)).toBeNull();
  });

  it('trả về 404 khi id không tồn tại', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const res = await request(app).delete(`/api/todos/${nonExistentId}`);

    expect(res.status).toBe(404);
  });

  it('trả về 400 khi id không đúng định dạng ObjectId', async () => {
    const res = await request(app).delete('/api/todos/abc123');

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Id công việc không đúng định dạng');
  });
});
