########################################
# Environment setting
########################################
region           = "eu-west-3"
role_name        = "Admin"
profile_name     = "snellerboekendandebuurman-www"
env              = "prd"
application_name = "snellerboekendandebuurman-www"
app_name         = "snellerboekendandebuurman-www"

## S3 bucket - Static Hosting ##
s3_bucket_static_hosting_name                    = "static-hosting"
s3_bucket_static_hosting_force_destroy           = false
s3_bucket_static_hosting_versioning_enabled      = "Enabled"
s3_bucket_static_hosting_block_public_policy     = true
s3_bucket_static_hosting_block_public_acls       = true
s3_bucket_static_hosting_ignore_public_acls      = true
s3_bucket_static_hosting_restrict_public_buckets = true

## Route53 - DNS && Routing ##
route53_hosted_zone_name    = "snellerboekendandebuurman.nl"
route53_hosted_zone_private = false