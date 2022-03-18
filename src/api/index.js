import axios from "axios";

const Filters = {
    categoryId: (arr, id) => {
        return arr.filter(item => item.categoryId === parseInt(id))
    },
    byPrice: (arr, min, max) => {
        if(min && max) return arr.filter(good => good.price >= min && good.price <= max)

        if(min) return arr.filter(good => good.price >= min)

        if(max) return arr.filter(good => good.price <= max)

        return arr
    }
}

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
        let items = await axios("http://localhost:3000/items")
        items = Filters.categoryId(items.data, id);
        items = Filters.byPrice(items, min, max)

        let minPrice = Model.getMinPrice(items)
        let maxPrice = Model.getMaxPrice(items)

        if(minPrice === Infinity) minPrice = 0
        if(maxPrice === -Infinity) maxPrice = 0

        return {
            items,
            minPrice,
            maxPrice
        }
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

    static getUniqueFilterParameters(innerArr) {
        function getUniqueNames(arr) {
            let newArr = []
            arr.forEach(elem => {
                elem.attributes.forEach(item => {
                    newArr = [...newArr, item.attrName]
                })
            })

            return Array.from(new Set(newArr))
        }

        let attrsArray = innerArr.map(attrs => attrs.attributes)

        const result = Object.assign(
          {},
          ...getUniqueNames(innerArr)
            .map(name => ({
                [name]: attrsArray.find(attrs => attrs.attrName === name)
            }))
        )

        return result
    }
}