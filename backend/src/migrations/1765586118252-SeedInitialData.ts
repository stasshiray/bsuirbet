import type { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from "bcryptjs";
import { providers, games, liveGames, tournaments, bonuses } from "../data";

export class SeedInitialData1765586118252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Do not reseed if there are already users (assumes DB already initialized)
    const existingUsersResult = (await queryRunner.query(
      "SELECT COUNT(*)::int AS count FROM users"
    )) as Array<{ count: number | string }>;

    const existingUsers = Number(
      (existingUsersResult[0] && existingUsersResult[0].count) ?? 0
    );
    if (existingUsers > 0) {
      return;
    }

    // Create demo users
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const demoUsers = [
      {
        email: "admin@bsuirbet.com",
        username: "admin",
        password: hashedPassword,
        firstName: "Admin",
        lastName: "User",
        balance: 10000,
        isVerified: true,
      },
      {
        email: "player@bsuirbet.com",
        username: "player1",
        password: await bcrypt.hash("player123", 10),
        firstName: "John",
        lastName: "Doe",
        balance: 2500,
        isVerified: true,
      },
      {
        email: "demo@bsuirbet.com",
        username: "demo",
        password: await bcrypt.hash("demo123", 10),
        firstName: "Demo",
        lastName: "User",
        balance: 5000,
        isVerified: true,
      },
      {
        email: "test@bsuirbet.com",
        username: "test",
        password: await bcrypt.hash("test123", 10),
        firstName: "Test",
        lastName: "User",
        balance: 1000,
        isVerified: true,
      },
    ];

    for (const user of demoUsers) {
      await queryRunner.query(
        `INSERT INTO users (email, username, password, "firstName", "lastName", balance, "isVerified")
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          user.email,
          user.username,
          user.password,
          user.firstName,
          user.lastName,
          user.balance,
          user.isVerified,
        ]
      );
    }

    // Create providers
    for (const provider of providers) {
      await queryRunner.query(
        `INSERT INTO providers (id, name, logo, description, "isActive")
         VALUES ($1, $2, $3, $4, $5)`,
        [
          provider.id,
          provider.name,
          provider.logo,
          provider.description,
          provider.isActive,
        ]
      );
    }

    // Create games (regular + live)
    const allGames = [...games, ...liveGames];
    for (const game of allGames) {
      await queryRunner.query(
        `INSERT INTO games (id, title, category, image, jackpot, "isHot", "providerId")
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          game.id,
          game.title,
          game.category,
          game.image,
          game.jackpot ?? null,
          game.isHot,
          game.providerId,
        ]
      );
    }

    // Create jackpots for games that have jackpots
    const gamesWithJackpots = allGames.filter((game) => game.jackpot);
    for (const game of gamesWithJackpots) {
      await queryRunner.query(
        `INSERT INTO jackpots ("gameId", amount)
         VALUES ($1, $2)`,
        [game.id, game.jackpot as string]
      );
    }

    // Create tournaments
    for (const tournament of tournaments) {
      await queryRunner.query(
        `INSERT INTO tournaments (title, prize, participants, "maxParticipants", "startDate", "endDate", status, game, image)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          tournament.title,
          tournament.prize,
          tournament.participants,
          tournament.maxParticipants,
          tournament.startDate,
          tournament.endDate,
          tournament.status,
          tournament.game,
          tournament.image,
        ]
      );
    }

    // Create bonuses
    const baseFields = [
      "title",
      "description",
      "amount",
      "type",
      "category",
      "isActive",
      "terms",
      "icon",
      "color",
    ];

    for (const bonus of bonuses) {
      const { id, ...bonusData } = bonus as Record<string, unknown>;
      const additionalProps: Record<string, unknown> = {};

      Object.keys(bonusData).forEach((key) => {
        if (!baseFields.includes(key)) {
          additionalProps[key] = bonusData[key];
        }
      });

      await queryRunner.query(
        `INSERT INTO bonuses (title, description, amount, type, category, "isActive", terms, icon, color, "additionalProperties")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          bonus.title,
          bonus.description,
          bonus.amount,
          bonus.type,
          bonus.category,
          bonus.isActive,
          bonus.terms,
          bonus.icon,
          bonus.color,
          Object.keys(additionalProps).length > 0 ? additionalProps : null,
        ]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove dependent entities first to satisfy FK constraints
    await queryRunner.query("DELETE FROM bonus_claims");
    await queryRunner.query("DELETE FROM tournament_participants");
    await queryRunner.query("DELETE FROM jackpots");
    await queryRunner.query("DELETE FROM bonuses");
    await queryRunner.query("DELETE FROM tournaments");
    await queryRunner.query("DELETE FROM games");
    await queryRunner.query("DELETE FROM providers");

    // Remove only demo users we created
    await queryRunner.query(
      `DELETE FROM users
       WHERE email IN ($1, $2, $3, $4)`,
      [
        "admin@bsuirbet.com",
        "player@bsuirbet.com",
        "demo@bsuirbet.com",
        "test@bsuirbet.com",
      ]
    );
  }
}
