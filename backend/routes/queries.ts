import dotenv from 'dotenv';
import { Router } from 'express';
import { BigQuery } from '@google-cloud/bigquery'
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = Router();
const projectId = 'cs348-424121'
const bigquery = new BigQuery({projectId});

const readSQLFile = (filePath: string) => {
    return fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
};

router.route('/api/getactivity/:username').get(async (req, res) => {
    const username = req.params.username;
    
    if(!username) {
        return res.status(400).send({ error: 'Username is required' });
    }

    async function getId(username: string) {
        const sqlFilePath = '../sql/get_userID.sql';
        const query = readSQLFile(sqlFilePath);

        const options = {
            query,
            params: { username: username }
        }

        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();

        return rows[0].userID;
    } 

    const userId = await getId(username);

    const sqlFilePath = '../sql/get_activity.sql';
    const queries = readSQLFile(sqlFilePath).split(';').map(query => query.trim()).filter(query => query);
    let results: any[] = [];
        
    for(let i = 0; i <= 4; i++) {
        const query = queries[i];

        const options = {
            query,
            params: { userID: userId }
        }

        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();
        results.push(rows);
    }

    try {
        return res.status(200).send({ questions: results[0], answers: results[1], wikis: results[2], comments: results[3], upvotes: results[4] })
    } catch (error) {
        console.error('Error executing queries', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

router.route('/api/getexperts/:tag').get(async (req, res) => {
    const tag = req.params.tag

    if(!tag) {
        return res.status(400).send({ error: 'Tag is required' });
    }

    const sqlFilePath = '../sql/get_experts.sql';
    const query = readSQLFile(sqlFilePath);

    const options = {
        query,
        params: { tag: tag, amount: 10 }
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    try {
        return res.status(200).send({ experts: rows })
    } catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})


router.route('/api/getmostcomments/:amount').get(async (req, res) => {
    const amount = req.params.amount;

    if(!amount) {
        return res.status(400).send({ error: 'Amount is required' })
    }

    const sqlFilePath = '../sql/get_posts_with_most_comments.sql'
    const query = readSQLFile(sqlFilePath);

    const options = {
        query,
        params: { amount: parseInt(amount) }
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    try {
        return res.status(200).send({ posts: rows })
    } catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

router.route('/api/getavgrestime/:tag').get(async (req, res) => {
    const tag = req.params.tag;

    if(!tag) {
        return res.status(400).send({ error: 'Tag is required' });
    }

    const sqlFilePath = '../sql/get_average_response_time.sql'
    const query = readSQLFile(sqlFilePath);

    const options = {
        query,
        params: { tag: tag }
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    try {
        return res.status(200).send({ time: rows })
    } catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

router.route('/api/getqadiff/:order/:amount').get(async (req, res) => {
    const order = req.params.order;
    const amount = req.params.amount;
    
    const validDesc = ['asc', 'desc']

    if(!order || !validDesc.includes(order.toLocaleLowerCase()) || !amount) {
        return res.status(400).send({ error: 'valid ordering and amount are required' });
    }

    const sqlFilePath = '../sql/get_users_with_qa_diff.sql'
    const query = readSQLFile(sqlFilePath);

    const options = {
        query,
        params: { order : order.toLowerCase(), amount: parseInt(amount) }
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    try {
        return res.status(200).send({ users: rows })
    } catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
})

export default router;