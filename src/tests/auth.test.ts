import request from 'supertest';
import { Repository } from 'typeorm';
import { AppDataSource } from '../databases/data-source';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../entities/users.entity';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import App from '../app';
import AuthRoute from '../routes/auth.route';
import { verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userRepository: Repository<User>;
  let app: App;
  let server: any;

  beforeEach(async () => {
    userRepository = AppDataSource.getRepository(User);
    authService = new AuthService();
    authController = new AuthController();
    app = new App([new AuthRoute()]);
  });

  afterEach(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    jest.resetAllMocks();
  });

  describe('POST /signup', () => {
    const signupDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should create a new user', async () => {
      // Mock repository methods
      const mockUser = { id: 1, ...signupDto } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

      // Make request
      server = app.listen();
      const response = await request(app.app)
        .post('/auth/signup')
        .send(signupDto);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.email).toBe(signupDto.email);
      expect(response.body).toHaveProperty('message', 'signup');
    });

    it('should return 409 if email already exists', async () => {
      // Mock repository to return existing user
      const existingUser = { id: 1, ...signupDto } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser);

      // Make request
      server = app.listen();
      const response = await request(app.app)
        .post('/auth/signup')
        .send(signupDto);

      // Assertions
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should login successfully and return cookie', async () => {
      // Mock bcrypt compare
      (compare as jest.Mock).mockResolvedValue(true);
      
      // Create a user first
      const mockUser = { id: 1, ...loginDto } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(authService as any, 'createToken').mockReturnValue({ token: 'mock-token' });
      jest.spyOn(authService as any, 'createCookie').mockReturnValue('Authorization=mock-token');

      // Make request
      server = app.listen();
      const response = await request(app.app)
        .post('/auth/login')
        .send(loginDto);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty('set-cookie');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.email).toBe(loginDto.email);
    });

    it('should return 409 for invalid credentials', async () => {
      // Mock repository methods
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      // Make request
      server = app.listen();
      const response = await request(app.app)
        .post('/auth/login')
        .send(loginDto);

      // Assertions
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /logout', () => {
    it('should logout successfully', async () => {
      // Mock JWT verify
      const mockUser = { id: 1, email: 'test@example.com' } as User;
      (verify as jest.Mock).mockResolvedValue({ id: mockUser.id });
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      // Make request
      server = app.listen();
      const response = await request(app.app)
        .post('/auth/logout')
        .set('Authorization', 'Bearer mock-token');

      // Assertions
      expect(response.status).toBe(200);
      expect(response.headers['set-cookie'][0]).toMatch(/^Authorization=\; Max-age=0/);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message', 'logout');
    });

    it('should return 401 for unauthorized request', async () => {
      // Make request without auth token
      server = app.listen();
      const response = await request(app.app)
        .post('/auth/logout');

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
