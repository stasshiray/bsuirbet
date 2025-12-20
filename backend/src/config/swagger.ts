import swaggerJsdoc from 'swagger-jsdoc';

// Keycloak configuration
const keycloakUrl = process.env.KEYCLOAK_URL || 'http://localhost:4000';
const realm = process.env.KEYCLOAK_REALM || 'bsuirbet';
const keycloakIssuer = `${keycloakUrl}/realms/${realm}`;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'BSUIRBet API',
    version: '1.0.0',
    description: 'API documentation for BSUIRBet application',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3001}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      keycloak: {
        type: 'oauth2',
        description: 'Keycloak OAuth2 authentication',
        flows: {
          authorizationCode: {
            authorizationUrl: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`,
            tokenUrl: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
            scopes: {
              openid: 'OpenID Connect scope',
              profile: 'User profile information',
              email: 'User email address',
            },
          },
          implicit: {
            authorizationUrl: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`,
            scopes: {
              openid: 'OpenID Connect scope',
              profile: 'User profile information',
              email: 'User email address',
            },
          },
        },
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token from Keycloak (Bearer token)',
      },
    },
    schemas: {
      Bonus: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Bonus ID',
          },
          title: {
            type: 'string',
            description: 'Bonus title',
          },
          description: {
            type: 'string',
            description: 'Bonus description',
          },
          amount: {
            type: 'string',
            description: 'Bonus amount',
          },
          type: {
            type: 'string',
            enum: ['welcome', 'no-deposit', 'first-deposit', 'vip-welcome', 'vip-cashback', 'vip-birthday', 'daily-cashback', 'daily-spins', 'weekend'],
            description: 'Bonus type',
          },
          category: {
            type: 'string',
            enum: ['welcome', 'vip', 'daily'],
            description: 'Bonus category',
          },
          isActive: {
            type: 'boolean',
            description: 'Whether the bonus is active',
          },
          terms: {
            type: 'string',
            description: 'Bonus terms and conditions',
          },
          icon: {
            type: 'string',
            description: 'Bonus icon URL',
          },
          color: {
            type: 'string',
            description: 'Bonus color code',
          },
          additionalProperties: {
            type: 'object',
            nullable: true,
            description: 'Additional bonus properties',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
          },
        },
      },
      Game: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Game ID',
          },
          title: {
            type: 'string',
            description: 'Game title',
          },
          category: {
            type: 'string',
            description: 'Game category',
          },
          image: {
            type: 'string',
            description: 'Game image URL',
          },
          jackpot: {
            type: 'string',
            nullable: true,
            description: 'Jackpot amount',
          },
          isHot: {
            type: 'boolean',
            description: 'Whether the game is hot/popular',
          },
          providerId: {
            type: 'string',
            description: 'Provider ID',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints',
    },
    {
      name: 'Games',
      description: 'Game management endpoints',
    },
    {
      name: 'Tournaments',
      description: 'Tournament management endpoints',
    },
    {
      name: 'Bonuses',
      description: 'Bonus management endpoints',
    },
    {
      name: 'Providers',
      description: 'Provider management endpoints',
    },
    {
      name: 'Jackpots',
      description: 'Jackpot management endpoints',
    },
    {
      name: 'Categories',
      description: 'Category management endpoints',
    },
    {
      name: 'Translations',
      description: 'Translation management endpoints',
    },
  ],
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);

