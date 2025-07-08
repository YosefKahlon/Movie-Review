# Infrastructure as Code (Terraform)

## Overview
This folder contains Terraform code to provision Azure infrastructure for the Movie Review app. It supports both `dev` and `prod` environments using separate tfvars files and separate remote state files, organized in environment-specific folders.

## Structure
- `main.tf`, `variables.tf`, `outputs.tf`: Main infra and module wiring (shared)
- `backend.tf`: Backend type (partial config for remote state, shared)
- `modules/`: Reusable infra modules (VM, network, resource group)
- `azure_file_share.tf`: Persistent log storage (shared)
- `dev/`: Dev environment files
  - `dev.tfvars`: Dev environment variables
  - `backend.dev.config`: Dev backend config for remote state
- `prod/`: Prod environment files
  - `prod.tfvars`: Prod environment variables
  - `backend.prod.config`: Prod backend config for remote state

## Usage

1. **Initialize Terraform for Dev**
   ```sh
    terraform init -reconfigure -backend-config=dev/backend.dev.config
   ```
2. **Plan and Apply (Dev)**
   ```sh
   terraform plan -var-file=dev/dev.tfvars
   terraform apply -var-file=dev/dev.tfvars
   ```
3. **Initialize Terraform for Prod**
   ```sh
   terraform init -reconfigure -backend-config=prod/backend.prod.config
   ```
4. **Plan and Apply (Prod)**
   ```sh
   terraform plan -var-file=prod/prod.tfvars
   terraform apply -var-file=prod/prod.tfvars
   ```

## Remote State
Remote state is stored in an Azure Storage Account. Each environment uses a different state file, configured via `dev/backend.dev.config` and `prod/backend.prod.config`. Update these files with your actual resource group and storage account names.

## Docker Bootstrapping
VMs are provisioned with Docker and Docker Compose using a cloud-init script.

## Persistent Logs
Logs can be stored in an Azure File Share. See `azure_file_share.tf`.

## Security
**Do not use hardcoded passwords in production!** Use Azure Key Vault or environment variables for secrets.

## Environment Separation
This project uses environment folders (`dev/`, `prod/`) for tfvars and backend config files, with all logic and modules shared at the root. See the main project README for more details.
