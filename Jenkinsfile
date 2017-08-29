pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "npm install"
            }
        }
    }
    stages {
        stage('Example') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
            }
        }
    }
    stages {
        stage('Run') {
            steps {
                sh "ls"
                sh "npm test"
            }
        }
    }
}