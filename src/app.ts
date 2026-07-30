import express from "express" ;
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { CuisineTypeRoute } from "./app/modules/cuisineTypes/cuisineType.route";
import { CategoriesRoute } from "./app/modules/categories/categories.route";
import { DietryTypeRoute } from "./app/modules/dietryTypes/dietryType.route";
import { MealRoute } from "./app/modules/meals/meals.route";
import { CartItemRoute } from "./app/modules/cartItem/cartItem.route";
import { NotFound } from "./app/middlewares/notFound";
import { GlobalHandleError } from "./app/middlewares/globalHandleError";

export const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;

const PORT = process.env.PORT || 5000 ;

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/cuisine-types',CuisineTypeRoute) ;
app.use('/api/categories',CategoriesRoute) ;
app.use('/api/dietry-types',DietryTypeRoute) ;

app.use('/api/meals',MealRoute) ;  
app.use('/api/cart-items',CartItemRoute) ;

app.use(NotFound) ;
app.use(GlobalHandleError);

app.get('/',()=>{
    console.log(`Server is running`)
})

app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`)
})