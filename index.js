var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var app = express()
require('dotenv').config()

const createApp = require('github-app')

const myCert = process.env.PRIVATE_KEY || require('fs').readFileSync(process.env.PRIVATE_KEY_PATH)

const githubApp = createApp({
  id: process.env.APP_ID,
  cert: myCert
})

const port = process.env.PORT || 6000
http.createServer(app).listen(port, function() {
  console.log('Listening on ', port)
});

app.use(bodyParser());

app.post('/github-app', function(req, res) {
  console.log("/github-app--request:>>>>>>>>>>>>>>>>>>>>"+req.body.action)
    if (req.body.action = 'created') {
        console.log("Installed app:")
        console.log(req.body)
    }

    res.sendStatus(200)
})

app.post('/', function(req, res) {


  if (req.body.type !== 'issue_transfer') {
    debug('body is invalid type %s', body.type)
    return {
      statusCode: 200,
      body: 'Success!'
    }
  }

  const {
    from_pipeline_name: fromPipeline,
    to_pipeline_name: toPipeline,
    organization,
    repo,
    issue_number: _issueNumber
  } = req.body
  const issueNumber = parseInt(_issueNumber, 10)
  console.log("/github-app--request:>>>>>>>>>>>>>>>>>>>>"+    organization +"/"+repo)

        githubApp.asApp().then(github => {
            github.apps.listInstallations({}).then(installations => {
                console.log("Installations:")
                console.log(installations.data)
                var installation = installations.data.find(install => {
                    return install.account.login === req.body.organization
                })
                var commentText = "This issue was moved to " + req.body.to_pipeline_name + " on ZenHub."
                console.log("Installation:", installation.id)
                githubApp.asInstallation(installation.id).then(client => {
                  
                    client.issues.createComment({
                        owner: req.body.organization,
                        repo: req.body.repo,
                        number: req.body.issue_number,
                        body: commentText
                    }).catch((err) => {
                        console.log("ERROR:", err)
                    })
                })
            })
        })
    }
)