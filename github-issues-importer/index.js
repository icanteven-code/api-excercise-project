import * as dotenv from "dotenv";
import { Octokit } from "octokit";
import MarkdownIt from 'markdown-it';
import { readFileSync } from 'fs'


dotenv.config({ path: '.env' });
const md = new MarkdownIt();


const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN
})

const createGithubLabel = async () => {
    try {
        const existingLabel = await octokit.request(`GET /repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/labels/story`, {
            owner: 'OWNER',
            repo: 'REPO',
            name: 'story'
        })
        if (existingLabel.status === 200) return;

        await octokit.request(`POST /repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/labels`, {
            owner: 'OWNER',
            repo: 'REPO',
            name: 'story',
            description: 'A small part of a feature you need to implement.',
            color: '27ae60'
        })
    } catch (e) {
        console.error('Failed to fetch or create custom github label', e)
    }
}

const createTicket = async (title, body) => {
    try {
        await octokit.request(`POST /repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues`, {
            owner: 'OWNER',
            repo: 'REPO',
            title: title,
            body: body,
            labels: [
                'story'
            ]
        })
    } catch (e) {
        console.error('Failed to create issue', e)
    }
}

const getMarkdownContent = () => {
    const splitter = '**Description**';
    const [result] = md.parseInline(file);
    // const
    console.log(result);
    const [title, body] = result.content.split(splitter);
    return {
        title: title.replace('#### ', ''),
        body: splitter + body
    }
}

await createGithubLabel();
const file = readFileSync('../tasks/11-Tags-Filtering-products-by-tags.md', 'utf8')
const { title, body } = getMarkdownContent(file)
createTicket(title, body);