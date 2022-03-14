import axios from "axios";

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

    static async loadItems(id) {
        let items = await axios("http://localhost:3000/items")
        items = items.data.filter(el => el.categoryId === parseInt(id))
        return items
    }

    static sortGoodsByPrice(val ,arr) {
        if(val === 2) arr = arr.sort((a,b) => a.price - b.price)
        else if(val === 3) arr = arr.sort((a,b) => b.price - a.price)
        return arr
    }

    static async getMinPrice(categoryId) {
        let items = await this.loadItems(categoryId)
        items = items.map(el => el.price).sort((a,b) => a - b)
        return items[0]
    }

    static async getMaxPrice(categoryId) {
        let items = await this.loadItems(categoryId)
        items = items.map(el => el.price).sort((a,b) => b - a)
        return items[0]
    }

    static async filterByPrice(categoryId, minVal, maxVal) {
        let items = await this.loadItems(categoryId);
        let min = []
        let max = []

        if(!minVal && !maxVal) return items

        function getMinPrice() {
            min = items.map(el => el.price).sort((a,b) => a - b)
            return min[0]
        }
        function getMaxPrice() {
            max = items.map(el => el.price).sort((a,b) => b - a)
            return max[0]
        }

        // let result = items.filter(good => good.price >= getMinPrice() && good.price <= getMaxPrice())
        items = items.filter(good => good.price >= minVal && good.price <=maxVal)
        return items
    }
}