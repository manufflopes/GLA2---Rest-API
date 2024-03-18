function listProducts() {
    const data = fetch('https://fakestoreapi.com/products')
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('API request error')
            }
        })
        .then(function (productsList) {
            return productsList
        })
    return data
}

document.addEventListener('DOMContentLoaded', function () {
    let products = []
    let sortBy
    let filter

    listProducts().then(data => {
        showAllProducts(data)

        products = data
    })
    //sort by price
    const sortByPrice = document.getElementById('price-sort')
    sortByPrice.addEventListener('change', function () {
        sortBy = this.value
        showFilteredList(products, filter, sortBy)
    })

    const categorySelector = document.getElementById('category-filter')
    categorySelector.addEventListener('change', function () {
        filter = this.value
        showFilteredList(products, filter, sortBy)
    })
})

function showFilteredList(products, filter, sortBy) {
    let productsToDisplay = products
    if (filter) {
        productsToDisplay = productsToDisplay.filter(function (product) {
            if (product.category == filter) {
                return true
            }
        })
    }
    if (sortBy) {
        productsToDisplay = productsToDisplay.sort(function (a, b) {
            return b.price - a.price
        })

        if (sortBy == 'asc') {
            productsToDisplay = productsToDisplay.reverse()
        }
    }
    showAllProducts(productsToDisplay)
}

function showAllProducts(productsList) {
    const listedProduct = document.getElementById('list-product')
    listedProduct.innerHTML = ''
    productsList.forEach(product => {
        showProduct(product)
    })
}

function showProduct(product) {
    const listedProduct = document.getElementById('list-product')

    const div = document.createElement('div')
    div.classList.add('product')
    div.innerHTML = `
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-category">${product.category}</span>
                    
                    <span class="product-description">${
                        product.description
                    }</span>
                    
                    <img class="product-img" alt="" src="${product.image}"/>
                    <p class="product-price">${new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(product.price)}</p>
                    <div class="rate-container">
                        <strong>${product.rating.rate}</strong>
                            <div class="stars rating">
                                <progress class="rating-bg" value="${
                                    product.rating.rate
                                }" max="5"></progress>
                            </div>
                        <strong>(${product.rating.count})</strong>
                   </div>
                   <button>
                            Buy Now
                    </button>
                    `
    listedProduct.append(div)
}
