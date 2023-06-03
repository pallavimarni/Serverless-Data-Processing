package s3;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;

import java.io.File;

public class CreateS3Bucket {
    public static void main(String[] args) {

        Region region = Region.getRegion(Regions.US_EAST_1);
        String bucketName = "b00928652";

        try {
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new ProfileCredentialsProvider()).withRegion(String.valueOf(region)).build();

            if (!s3Client.doesBucketExistV2(bucketName)) {
                s3Client.createBucket(bucketName);
                String filePath = "C:/Users/17827/Desktop/index.html";
                String objectKey = "index.html";
                PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, objectKey, new File(filePath));
                s3Client.putObject(putObjectRequest);
                System.out.println("File uploaded successfully.");
            }
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
    }
}


