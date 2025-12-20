// Mock AppDataSource BEFORE any imports that use it
// This ensures BonusService uses the test database
// The test database is initialized in jest-setup.ts's beforeAll hook
jest.mock('../../data-source', () => {
  const { TestDataSource } = require('../test-data-source');
  
  // Return the test data source
  // It will be initialized by jest-setup.ts before tests run
  // Note: This might throw if accessed before initialization, but that's OK
  // because jest-setup.ts initializes it first
  return {
    AppDataSource: TestDataSource,
  };
});

// Mock Keycloak authentication
jest.mock('../../middleware/keycloakAuth', () => ({
  authenticateKeycloak: require('../mocks/keycloakAuth').mockAuthenticateKeycloak,
}));

import request from 'supertest';
import { DataSource } from 'typeorm';
import { getTestDataSource, cleanDatabase } from '../test-setup';
import { Bonus, BonusType, BonusCategory } from '../../entities/Bonus';
import express from 'express';
import cors from 'cors';
import { errorHandler } from '../../middleware/errorHandler';
import { notFoundHandler } from '../../middleware/notFound';
import bonusesRouter from '../../routes/bonuses';

describe('Bonuses Integration Tests', () => {
  let app: express.Application;
  let testDataSource: DataSource;
  let testBonus1: Bonus;
  let testBonus2: Bonus;

  beforeAll(async () => {
    testDataSource = getTestDataSource();
    
    // Create test app
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/bonuses', bonusesRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  beforeEach(async () => {
    await cleanDatabase();

    // Create test bonuses
    const bonusRepository = testDataSource.getRepository(Bonus);
    
    testBonus1 = bonusRepository.create({
      title: 'Welcome Bonus',
      description: 'Welcome bonus for new users',
      amount: '100',
      type: BonusType.WELCOME,
      category: BonusCategory.WELCOME,
      isActive: true,
      terms: 'Terms and conditions apply',
      icon: 'gift-icon',
      color: '#FF5733',
    });

    testBonus2 = bonusRepository.create({
      title: 'VIP Cashback',
      description: 'VIP cashback bonus',
      amount: '500',
      type: BonusType.VIP_CASHBACK,
      category: BonusCategory.VIP,
      isActive: false,
      terms: 'VIP members only',
      icon: 'vip-icon',
      color: '#33FF57',
    });

    await bonusRepository.save([testBonus1, testBonus2]);
  });

  describe('GET /api/bonuses', () => {
    it('should return all bonuses', async () => {
      const response = await request(app)
        .get('/api/bonuses')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('amount');
      expect(response.body[0]).toHaveProperty('type');
      expect(response.body[0]).toHaveProperty('category');
      expect(response.body[0]).toHaveProperty('isActive');
    });

    it('should return bonuses in correct format', async () => {
      const response = await request(app)
        .get('/api/bonuses')
        .expect(200);

      const bonus = response.body[0];
      expect(bonus).toMatchObject({
        title: expect.any(String),
        description: expect.any(String),
        amount: expect.any(String),
        type: expect.any(String),
        category: expect.any(String),
        isActive: expect.any(Boolean),
        terms: expect.any(String),
        icon: expect.any(String),
        color: expect.any(String),
      });
    });
  });

  describe('GET /api/bonuses/:id', () => {
    it('should return a bonus by ID', async () => {
      const response = await request(app)
        .get(`/api/bonuses/${testBonus1.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testBonus1.id,
        title: testBonus1.title,
        description: testBonus1.description,
        amount: testBonus1.amount,
        type: testBonus1.type,
        category: testBonus1.category,
        isActive: testBonus1.isActive,
      });
    });

    it('should return 404 for non-existent bonus', async () => {
      const response = await request(app)
        .get('/api/bonuses/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/bonuses/invalid')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/bonuses/:id/claim', () => {
    it('should successfully claim an active bonus', async () => {
      const response = await request(app)
        .post(`/api/bonuses/${testBonus1.id}/claim`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Bonus claimed successfully',
        bonus: expect.objectContaining({
          id: testBonus1.id,
          title: testBonus1.title,
        }),
      });
    });

    it('should return 404 for non-existent bonus', async () => {
      const response = await request(app)
        .post('/api/bonuses/99999/claim')
        .set('Authorization', 'Bearer mock-token')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 for invalid ID format', async () => {
      const response = await request(app)
        .post('/api/bonuses/invalid/claim')
        .set('Authorization', 'Bearer mock-token')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});
