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
  
  describe('User Get By ID', () => {
    it('should fetch a user successfully', async () => {
  
      const response = await request(app)
        .get('/api/v1/user/6')
        .expect(200);
  
      expect(response.body).toMatchObject({       
        result: expect.objectContaining({
          id: 6
        })
      });
    });
  });
  describe('User Get By ID', () => {
    it('Failed User fetch ', async () => {
  
      const response = await request(app)
        .get('/api/v1/user/600')
        .expect(404);
  
      expect(response.body).toMatchObject({       
        message: 'User not found',
      });
    });
  });

  describe('User Update', () => {
    it('Update User record ', async () => {
      
      const userData = {
        firstName: 'Jobin',
        lastName: 'Jose',
        email: 'jobin6@gmail.com',
        phone: '1234567890',
        password: 'password123'
      };

      const response = await request(app)
        .put('/api/v1/user/6')
        .send(userData)
        .expect(200);
  
        expect(response.body).toMatchObject({
          message: 'User updated successfully',
          result: expect.objectContaining({
            firstName: 'Jobin'
          })
        });
    });

    it('Failed User Update ', async () => {
      
      const userData = {
        firstName: 'Jobin',
        lastName: 'Jose',
        email: 'jobin600@gmail.com',
        phone: '1234567890',
        password: 'password123'
      };

      const response = await request(app)
        .put('/api/v1/user/600')
        .send(userData)
        .expect(500);
  
        expect(response.body).toMatchObject({
          status: 'error',
          message: "Record Not found!"
        });
    });
  });