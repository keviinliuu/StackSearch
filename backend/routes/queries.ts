import dotenv from 'dotenv';
import { Router } from 'express';
import { BigQuery } from '@google-cloud/bigquery'
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = Router();
const projectId = process.env.PROJECT_ID;
const bigquery = new BigQuery({projectId});

const readSQLFile = (filePath) => {
    return fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
};

router.route('/api/getactivity').get(async (req, res) => {
    const userId = req.query.userId;
    
    if(!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    const sqlFilePath = '../sql/get_activity.sql';
    const queries = readSQLFile(sqlFilePath).split(';').map(query => query.trim()).filter(query => query);

    const posts = queries[0];
    const comments = queries[1];
    const votes = queries[2];

    const postQuery = {
        posts,
        params: { UserId: userId }
    }

    const commentQuery = {
        comments,
        params: { UserId: userId }
    }

    const voteQuery = {
        votes,
        params: { UserId: userId }
    }

    try {
        const [postJob] = await bigquery.createQueryJob(postQuery);
        const [postRows] = await postJob.getQueryResults();

        const [commentJob] = await bigquery.createQueryJob(commentQuery);
        const [commentRows] = await commentJob.getQueryResults();

        const [voteJob] = await bigquery.createQueryJob(voteQuery);
        const [voteRows] = await voteJob.getQueryResults();

        return res.status(200).send({ posts: postRows, comments: commentRows, votes: voteRows });
    } catch(error) {
        console.error('Error executing query', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

router.route('/api/getexperts').get(async (req, res) => {
    const tag = req.body;

    async function query() {
        const query = readSQLFile('../sql/get_experts.sql');

        const options = {
            query,
            params: { tag: tag }
        };

        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();

        return rows;
    }

    try {
        const results = await query();
        return res.status(200).send({ result: results });
    } catch(error) {
        console.error('Error executing query', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

export default router;