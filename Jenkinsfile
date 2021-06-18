@Library('pipeline') _

def version = '21.4000'

node ('controls') {
    //checkout_pipeline("rc-${version}")
    checkout_pipeline("21.4000/feature/may/wasaby-app-180621")
    run_branch = load '/home/sbis/jenkins_pipeline/platforma/branch/run_branch'
    run_branch.execute('wasaby_app', version)
}