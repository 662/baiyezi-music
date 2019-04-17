import Github from 'github-api'

class GithubHelper {
    github: Github

    constructor(github: Github) {
        this.github = github
    }

    async createGist(description: string, files: any) {
        const { data } = await this.github.getGist().create({
            public: false,
            description: description,
            files: files,
        })

        return data
    }

    async updateGistFiles(id: number, files: any) {
        const gist = this.github.getGist(id)
        return await gist.update({ files })
    }

    async findMyGistByDescription(description: string) {
        const response = await this.github.getUser().listGists()
        const myGists = response.data || []
        const gist = myGists.find((g: any) => g.description === description)
        return gist
    }

    async findGistById(id: number) {
        const { data } = await this.github.getGist(id).read()
        return data
    }
}

export default GithubHelper
