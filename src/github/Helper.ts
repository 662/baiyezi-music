import invariant from 'invariant'
import { isPlainObject, isArray } from '@src/utils'

const className = 'GithubHelper'
class GithubHelper {
    github

    constructor(github) {
        this.github = github
    }

    async createGist(description, files) {
        invariant(typeof description === 'string', `${className}.createStore: description should be string, but got ${typeof description}`)
        invariant(isArray(files), `${className}.createStore: files should be array, but got ${typeof files}`)

        const { data } = this.gist.create({
            public: false,
            description: description,
            files: files,
        })

        return data
    }

    async updateGistFiles(id, files) {
        invariant(typeof id === 'string', `${className}.updateGistFiles: id should be string, but got ${typeof id}`)
        invariant(isPlainObject(files), `${className}.updateGistFiles: files should be plain object, but got ${typeof files}`)
        const gist = this.github.getGist(id)
        return await gist.update({ files })
    }

    async findMyGistByDescription(description) {
        invariant(typeof description === 'string', `${className}.findGistByDescription: description should be string, but got ${typeof description}`)
        const response = await this.github.getUser().listGists()
        const myGists = response.data || []
        const gist = myGists.find(g => g.description === description)
        return gist
    }

    async findGistById(id) {
        invariant(typeof id === 'string', `${className}.findGistById: id should be string, but got ${typeof id}`)
        const { data } = await this.github.getGist(id).read()
        return data
    }
}

export default GithubHelper
