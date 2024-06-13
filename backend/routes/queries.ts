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
    const { userId } = req.body;
    
    if(!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    const sqlFilePath = '../sql/get_activity.sql';
    const queries = readSQLFile(sqlFilePath).split(';').map(query => query.trim()).filter(query => query);

    const questions = queries[0];
    const answers = queries[1];
    const wikis = queries[2];
    const comments = queries[3];
    const votes = queries[4];

    const questionQuery = {
        questions,
        params: { UserId: userId }
    }

    const answerQuery = {
        answers,
        params: { UserId: userId }
    }

    const wikiQuery = {
        wikis,
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
        const [questionJob] = await bigquery.createQueryJob(questionQuery);
        const [questionRows] = await questionJob.getQueryResults();

        const [answerJob] = await bigquery.createQueryJob(answerQuery);
        const [answerRows] = await answerJob.getQueryResults();

        const [wikiJob] = await bigquery.createQueryJob(wikiQuery);
        const [wikiRows] = await wikiJob.getQueryResults();

        const [commentJob] = await bigquery.createQueryJob(commentQuery);
        const [commentRows] = await commentJob.getQueryResults();

        const [voteJob] = await bigquery.createQueryJob(voteQuery);
        const [voteRows] = await voteJob.getQueryResults();

        return res.status(200).send({ questions: questionRows, answers: answerRows, wikis: wikiRows, comments: commentRows, votes: voteRows });
    } catch (error) {
        console.error('Error executing queries', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

router.route('/api/getexperts').get(async (req, res) => {
    const { tag } = req.body;

    if(!tag) {
        return res.status(400).send({ error: 'Tag is required' });
    }

    const sqlFilePath = '../sql/get_experts.sql';
    const query = readSQLFile(sqlFilePath);

    const options = {
        query,
        params: { tag: tag }
    };

    try {
        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

export default router;