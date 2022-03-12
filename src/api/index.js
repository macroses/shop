import axios from "axios";

export default class Model {
    async loadCategories() {
        const categoryUrl = "http://localhost:3000/category"
        const resolve = await axios(categoryUrl)
        return resolve.data
    }

    async loadSingleCategory(id) {
        let res = await this.loadCategories();
        let newArr = []
        newArr = res.filter(el => el.id === +id)
        return newArr[0]
    }
}