export { PrismaClient } from "@prisma/client";
export { PrismaLibSQL } from "@prisma/adapter-libsql";

export type {
	Address,
	Admin,
	Attribute,
	CartItem,
	Category,
	Order,
	OrderItem,
	OrderItemTax,
	OrderStatus,
	PaymentStatus,
	ImageAsset,
	ProductImage
} from "@prisma/client";

// !Note: If you want to use turso or libsql with this project. Please go to turso-client and turn on the options and then turn on the commented line below. Then update the above code file as per requirements.
// export * from "./turso-client";
