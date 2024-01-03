module "vpc" {
  source = "./modules/vpc"

  vpc_name       = var.vpc_name
  vpc_cidr_block = var.vpc_cidr_block
  # public_subnet_cidr_blocks = var.public_subnet_cidr_blocks     # Uncomment to set specific cidr blocks
  # private_subnet_cidr_blocks = var.private_subnet_cidr_blocks   # Uncomment to set specific cidr blocks
}

module "security" {
  source = "./modules/security"

  vpc_id   = module.vpc.vpc_id
  vpc_name = var.vpc_name
}

module "eks_cluster" {
    source          = "./modules/eks"
    vpc_id          = module.vpc.vpc_id
    # private_subnets = module.vpc.private_subnet_ids
    public_subnets = module.vpc.public_subnet_ids
    cluster_name    = var.cluster_name
} 