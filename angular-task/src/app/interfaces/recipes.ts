export interface Recipes{
    id: string,
    userid: string,
    name: string,
    img?: string,
    dishdp?: string,
    reviews?: string,
    cuisine: string,
    category: string,
    difficulty: string,
    cookingTime: string,
    tags: string|string[],
    ingredients: string|string[],
    description: string,
    dietaryRestrictions?: string
}