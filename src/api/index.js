import axios from "axios";

const Filters = {
    minPrice: (arr, price) => {
        return arr.filter(item => item.price >= price)
    },
    maxPrice: (arr, price) => {
        return arr.filter(item => item.price <= price)
    },
    categoryId: (arr, id) => {
        return arr.filter(item => item.categoryId === parseInt(id))
    },
    byPrice: (arr, min, max) => {
        return arr.filter(good => good.price >= min && good.price <= max)
    }
}

// return Filters

export default class Model {
    static async loadCategories() {
        const categoryUrl = "http://localhost:3000/category"
        const resolve = await axios(categoryUrl)
        return resolve.data
    }

    static async loadSingleCategory(id) {
        let res = await this.loadCategories();
        let newArr = res.filter(el => el.id === parseInt(id))
        return newArr[0]
    }

    static async loadItems(id, filters = {}, min, max) {
        const items = await axios("http://localhost:3000/items")

        const categorizedItems = Filters.categoryId(items.data, id);
        const byPriceItems = Filters.byPrice(categorizedItems, min, max)

        return byPriceItems
    }

    static async loadSingleItem(id) {
        const items = await axios("http://localhost:3000/items")
        const item = items.data.filter(item => item.id === parseInt(id))
        return item[0]
    }

    static sortGoodsByPrice(val ,arr) {
        if(val === 2) return arr.sort((a,b) => a.price - b.price)
        else if(val === 3) return arr.sort((a,b) => b.price - a.price)
    }

    static getMinPrice(goods) {
        return Math.min(...goods.map(good => good.price))
    }

    static getMaxPrice(goods) {
        return Math.max(...goods.map(good => good.price))
    }

    // static async filterByPrice(categoryId, minVal, maxVal) {
    //     let items = await this.loadItems(categoryId);
    //     if(!minVal && !maxVal) return items
    //     items = items.filter(good => good.price >= this.getMinPrice() && good.price <= this.getMaxPrice())
    // }
}