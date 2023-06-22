import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Search1686475440765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
              new Table({
                name: 'search_table',
                columns: [
                  {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                  },
                  {
                    name: 'entityId',
                    type: 'uuid',
                    isNullable: true, 
                  },
                  {
                    name: 'entityName',
                    type: 'varchar',
                  },
                  {
                    name: 'vector',
                    type: 'tsvector',
                  },
                ],
              })
            );
            await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_search_vector()
            RETURNS TRIGGER AS $$
            DECLARE
              entityId uuid;
            BEGIN
              IF NEW.blog_id IS NOT NULL THEN
                entityId := NEW.blog_id;
              ELSIF NEW.level_id IS NOT NULL THEN
                entityId := NEW.level_id;
              ELSIF NEW.content_id IS NOT NULL THEN
                entityId := NEW.content_id;
              ELSIF NEW.subject_id IS NOT NULL THEN
                entityId := NEW.subject_id;
              ELSE
                entityId := NEW.id;
              END IF;
              INSERT INTO search_table ("entityName", "entityId", vector) VALUES
                (
                  TG_TABLE_NAME,
                  entityId,
                  setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A')
                );
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
          `);
        
            const entities = ['Blog', 'Content', 'Forum', 'Subjects']; // Add your entity names here
        
            for (const entity of entities) {
              await queryRunner.query(`
                CREATE OR REPLACE TRIGGER update_search_vector_trigger
                AFTER INSERT OR UPDATE ON ${entity.toLowerCase()}
                FOR EACH ROW
                EXECUTE FUNCTION update_search_vector();
              `);
            }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('search');
    }

}
