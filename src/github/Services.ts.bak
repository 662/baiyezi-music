import GitHub from 'github-api'
import invariant from 'invariant'
import { isArray } from '@src/utils'
import Helper from './helper'

const className = 'GHStore'
export default class GHStore {
    github
    helper
    options
    storeId

    get storeName() {
        return `${className}-${this.options.storeName}`
    }

    constructor({ storeName, initialDocuments }) {
        invariant(typeof storeName === 'string', `${className}.constructor: storeName should be string, but got ${typeof storeName}`)
        invariant(isArray(initialDocuments), `${className}.constructor: initialDocuments should be array, but got ${typeof initialDocuments}`)

        this.options = { storeName, initialDocuments }
    }
    async init(token) {
        invariant(typeof token === 'string', `${className}.init: token should be string, but got ${typeof token}`)

        this.github = new GitHub({ token })
        this.helper = new Helper(this.github)
        const { storeName, initialDocuments } = this.options
        return await this.initStore(storeName, initialDocuments)
    }
    async initStore(storeName, initialDocuments) {
        invariant(typeof storeName === 'string', `${className}.initStore: storeName should be string, but got ${typeof storeName}`)
        invariant(isArray(initialDocuments), `${className}.initStore: initialDocuments should be array, but got ${typeof initialDocuments}`)

        let storeGist = await this.helper.findMyGistByDescription(this.storeName)

        if (storeGist) {
            storeGist = await this.helper.findGistById(storeGist.id)
        } else {
            storeGist = await this.createStore(storeName, initialDocuments)
        }

        const models = this.convertGistToModels(storeGist)
        this.storeId = storeGist.id
        return models
    }
    async createStore(storeName, documents) {
        invariant(typeof storeName === 'string', `${className}.createStore: storeName should be string, but got ${typeof storeName}`)
        invariant(isArray(documents), `${className}.createStore: documents should be array, but got ${typeof documents}`)

        const files = documents.reduce((files, document) => {
            files[`${document.name}.json`] = { content: JSON.stringify(document.content) }
            return files
        }, {})

        return await this.helper.createGist(`${className}-${storeName}`, files)
    }
    async updateDocument(documentName, model) {
        const files = {
            [`${documentName}.json`]: { content: JSON.stringify(model) },
        }
        return await this.helper.updateGistFiles(this.storeId, files)
    }

    checkInit() {
        invariant(typeof this.storeId === 'string', `${className}: not initialization`)
    }

    convertFilesToModels(files) {
        let models = {}
        Object.keys(files).forEach(filename => {
            const modelName = filename.replace('.json', '')
            models[modelName] = this.convertFileContentToModel(files[filename].content)
        })
        return models
    }
    convertFileContentToModel(content) {
        let model = []
        try {
            model = JSON.parse(content)
        } catch (err) {
            console.warn('unable to convert file content into model')
        }
        return model
    }
    convertGistToModels(gist) {
        const files = gist && gist.files ? gist.files : {}
        return this.convertFilesToModels(files)
    }
}
