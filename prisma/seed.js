const { PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Opcional: Limpiar la tabla de usuarios para empezar de cero
  console.log('Limpiando la tabla de usuarios...');
  await prisma.user.deleteMany({});

  // 2. Crear los nuevos usuarios con los campos requeridos
  console.log('Creando usuarios de demostración...');
  const demoUsers = [
    {
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      // En una aplicación real, la contraseña debería estar hasheada
      password: 'password123',
      role: Role.ADMIN // El rol debe ser uno de los valores del enum: ADMIN o USER
    },
    {
      name: 'María López',
      email: 'maria.lopez@example.com',
      password: 'password456',
      role: Role.USER
    },
    {
      name: 'Carlos García',
      email: 'carlos.garcia@example.com',
      password: 'password789',
      role: Role.USER
    }
  ];

  // Usamos createMany para insertar todos los usuarios en una sola operación
  await prisma.user.createMany({
    data: demoUsers,
    skipDuplicates: true, // Evita errores si un usuario con el mismo email ya existe
  });

  console.log('✅ Usuarios de demostración creados con éxito.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });