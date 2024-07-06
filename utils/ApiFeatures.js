class ApiFeatures {
    constructor(query , queryString){
        this.query = query
        this.queryString = queryString
    }
    Filter(){
        const queryobj = {...this.queryString}
        const excludedfields = ['sort','limit','page','fields']
        excludedfields.forEach(el => delete queryobj[el])
        let queryString = JSON.stringify(queryobj)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
        this.query = this.query.find(JSON.parse(queryString))
        return this
    }

    sort(){
        if (this.queryString.sort)
        {
            const sortby = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortby)
        }
        return this
    }

    limit(){
        if(this.queryString.fields)
        {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        }
        else{
            this.query = this.query.select('-__v')
        }
        return this
    }

    pagination(){
        if(this.queryString.page)
        {
            const page = +this.queryString.page || 1
            const limit = +this.queryString.limit || 10
            const skip = (page - 1) * limit
            this.query = this.query.skip(skip).limit(limit)
        }
        return this
    }
}

module.exports = ApiFeatures