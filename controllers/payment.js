

const braintree = require("braintree");
require("dotenv").config();

// connect to braintree.
const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

// get braintree token
function getToken(req, res) {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            return res.status(500).send(err);
        }else{
            res.json(response);
        }
    })
}

function processPayment(req, res) {
    let nonceFromClient = req.body.paymentMethodNonce;
    let amount = req.body.amount;
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromClient,
        options: {
            submitForSettlement: true
        }
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

module.exports = {
    getToken,
    processPayment
}