const Products = require('../../models/Products');
const Users = require('../../models/Users');

module.exports.getProfile = (req, res, next) => {
    res.render('profile', {
        name: req.user.username,
        isAdmin: req.user.isAdmin
    });
}


module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Products.find({});
        const cartdetail=await Users.findById(req.user._id).populate('cart.id')
        console.log(cartdetail);
        res.render('shop/products', {
            products,
            isAdmin: req.user.isAdmin,
            cartCount: req.user.cart.length,
            cartProducts:req.user.cart,
            cartdetail:cartdetail.cart
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports.addtocart = async (req, res) => {
    try {
        let { productId } = req.query;
        let indx = -1;
        req.user.cart.forEach((p, i) => {
            if (p.id == productId) indx = i;
        })

        if (indx == -1) {
            req.user.cart.unshift({
                id: productId,
                quantity: 1
            })
        }
        else {
            req.user.cart[indx].quantity+=1;
        }
        await req.user.save();
        const cartdetail=await Users.findById(req.user._id).populate('cart.id')
        res.send({                       
            msg: 'Item added success',
            cartCount: req.user.cart.length,
            cartdetail
        })


    }
    catch (err) {
        res.send(err)
    }
}
