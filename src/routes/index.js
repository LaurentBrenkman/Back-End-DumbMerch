const express = require('express')

const router = express.Router()

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { getProduct, addProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/product')
const { getTransactions, addTransaction, deleteTransaction , getTransaction} = require('../controllers/transaction')
const { register, login } = require('../controllers/auth')
const { getCategories, getCategory, deleteCategory, addCategory, updateCategory } = require('../controllers/category')

// Middleware
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

// import middleware here

// Route users
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// Route product
router.get('/products', auth, getProducts)
router.get('/product/:id', auth, getProduct)
router.post('/product', auth, uploadFile('image'), addProduct) // place middleware before controller
router.patch('/product/:id', auth, uploadFile('image'), updateProduct)
router.delete('/product/:id', auth, deleteProduct)

// Route transaction
router.get('/transactions', auth, getTransactions)
router.get('/transaction/:id', auth, getTransaction)
router.post('/transaction', auth, addTransaction)
router.delete('/transaction/:id', auth, deleteTransaction)

// Route users
router.get('/categorys', auth, getCategories)
router.get('/category/:id', auth, getCategory)
router.post('/category', auth, addCategory)
router.patch('/category/:id', auth,  updateCategory)
router.delete('/category/:id', auth, deleteCategory)

router.post('/register', register)
router.post('/login', login)

module.exports = router