const { http, https } = require('follow-redirects');
var pageNumber = 0; // How many pages of products fuga has 
var totalProducts = 0; //total Products on fuga 
var noOfPages = -1; // total number of pages of products on fuga 
var prodValue = "";
var pageSize  = 0;
var aCookie = " uu";
var token = "uu";
var rawLoginResult = "";

var Products = "";
var AllProducts = new Array(20);
var EntireProducts = null;
var LoadProductResult = {};
var LoginResult = {};
var allUPCs = [];
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

StartApp();





var GetAllUPCs = ()=>{
    var count = 0;
    allUPCs.length = AllProducts.length;
    if(AllProducts.length > 1){
        
        for(count = 0; count <= AllProducts.length; count++){
            allUPCs[count] = AllProducts[count].upc;
            //return store;
        }
    }else{
        //return [2];
    }
}

 var PrintUPCs= ()=>{
     for(let z = 0; z < AllProducts.length; z++){

        //console.log("\n# " + allUPCs[z]);
        console.log("\n# " + AllProducts[z].name);
     }
 }

function StartApp(){
    
    readline.question(
    'Welcome to the app, enter 1 to login and 2 to get all products\n\n\n', 
    function(num) {    
            if(num.trim() === "1")
            {
                SignIn();
                StartApp();
                return;
            }
            else if(num.trim() === "2")
            {
                /*for(let q=0; q < numberOfPages ; q++){

                }*/
                
                
                LoadProducts();
                return;
                 /*
                 for(let s= 0; s < uPCs.length; s++){
                    console.log("\n#" + s + " upc: " + uPCs[s]);
                 }
                 */
                   
                //return;
            }else{
                console.log("You have not entered a valid input");
                return;
                //return;
            }
        console.log("Veee !!!");
        return;
        
        
    }
);
}
 
var GetEntireProducts = ()=>{
    if(noOfPages > 0){
        for(let b = 0; b < noOfPages; b++){
            console.log("Page # " + b)
        }
    }else{
        console.log("Page size is zero")
    }
}


var ResolveToken = ()=>{
    token = "" + LoginResult.token;
    console.log("Here is the token : > ) " + token);
    
    //token = LoginResult.token.split('==')[0];
}


const options = {
  'method': 'POST',
  'hostname': 'next.fugamusic.com',
  'path': '/api/v1/login',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

const postData = JSON.stringify({
  "name": "siya",
  "password": "ft1vT2pGs#PM",
  "secure": true
});

var ResolveCookie = ()=>{
    stuff = setCookies[0].split("; Path=/;");
    aCookie = stuff[0];
    ResolveToken();
}

var HowManyProductsAndPages  = ()=>{
    //LoadProducts();
    //noOfPages = JSON.parse(Products).page_size;
    //totalProducts = JSON.parse(Products).total;

}


 //let productsOptions = 
 //   {
 //   /*'method': 'GET',*/
 //   host: 'next.fugamusic.com',
 //   path: '/api/v1/products?page=' + pageNumber + '&page_size=' + 20 + "&subresource=true",
 //   headers: {
 //       'x-csrf-token': token,
 //       'Cookie': aCookie      
 //   }
    /*,
    'maxRedirects': 20*/
 //   };


var SignIn = () => 
{
console.log("Login options are: \n\n" + JSON.stringify(options));
    var chunks = [];
    var sumtin = 0;
    var req =  https.request(
        options, 
         (res)=> 
         {
            res.on(
                'data', 
                (chunk)=>
                {
                    console.log('working');
                    chunks.push(chunk);
                }
            );
            var ingenileNaLeToken = "";
            res.on(
                'end', 
                (chunk)=> 
                {
                    for(let s=0; s < chunks.length; s++){
                        rawLoginResult += chunks[s];
                    }
                    setCookies = res.headers["set-cookie"];
                    LoginResult = JSON.parse(rawLoginResult);
                if ( setCookies ) 
                {
                    ResolveCookie();
 
                    for(let k = 0; k < setCookies.length; k++){
                        console.log( "COOKIE: Number " + k + " " + aCookie + "\n\n");
                    }
                }

             }
            );
            res.on(
                'error', 
                (error) =>
                {
                    console.error( "Oops, something went wrong\n\n" + error);
                }
            );
        
    }
    );
    req.write(postData);
    req.end();
}
//var prodValue = "0"; 
/*
 var options = 
    {
    'method': 'GET',
    'hostname': 'next.fugamusic.com',
    'path': '/api/v1/products?page=' + pageNumber,
    'headers': {
        'x-csrf-token': token,
        'Cookie': aCookie      
    },
    'maxRedirects': 20
    };
    */
var LoadProducts = ()=>{
    let productsOptions = 
    {
    /*'method': 'GET',*/
    host: 'next.fugamusic.com',
    path: '/api/v1/products?page=' + pageNumber + '&page_size=' + 20 + "&subresource=true",
    headers: {
        'x-csrf-token': token,
        'Cookie': aCookie      
    }
    /*,
    'maxRedirects': 20*/
    };
   
    console.log("\n\nProduct options are \n\n" + JSON.stringify(productsOptions))     
    var req =  https.request(productsOptions, function (res) {
            var chunks = [];
        res.on("data", (chunk)=>
            {
                chunks.push(chunk);
            });

        res.on("end", ()=> 
            {
                prodValue = "";
                for(let i = 0; i < chunks.length; i++) 
                {
                    
                    //Products += chunks[i];
                    prodValue += chunks[i];
                }
                //If the the first fuga page is about to be read, ie this code is only supposed to run once
                if((noOfPages == -1) && ((true))){
                    //Number(totalProducts = JSON.parse(prodValue).total)/
                    totalProducts = Number(totalProducts = JSON.parse(prodValue).total);
                    pageSize = Number(JSON.parse(prodValue).page_size);
                    noOfPages = Math.ceil(totalProducts/pageSize);
                    console.log("\n\nTotal : " + Number(totalProducts = JSON.parse(prodValue).total) + "no of pages : " + noOfPages);
                    console.log("\n\nPage size: " + Number(JSON.parse(prodValue).page_size) + "no of pages : " + noOfPages);
                    //totalProducts = Number(JSON.parse(prodValue).total);
                    //noOfPages = Math.ceil(totalProducts/20/*Number(JSON.parse(prodValue).page_size)*/);
                    //console.log("\nNo of pages " + noOfPages);
                    //console.log("\nTotal " + totalProducts);

                    console.log("won \n" + prodValue);
                    //console.log("\n\n\nHere are the number of pages: " + noOfPages);
                    EntireProducts = new Array(noOfPages);
                }
                
                if(pageNumber < noOfPages){
                    //pageNumber++;
                    EntireProducts[pageNumber++] = JSON.parse(prodValue);
                    //LoadProducts();
                    console.log("Here the entire products array has a length of: " + EntireProducts.length);
                    console.log("\n\nPage Count: " + noOfPages + "\n\n" + "Page Number: " + pageNumber);
                }else{
                    console.log("Here are some of the products :\n\n\n\n" + JSON.stringify(EntireProducts[0]));
                    
                    return; 
                }
                LoadProducts();
                return;        
            });

        res.on("error", (err)=>
            {                    
                console.log("Oops ! something went wrong." + "\n" + "Here are some details");                    
            });

    });
    req.end();   
}