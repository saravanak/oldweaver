const Cache = require('@11ty/eleventy-cache-assets')
const orderBy = require('lodash/orderBy')
const metadata = require('./metadata.json');
const author = require('./author.json');

// if you want to display your most starred github repositories,
// change this to your username. if not, set it to false.
const githubMeta = author.social.find(s => s.name == "Github");
const YOUR_GITHUB_USERNAME = githubMeta.user.substring(1);

module.exports = async function () {
    if (!YOUR_GITHUB_USERNAME) {
        return []
    }

    try {
        console.log('Fetching GitHub repos...')
        const repos = await Cache(
            `https://api.github.com/users/${YOUR_GITHUB_USERNAME}/repos`,
            {
                duration: '1d',
                type: 'json'
            }
        )
        return orderBy(repos.filter(r => metadata.featuredGitRepos.includes(r.name)), 'stargazers_count', 'desc')
    } catch (e) {
        console.log('Failed fetching GitHub repos')
        return []
    }
}
