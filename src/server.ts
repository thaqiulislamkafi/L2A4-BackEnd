import express from "express" ;
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { NotFound } from "./middlewares/notFound";
import { GlobalHandleError } from "./middlewares/globalHandleError";
import { CuisineTypeRoute } from "./modules/cuisineTypes/cuisineType.route";
import { CategoriesRoute } from "./modules/categories/categories.route";
import { DietryTypeRoute } from "./modules/dietryTypes/dietryType.route";
import { MealRoute } from "./modules/meals/meals.route";
import { CartItemRoute } from "./modules/cartItem/cartItem.route";

const app = express() ;
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