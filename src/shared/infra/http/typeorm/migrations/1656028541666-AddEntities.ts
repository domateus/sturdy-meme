import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddEntities1656028541666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "wallets",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "balance",
            type: "numeric",
          },
          {
            name: "commercial_infoId",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "commercial_infos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "walletId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "CommercialInfoWallet",
            columnNames: ["walletId"],
            referencedTableName: "wallets",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "wallets",
      new TableForeignKey({
        name: "WalletCommercialInfo",
        columnNames: ["commercial_infoId"],
        referencedTableName: "commercial_infos",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "fromId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "toId",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "TransactionFrom",
            columnNames: ["fromId"],
            referencedTableName: "wallets",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "TransactionTo",
            columnNames: ["toId"],
            referencedTableName: "wallets",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );

    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "commercial_infoId",
        type: "uuid",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        name: "CommercialInfoUser",
        columnNames: ["commercial_infoId"],
        referencedTableName: "commercial_infos",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.addColumn(
      "events",
      new TableColumn({ name: "promoterId", type: "uuid" })
    );

    await queryRunner.createForeignKey(
      "events",
      new TableForeignKey({
        name: "EventUser",
        columnNames: ["promoterId"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.addColumns("ticket", [
      new TableColumn({
        name: "number",
        type: "varchar",
      }),
      new TableColumn({
        name: "price",
        type: "numeric",
      }),
      new TableColumn({
        name: "type",
        type: "varchar",
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: "transaction_item",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "transactionId",
            type: "uuid",
          },
          {
            name: "item",
            type: "varchar",
          },
          {
            name: "entity",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "TransactionItemTransaction",
            columnNames: ["transactionId"],
            referencedTableName: "transactions",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "transaction_item",
      "TransactionItemTransaction"
    );
    await queryRunner.dropTable("transaction_item");
    await queryRunner.dropColumns("ticket", ["number", "price", "type"]);
    await queryRunner.dropForeignKey("events", "EventUser");
    await queryRunner.dropColumn("events", "promoterId");
    await queryRunner.dropForeignKey("users", "CommercialInfoUser");
    await queryRunner.dropColumn("users", "commercial_infoId");
    await queryRunner.dropTable("transactions");
    await queryRunner.dropForeignKey("wallets", "WalletCommercialInfo");
    await queryRunner.dropTable("commercial_infos");
    await queryRunner.dropTable("wallets");
  }
}
