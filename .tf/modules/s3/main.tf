########################################
# Module S3 - main
########################################
resource "aws_s3_bucket" "main" {
  bucket        = local.bucket_name
  tags          = local.tags
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket_acl" "main" {
  bucket = aws_s3_bucket.main.id
  acl    = local.bucket_acl
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  ## s3 bucket public access block ##
  block_public_policy     = var.block_public_policy
  block_public_acls       = var.block_public_acls
  ignore_public_acls      = var.ignore_public_acls
  restrict_public_buckets = var.restrict_public_buckets
}