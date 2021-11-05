const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	//index: (req, res) => {
		// Do the magic
	//},

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

		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
		description: req.body.description
		}
		const baseDeDatos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'))
		baseDeDatos.push(nuevoProducto)
		const productoJSON = JSON.stringify(baseDeDatos)
		fs.writeFileSync( productsFilePath, productoJSON)
		//res.redirect("/")
		res.send(productoJSON)
		//res.redirect("/create")
	},

	// Update - Form to edit
	//edit: (req, res) => {
		// Do the magic
	//},
	// Update - Method to update
	//update: (req, res) => {
		// Do the magic
	//},

	// Delete - Delete one product from DB
	//destroy : (req, res) => {
		// Do the magic
	//}
};

module.exports = controller;