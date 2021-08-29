pipeline {
    agent { dockerfile {
            additionalBuildArgs '-t localhost:5000/rms-pos:latest'
        }
    }
    stages {
        stage("ssh to local") {
            environment {
                LOCAL_CREDS = credentials('local-ssh')
            }
            
            steps {
                script {
                def remote = [:]
                remote.user = LOCAL_CREDS_USR
                remote.host = 'localhost'
                remote.name = 'local-ssh'
                remote.password  = LOCAL_CREDS_PSW
                remote.allowAnyHosts = 'true'
                sshCommand remote: remote, command: 'docker stack rm rms'
                sleep(20)
                sshCommand remote: remote, command: 'docker stack deploy -c /home/snpbaravinda/lampp/rms.yml rms'
            }
            }
        }
    }
}