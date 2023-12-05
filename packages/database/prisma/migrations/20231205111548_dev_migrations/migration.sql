/*
  Warnings:

  - Added the required column `user_id` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `WishlistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marked_price` to the `ProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Tax" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProductTax" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tax_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "tax_percent" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "ProductTax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductTax_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "delivery_charge" REAL NOT NULL,
    "total_tax" REAL NOT NULL,
    "total_amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_item_id" TEXT,
    "product_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "OrderItem_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "ProductItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItemTax" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tax_id" TEXT NOT NULL,
    "order_item_id" TEXT NOT NULL,
    "tax_percent" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "OrderItemTax_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "Tax" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItemTax_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "OrderItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "CartItem_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "ProductItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("created_at", "id", "product_item_id", "quantity", "updated_at") SELECT "created_at", "id", "product_item_id", "quantity", "updated_at" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
CREATE TABLE "new_WishlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_item_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "WishlistItem_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "ProductItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishlistItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WishlistItem" ("created_at", "id", "product_item_id", "updated_at") SELECT "created_at", "id", "product_item_id", "updated_at" FROM "WishlistItem";
DROP TABLE "WishlistItem";
ALTER TABLE "new_WishlistItem" RENAME TO "WishlistItem";
CREATE TABLE "new_ProductItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "product_image" TEXT,
    "price" REAL NOT NULL,
    "marked_price" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "in_stock" BOOLEAN NOT NULL DEFAULT true,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "ProductItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductItem" ("created_at", "currency", "id", "in_stock", "is_published", "price", "product_id", "product_image", "updated_at") SELECT "created_at", "currency", "id", "in_stock", "is_published", "price", "product_id", "product_image", "updated_at" FROM "ProductItem";
DROP TABLE "ProductItem";
ALTER TABLE "new_ProductItem" RENAME TO "ProductItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
