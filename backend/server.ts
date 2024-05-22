import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { BigQuery } from '@google-cloud/bigquery'

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(express.json());

/**
 * TODO(developer):
 *  1. Uncomment and replace these variables before running the sample.
 *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
 *  3. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
 *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
 */
const projectId = 'cs348-424121';


const bigquery = new BigQuery({projectId});
  // [END bigquery_client_json_credentials]
  async function query() {
    // Queries the U.S. given names dataset for the state of Texas.

    const query = `SELECT display_name
      FROM \`stackoverflow.users\`
      LIMIT 100`;

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    // const options = {
    //   query: query,
    //   // Location must match that of the dataset(s) referenced in the query.
    //   location: 'CA',
    // };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob({query});
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    console.log('Rows:');
    rows.forEach(row => console.log(row));
  }
  query();