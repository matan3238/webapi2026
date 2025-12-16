const express=require('express');// חיבור לספריית אקספרס שמאפשרת ניהול שרתי אינטרנט
const app=express();// יצירת אפליקציה חדשה באמצעות אקספרס
const productRouter=require('./api/v1/routes/product');// ייבוא הראוטר לניהול ניתובים עבור היישות מוצר
const orderRouter=require('./api/v1/routes/order');// ייבוא הראוטר לניהול ניתובים עבור היישות הזמנה
const morgan=require('morgan');// חיבור לספריית מורגן לניטור בקשות HTTP
const ipFilter=require('./api/v1/middlewares/ipFilter');// ייבוא middleware לסינון כתובות IP
app.use(morgan('dev'));


app.use(ipFilter);// רישום הmiddleware באפליקציה

// middleware- שכבת ביניים או שכבת תיווך
// const secure=(req,res,next)=>{
//     console.log(`I am secure middleware ${req.method}`);
//     next();// קריאה לפונקציית הnext כדי להמשיך לשכבת הmiddleware הבאה או לנתיב המבוקש
//     //res.status(401).json({msg:`You are not authorized   `});

// };
// app.use(secure);// רישום הmiddleware באפליקציה



// const logger=(req,res,next)=>{


// };
// app.use(logger);// רישום הmiddleware באפליקציה


// רישום הראוטרים באפליקציה
app.use('/product',productRouter);// רישום הראוטר באפליקציה תחת הנתיב /product
app.use('/order',orderRouter);// רישום הראוטר באפליקציה תחת הנתיב /order

// הגדרנו שכבה אחרונה שתשמש עבור בהודעת 404 לא נמצא
app.use((req,res)=>{
    res.status(404).json({msg:`Path not found`});
});
// http://localhost:5050/product

module.exports=app;// ייצוא האפליקציה החוצה לשימוש בקבצים אחרים