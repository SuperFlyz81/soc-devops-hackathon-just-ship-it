PLAN 


When you put in a "Pull Request" (PR) from a feature branch into the main branch there should be a Github Action that automatically runs things like linting, formatting, testing and auditing. 

1. write a simple GitHub action that is triggered when pull request is made into main branch
2. log something to the build console - ask ChatGPT for an idea
3. create a folder .github and in folder add another folder called workflows
4. In workflow add a .yml file
5. commit the changes and push into the main branch 

nb. For Ruleset P needs to access settings as owner of repo 

    Navigate to Settings: Navigate to Settings
    Branch Protection Rules: Branch Protection Rules
    Add Rule: Add Rule
    Configure Rule: Configure Rule