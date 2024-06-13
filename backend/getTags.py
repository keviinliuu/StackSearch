from google.cloud import bigquery

project_id = 'cs348-424121'
client = bigquery.Client(project=project_id)

dataset_id = 'stackoverflow_full'
table_id = 'posts_questions'

full_table_id = f"{project_id}.{dataset_id}.{table_id}"

query = f"""
    SELECT tags
    FROM `{full_table_id}`
    LIMIT 10
    
"""

query_job = client.query(query)

for row in query_job:
    tags = row['tags']
    print(tags)

for row in query_job:
    tags = row['tags']
    if tags:
        tag_list = tags.split('|')
        for tag in tag_list:
            print(tag)
