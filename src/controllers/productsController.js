const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const nuevoId = () => {
    let ultimo = 0;
    products.forEach(product => {
        if (product.id > ultimo) {
            ultimo = product.id;
        }
    });
    return ultimo + 1;
}

let nuevoId = function (){
	let ultimo = products.length
}


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {

        let producto = products.find(element => { return element.id == req.params.id })

        res.render('detail', {producto, toThousand});

    },

	// Create - Form to create
	create: (req, res) => {
		 res.render("product-create-form")
	},
	
	// Create -  Method to store

	store: (req, res) => {
		const nuevoProducto = {
id: nuevoId(),
		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
		description: req.body.description
		}
		
		products.push(nuevoProducto)
		const productoJSON = JSON.stringify(products)
		fs.writeFileSync( productsFilePath, productoJSON)
		res.redirect("/products")


	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(element=> element.id == id);		
		res.render('product-edit-form', {product: productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		products.forEach((element)  => {
			if (element.id == req.params.id){
				element.name = req.body.name;
                element.description = req.body.description;
                element.price = req.body.price;
                element.discount = req.body.discount;
                element.category = req.body.category;
			}
		})

		const productosJSON = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, productosJSON)
		res.redirect('/products');

	},

	
	// Delete - Delete one product from DB
	destroy : (req, res) => 
	
{let productosRestantes = products.filter(element => element.id != req.params.id)

	const productosJSON = JSON.stringify(productosRestantes, null)
	fs.writeFileSync(productsFilePath, productosJSON)
	res.redirect('/products');

	}
};

module.exports = controller;