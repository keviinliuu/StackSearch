import dotenv from 'dotenv';
import { Router } from 'express';
import { BigQuery } from '@google-cloud/bigquery'

dotenv.config();

const router = Router();
const projectId = process.env.PROJECT_ID;
const bigquery = new BigQuery({projectId});

router.route('/api/getactivity').get(async (req, res) => {
    const userId = req.body;
    
    async function query() {
        const query = 'INSERT QUERY HERE'

        const [job] = await bigquery.createQueryJob({query});
        const [rows] = await job.getQueryResults();

        return rows;
    }

    const results = await query();
    return res.status(200).send({result: results})
})

router.route('/api/getexperts').get(async (req, res) => {
    const tag = req.body;

    async function query() {
        const query = 'INSERT QUERY HERE'

        const [job] = await bigquery.createQueryJob({query});
        const [rows] = await job.getQueryResults();

        return rows;
    }

    const results = await query();
    return res.status(200).send({result: results})
})

export default router;