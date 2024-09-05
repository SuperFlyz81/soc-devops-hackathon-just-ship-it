# Just Ship It Hackathon! 🏴‍☠️

We've learned a lot this week but remember the reason we're doing all this automation and DevOps stuff ... to be able to ship new features to customers quickly and safely. Companies that can't move fast die over time, we don't want to be one of those companies.

So that leads us to CI/CD - it's time automate our workflow ...

## Objectives:

When you put in a "Pull Request" (PR) from a feature branch into the main branch there should be a Github Action that automatically runs things like linting, formatting, testing and auditing.
You should not be able to merge a PR into main unless the steps in the Github Action (lint, format etc etc) all pass.
You should not be able to push/merge commits directly to the main branch, everything should have to go through the PR process.
When you merge the feature branch into the main branch this should trigger an automated workflow in Render. Render should watch for changes in your main branch, when it sees a change it will pull the code, run the Docker production build and then deploy the Next.js site. You should be able to see your Next.js app live on the internet.

## Advice:

As always ... take it slow and make a plan 🙂 You need to be really careful with this challenge - its easy to get stuck. Work slowly in small blocks and test your work after each thing on your plan.

Some context: you don't have to use Docker at all with CI/CD - but because we've learned to containerise our applications this week we would like you to use Docker in your Github Action for the PR check (lint, format etc etc), we would also like you to use Render to build and deploy your production docker image.

### How do I create and test a Github Action?

Start off by learning how to write a super simple Github Action. ✅  
The action should be triggered when someone puts a pull request into the main branch. ✅  
The action could just log something out to the build console. Maybe ask Chatgpt for an idea of a very simple action that would let you test if that action is working. ✅  
Once you've written an action (work locally in your main branch as usual) add/commit the folders/file changes and push the change to the main branch. ✅  
Keep in mind the action should only be triggered if someone creates a PR into the main branch. ✅

Test if the action works...  
 locally create a branch off the main branch, ✅  
 make a code change, commit the code, ✅  
 push up the feature branch, ✅  
 and then finally create a pull request into the main branch. ✅

You will be successful if your GitHub Action has been triggered. You should see this after a few seconds on the pull request page. ✅

### OK ... my simple action works, what next?

Now we are able to do something (run an action) when a PR into the main branch is created, great work! ✅

Next up we need the action to do something we want - you will need to learn how to docker build and docker run in a Github Action. ✅  
Also ... rather than using the default command "CMD" when the container runs we need to learn how to use docker run and pass it different commands to run inside the container like `npm run lint` or `npm run format`. ✅

Think hard about what we want to do:

- Docker build the development image (it contains all the dev dependencies 🙂) ✅
- Docker run the development image (but with npm run lint, format as the commands not npm run dev) ✅
- Pass/fail depending on if the lint, format etc commands pass/fail. ✅

So with docker run we've been doing stuff like `docker run -p 3000:3000 image_name_here`. This is great - because we want to use port forwarding to view the running website and also we want to use the default command at the bottom of the Dockerfile (CMD). ✅

But in our pipeline we don't need to run the website or view it so we don't need port forwarding or npm run dev... ✅  
we want to run a container but we want to use it for a different purpose: to run lint, format etc etc commands. ✅

Maybe something like `docker run --rm image_name_here npm run lint && npm run format` would work 👀 There is nothing stopping you running this command on your machines to try it! ✅

The command above will start the container, run the two commands in the container then when the commands either pass or fail the container will automatically stop (the --rm flag automatically stops it). ✅

So get going 🏃🏼‍♂️ ... edit that workflow until it builds your development image and runs the image (with lint, format etc). ✅  
To test as you go work in the main branch locally, then add/commit/push changes to the workflow yaml file. ✅  
Then make a small change to the feature branch and add/commit/push to the feature branch - this should trigger a new PR build. ✅

### STILL TODO - So now my action works ... it uses Docker to lint, format my code, what next?

Now you should get a red or green tick (or something like that) if the build passes or fails ... but you'll notice the "merge" button at the bottom of the pull request is NOT disabled by default. So even if the action (lint, format etc) fails we are able to merge the pull request. That is not much of a guard rail is it? We need to make it so people cannot merge their pull requests until the action passes ✅

Time to research Github "Rulesets". You can configure a ruleset that says: you are not able to merge a pull request until all build (action) checks pass. You can also add a rule to stop people committing code directly to the main branch.

### Pull Requests are enforced! What next?

Well at this point we actually have a basic CI pipeline completed! Time to celebrate! 🎉

What happens though if we merge the PR into the main branch? Ideally that would trigger an automatic deployment of the main branch so we can see the website on the internet (production!!! 🔥)

To make this easy use Render. Rather than make another Github Action to build and deploy the site let's keep it simple for now by using Render.

Login or sign up for Render (https://render.com/). Once logged in go to the "Dashboard" and at the top right of the page click "New" then select "Web Service".

You should be able to connect your Render account to your Github repo. You want the web service to "watch" for changes on your repos main branch. When changes happen you want Render to pull your latest main branch, then do a docker build (production, not development), then deploy the image (it does this automatically).

If you didn't finish the Docker challenge at the start of the week you might not have a production docker file. Here's our simple "Dockerfile.prod" for building the Next.js app for production use. Just remember if your Dockerfile has a slightly different name you might need to tell Render to look for a file with a different name:

FROM node:18

​

WORKDIR /app

​

COPY package\*.json ./

​

RUN npm install --omit=dev --ignore-scripts

​

COPY . .

​

RUN npm run build

​

EXPOSE 3000

​

CMD ["npm", "start"]

Once you've configured/saved the new Web Service in Render it will automatically pull the main branch and try to build/deploy it 🎉. If the build fails google the errors it gives you. If that succeeds you should be able to see a link to the deployed site. Try to view the site!

If that works you now have a full CI/CD pipeline!!!!! You can integrate and deploy new features in a fully automated way!

## Stretch Objectives

    Improve you CI (PR action) to check more things. There are a lot of things you could check at the PR stage. Do some research into what others do 🙂 (security checks, code complexity checking etc)
    Stop using Render for the CD part. Instead create another Action to handle the build and deployment of the main branch. You could build the production Docker image and push it to something like AWS's Elastic Container Service. This will be quite hard to pull off!

## Presentations

You will have the usual 6 mins to demo at 13:20 on Friday!

    Intro the team.
    Set the context of the challenges that you've faced this week ...your company is facing issues so you've made a proof of concept to be used as a template for all new applications. Build that empathy and make sure you explain the why behind DevOps and automation 😉
    Show a digram of the entire workflow you have automated. All the way from commit on local machine, to pull request, to merged and deployed. Here are some example diagrams:  https://corporate-assets.lucid.co/chart/636fd12c-8356-4adc-a781-434eccbd3b5a.png?v=1707847405047, and https://learn.microsoft.com/en-us/azure/devops/pipelines/architectures/media/azure-devops-ci-cd-architecture.svg?view=azure-devops. These will be more complicated than you need but decent examples.
    Then demo the whole process and show it working live. You could pre-record it or maybe just show part of it if you're worried about having enough time to demo it all.
    Then explain how some of it works, show the code.
    Then talk about next steps.
    Then reflections.
