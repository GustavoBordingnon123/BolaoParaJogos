import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'third tester doe',
            email: 'testador3@test.gmail.com',
            avatarUrl: 'https://github.com/diego3g.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'third pool',
            code: 'THIRDBOL',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.201Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.201Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',
            
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
    
}

main()