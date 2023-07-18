import os
import boto3
import time

def upload_files(bucket_name, folder_name):
    s3_client = boto3.client('s3')

    file_names = os.listdir(folder_name)
    for file_name in file_names:
        file_path = os.path.join(folder_name, file_name)
        object_key = f"{file_name}"

        s3_client.upload_file(file_path, bucket_name, object_key)
        print(f"Uploaded file: {object_key}")

        time.sleep(0.1)  # Add a delay of 100 milliseconds

# Upload files to sampledatab00928652 bucket
bucket_name = 'sampledatab00928652'  
folder_name = 'resources/Tech'  
upload_files(bucket_name, folder_name)
