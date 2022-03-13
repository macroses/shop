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
        const itemsUrl = "http://localhost:3000/items"
        let items = await axios(itemsUrl)
        items = items.data.filter(el => el.categoryId === parseInt(id))
        return items
    }
}