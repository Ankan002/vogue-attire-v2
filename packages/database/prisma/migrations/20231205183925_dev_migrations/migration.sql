/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `razorpay_order_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT,
    "method" TEXT,
    "payment_status" TEXT NOT NULL DEFAULT 'initiated',
    "delivery_charge" REAL NOT NULL,
    "total_tax" REAL NOT NULL,
    "total_amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("created_at", "currency", "delivery_charge", "id", "status", "total_amount", "total_tax", "updated_at", "user_id") SELECT "created_at", "currency", "delivery_charge", "id", "status", "total_amount", "total_tax", "updated_at", "user_id" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
