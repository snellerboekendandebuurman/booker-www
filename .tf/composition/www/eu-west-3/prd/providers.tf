########################################
# Provider to connect to AWS
#
# https://www.terraform.io/docs/providers/aws/
########################################

terraform {
  required_version = ">= 1.3.7"

  required_providers {
    aws = ">= 4.50.0, < 5.0"
  }

  backend "s3" {
    bucket         = "snellerboekendandebuurman-www-tfstate-prd"
    key            = "api/eu-west-3/prd/terraform.tfstate"
    region         = "eu-west-3"
    encrypt        = true
    dynamodb_table = "snellerboekendandebuurman-www-tfstate-lock-prd"
  }
}

provider "aws" {
  region = var.region
}
