pipeline {
  agent any

  environment {
    REGION = "us-east-1"
    ACCOUNT = "793523315685"
    BACKEND_ECR = "${ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/backend"
    FRONTEND_ECR = "${ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com/frontend"
    TAG = "latest"
  }

  stages {

    stage('Checkout Code') {
      steps {
        echo "Pulling code from GitHub..."
        checkout scm
      }
    }

    stage('Login to ECR') {
      steps {
        echo "Logging into ECR..."
        sh """
          aws ecr get-login-password --region $REGION | \
          docker login --username AWS --password-stdin ${ACCOUNT}.dkr.ecr.$REGION.amazonaws.com
        """
      }
    }

    stage('Build Backend Image') {
      steps {
        echo "Building backend image..."
        sh """
          cd backend
          docker build -t backend:$TAG .
          docker tag backend:$TAG $BACKEND_ECR:$TAG
          docker push $BACKEND_ECR:$TAG
        """
      }
    }

    stage('Build Frontend Image') {
      steps {
        echo "Building frontend image..."
        sh """
          cd frontend
          docker build -t frontend:$TAG .
          docker tag frontend:$TAG $FRONTEND_ECR:$TAG
          docker push $FRONTEND_ECR:$TAG
        """
      }
    }

    stage('Deploy to EKS') {
      steps {
        echo "Deploying to EKS using Helm..."
        sh """
          helm upgrade --install myapp charts/app \
            --set backend.tag=$TAG \
            --set frontend.tag=$TAG
        """
      }
    }
  }
}
