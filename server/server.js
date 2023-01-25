// sk_test_51MFj2RSBj8IBTa4QAW82QRTyZbzTr7uOz3WDc3bkd9q2UY5Ud0RDVSP7yevV4ZSXOmOl2NDKzOX3QO24MSQti9dq00b1Vu2XoL;
// Wired Earphones : price_1MFjQASBj8IBTa4Qjzl8wf1w
// Hat : price_1MFjRqSBj8IBTa4QmcrimK5m
// Tiffin Box : price_1MFjSxSBj8IBTa4QxnlRELDD

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MFj2RSBj8IBTa4QAW82QRTyZbzTr7uOz3WDc3bkd9q2UY5Ud0RDVSP7yevV4ZSXOmOl2NDKzOX3QO24MSQti9dq00b1Vu2XoL"
);

const app = express();
//Middlewares
app.use(cors());
app.use(express.static("public")); // handling static files
app.use(express.json());           // Handling JSON data
app.post("/checkout", async (req, res) => {
    /*
    req.body.items (Client Side data)
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    stripe fomrmated data
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */

    // console.log(req.body); // dev only 

    const items = req.body.items;
    // lineitems for stripe
    let lineItems = [];
    items.forEach((item)=> {
        // adding items for checkout (stripe format)
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    // sending data to frontend
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url // to be fetched on frontend
    }));
});

// listening on port
app.listen(4000, () => console.log("Listening on port 4000!"));