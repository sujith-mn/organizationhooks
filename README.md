# ZenHub Webhook Demo

## Setup

### Gtihub App

Create a github app with following configuration:

Homepage URL
https://github.com/devonfw/organizationhooks


Webhook URL
https://zhdemo.herokuapp.com/

### Heroku account
Create a heroku account.

Setup the below "config vars":

PRIVATE_KEY
    private key from github app
APP_ID
    app id of the github app.

Below git commands to deploy to heroku:

heroku login
heroku git:remote -a zhdemo
git push heroku master

### Zenhub Integration

Integrate the webhook on Zenhub AccountManagement>Integrations.
Select Service: Custom 
Choose a Repository to connect: organizationhooks
Webhook URL:  https://zhdemo.herokuapp.com/