import express from "express" ;
import cors from "cors"
import { CuisineTypeRoute } from "./app/modules/cuisineTypes/cuisineType.route";
import { CategoriesRoute } from "./app/modules/categories/categories.route";
import { DietryTypeRoute } from "./app/modules/dietryTypes/dietryType.route";
import { MealRoute } from "./app/modules/meals/meals.route";
import { OrderRoute } from "./app/modules/order/order.route";
import { CartItemRoute } from "./app/modules/cartItem/cartItem.route";
import { NotFound } from "./app/middlewares/notFound";
import { GlobalHandleError } from "./app/middlewares/globalHandleError";
import { ReviewsRoute } from "./app/modules/reviews/reviews.route";
import { GlobalReviewsRoute } from "./app/modules/globalReviews/globalReviews.route";
import { AuthRoute } from "./app/modules/auth/auth.route";
import { CartRoute } from "./app/modules/cart/cart.route";

export const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;

const PORT = process.env.PORT || 5000 ;

// app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/cuisine-types',CuisineTypeRoute) ;
app.use('/api/categories',CategoriesRoute) ;
app.use('/api/dietry-types',DietryTypeRoute) ;

app.use('/api/meals',MealRoute) ;
app.use('/api/orders',OrderRoute) ;

app.use('/api/carts',CartRoute) ;
app.use('/api/cart-items',CartItemRoute) ;
app.use('/api/reviews',ReviewsRoute) ;
app.use('/api/global-reviews',GlobalReviewsRoute) ;

app.use('/api/auth',AuthRoute) ;

app.use(NotFound) ;
app.use(GlobalHandleError);

app.get('/',()=>{
    console.log(`Server is running`)
})

app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`)
})