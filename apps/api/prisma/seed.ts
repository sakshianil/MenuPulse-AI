import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const restaurant = await prisma.restaurant.upsert({
    where: { id: "11111111-1111-4111-8111-111111111111" },
    update: {},
    create: {
      id: "11111111-1111-4111-8111-111111111111",
      name: "Lisbon Kitchen",
      city: "Lisbon"
    }
  });

  const count = await prisma.menuItem.count({ where: { restaurantId: restaurant.id } });
  if (count === 0) {
    await prisma.menuItem.createMany({
      data: [
        ["Grilled Octopus", "Seafood", "Polvo grelhado", 18.9, 2.14, 28, 672],
        ["Bacalhau à Brás", "Portuguese Classics", "Codfish with potatoes & egg", 14.5, 2.38, 31, 804],
        ["Prego no Pão", "Sandwiches", "Steak sandwich", 9.9, 1.62, 19, 418],
        ["Pastel de Nata (2x)", "Desserts", "Custard tarts", 5.5, 4.91, 74, 592],
        ["Salada de Polvo", "Salads", "Octopus salad", 12.9, 1.47, 16, 304]
      ].map(([name, category, description, price, conversion, orders, revenue]) => ({
        restaurantId: restaurant.id,
        name: String(name),
        category: String(category),
        description: String(description),
        price: Number(price),
        conversion: Number(conversion),
        orders: Number(orders),
        revenue: Number(revenue)
      }))
    });
  }
}

main().finally(() => prisma.$disconnect());
