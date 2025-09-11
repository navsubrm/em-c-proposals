PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE IF NOT EXISTS "proposals"(
  "_id" TEXT NOT NULL PRIMARY KEY,
  "first_name" TEXT,
  "last_name" TEXT,
  "email" TEXT,
  "position" TEXT,
  "organization" TEXT,
  "cost_savings" INTEGER,
  "time_savings" INTEGER,
  "title" TEXT,
  "system" TEXT,
  "type" TEXT,
  "category" TEXT,
  "priority" TEXT,
  "problem_statement" TEXT,
  "change_statement" TEXT,
  "mission_impact" TEXT,
  "other_considerations" TEXT,
  "date_filed" TEXT,
  "date_approved" TEXT,
  "status" TEXT,
  "projected_pi" INTEGER,
  "completed_pi" INTEGER);


-- this command will push the .sql file to the remote database.  It also pushes queries.
-- npx wrangler d1 execute  emc_planning --file=./schema.sql --remote

-- This command pushes the new database locally.
-- npx wrangler d1 execute DB --file=./schema.sql --local 

-- This fetches the schema from the remote database.
-- npx wrangler d1 export emc_planning --remote --output=./schema.sql --no-data