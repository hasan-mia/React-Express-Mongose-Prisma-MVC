const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Prisma = ()=>{
    // run inside `async` function
    const newUser = prisma.user.create({
    data: {
        name: 'Alice',
        email: 'alice@prisma.io',
    },
    })
    const users =  prisma.user.findMany()
}

module.exports = Prisma;