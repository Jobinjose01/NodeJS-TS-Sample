import request from 'supertest';
import app from '../app';

describe('User Registration', () => {
  it('should register a user successfully', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe_${Math.floor(Math.random() * 10000)}@example.com`,
      phone: '1234567890',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/v1/user/register')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      message: 'User created successfully',
      result: expect.objectContaining({
        firstName: 'John'
      })
    });
  });
});

describe('User Registration', () => {
    it('should fail to register a user with an existing email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe_${Math.floor(Math.random() * 10000)}@example.com`,
        phone: '1234567890',
        password: 'password123'
      };
  
      await request(app).post('/api/v1/user/register').send(userData).expect(201);
  
      const response = await request(app)
        .post('/api/v1/user/register')
        .send(userData)
        .expect(400);
  
      expect(response.body).toMatchObject({
        "status": "fail",
        "errors": [
          {
            "field": "email",
            "message": "Email is already in use",
            "location": "body"
          }
        ]
      });
    });
  });
  
