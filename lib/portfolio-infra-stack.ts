import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class PortfolioInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define an S3 bucket
    const bucket = new s3.Bucket(this, 'Portfolio', {
      websiteIndexDocument: 'index.html', // The index document
      publicReadAccess: false, // Make the contents publicly readable      
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
      autoDeleteObjects: true, // NOT recommended for production code
    });

    // Define the bucket policy
    const bucketPolicy = new s3.BucketPolicy(this, 'PortfolioPolicy', {
      bucket,
    });

    // Add the policy statements
    bucketPolicy.document.addStatements(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`],
        principals: [new iam.AnyPrincipal()],
      })
    );
  }
}
