// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Products = require('./models/products.js');

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
//========================================================================
//middleware

// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//========================================================================
//routes

// Index
app.get('/store', (req, res) => {
    Products.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// New
app.get('/store/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/store/seed', (req, res) => {
    Products.create(
        [{
            name: 'Turtles',
            description: 'Hard and crunchy',
            img: 'https://i.imgur.com/DrIDSET.jpeg',
            price: 45.00,
            qty: 7
        },
        {
            name: 'Cobras',
            description: 'non-venomous slithery snek',
            img: 'https://i.imgur.com/lDUkcgq.jpeg',
            price: 345.00,
            qty: 34

        },
        {
            name: 'Chicken',
            description: 'taste like everything',
            img: 'https://i.imgur.com/uIU7x1z.jpeg',
            price: 25.00,
            qty: 2
        },
        {
            name: 'Lizard(small)',
            description: 'Small and quick',
            img: 'https://i.imgur.com/UNo3H3j.jpeg',
            price: 5.00,
            qty: 179
        },
        {
            name: 'Lizard(medium)',
            description: 'Tough and chewy',
            img: 'https://i.imgur.com/99OBQVV.jpeg',
            price: 15.00,
            qty: 18
        },
        {
            name: 'Lizard(large)',
            description: 'It is a Komodo Dragon',
            img: 'https://i.imgur.com/MZaRFpk.jpeg',
            price: 155.00,
            qty: 0
        },
        {
            name: 'Crickets',
            description: 'Likes to chrip about nothing',
            img: null,
            price: .10,
            qty: 10234
        },
        ],
        (error, data) => {
            res.redirect('/store');
        }
    );
});


// DELETE
app.delete('/store/:id', (req, res) => {
    // res.send('deleting...');
    Products.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/store');
    });
});

// UPDATE
app.put('/store/:id', (req, res) => {
    
	Products.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	}, (error, updatedProduct) => {
		res.redirect(`/store/${req.params.id}`);
	});
});

//create
app.post('/store', (req, res) => {
    Products.create(req.body, (error, createdProduct) => {
        res.redirect('/store');
    });
});

// EDIT
app.get('/store/:id/edit', (req, res) => {
	Products.findById(req.params.id, (error, foundProduct) => {
		res.render('edit.ejs', {
			product: foundProduct
		});
	});
});

// Show
app.get('/store/:id', (req, res) => {
    Products.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            products: foundProduct,
        });
    });
});



// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`))