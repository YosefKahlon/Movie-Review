# Movie Review App - DevOps Azure Stack

This project is a full-stack Movie Review application demonstrating modern DevOps practices using Docker, Azure, Terraform, and GitHub Actions CI/CD.

![Architecture Diagram](image.png)

https://app.diagrams.net/#

## Project Overview
- **Frontend:** React (Vite) app for browsing and reviewing movies
- **Backend:** Node.js/Express API with endpoints for movies and reviews
- **Infrastructure as Code:** Managed with Terraform for Azure
- **CI/CD:** Automated with GitHub Actions, including build, test, Docker image push, infrastructure provisioning, deployment, health checks, and Slack notifications

## Key Features
- **Multi-environment support:** Deploy to `dev` or `prod` with manual approval for production
- **Automated testing:** Backend tests run on every pipeline execution
- **Dockerized:** Both frontend and backend run in containers
- **Terraform:** Azure infrastructure is provisioned and managed as code
- **Health checks:** Automated checks for frontend and backend service availability after deployment
- **Slack notifications:** Deployment results and health check summaries sent to Slack
- **Deployment log:** Each deployment generates a downloadable log artifact with key steps and results

## CI/CD Pipeline Steps
1. **Test:** Run backend tests
2. **Build & Push:** Build Docker images and push to Docker Hub
3. **Terraform Plan:** Generate infrastructure plan for selected environment
4. **Manual Approval:** Required for production deployments
5. **Terraform Apply:** Apply infrastructure changes
6. **Deploy to VM:** SSH into Azure VM, pull images, and start containers
7. **Health Check:** Verify frontend and backend are healthy
8. **Save Deployment Log:** Collect logs and health check results as an artifact
9. **Slack Notification:** Send deployment and health check summary to Slack

## How to Use
- Configure secrets for Docker Hub, Azure, VM SSH, and Slack webhook in your GitHub repository
- Trigger deployments via GitHub Actions workflow dispatch, choosing `dev` or `prod`
- Download deployment logs from workflow artifacts for auditing

## File Structure
- `frontend/` - React app
- `backend/` - Express API
- `infra/` - Terraform code for Azure
- `.github/workflows/deploy.yml` - Main CI/CD pipeline

