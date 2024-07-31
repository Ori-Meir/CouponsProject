const Category = {
    electricity: 'ELECTRICITY',
    restaurant: 'RESTAURANT',
    food: 'FOOD',
    vacation: 'VACATION'
} as const

type Category = typeof Category[keyof typeof Category]

export { Category }