PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE IF NOT EXISTS "proposals"(
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
  "completed_pi" INTEGER
);
