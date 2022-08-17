import * as dotenv from "dotenv";
import { Octokit } from "octokit";
dotenv.config({ path: '.env' });

const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN
})

const createTicket = async () => {
    try {
        const data = await octokit.request(`POST /repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues`, {
            owner: 'OWNER',
            repo: 'REPO',
            title: 'Found a bug 2',
            body: 'I\'m having a problem with this.',
            labels: [
                'bug'
            ]
        })
        console.log('DATA', data)
    } catch (e) {
        console.error('OOPS', e)
    }
}

createTicket();