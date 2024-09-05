Docker was just the start ...
Yesterday we got off to a good start - our "proof of concept" application is already proving valuable. Anybody building an application on our new blueprint would be working inside a Docker container.

As you can imagine ... our work is not done.

There are going to be lots of teams all using what we're building now as a blueprint for new apps they build in the future. On a day-to-day basis engineers are pushed to deliver new features as fast as possible. When you're under pressure it's normal to try and skip things like formatting your code nicely or testing - but it hurts our ability to ship new features quickly in the medium to long term. This is called "tech debt".

What we want across all of our applications is a consistent code style, we want to find issues as soon as possible (not in production), and we want to ensure our code is tested so we can add new features or refactor with confidence. Let's help our future colleges by setting some high standards and enforcing those standards in an automated way.
Objectives:
On pre-commit run lint rules (eslint)
On pre-commit run formatting (prettier)
On pre-commit run unit tests (jest and react testing library)
On pre-commit npm audit
Advice:
Take it slow and make a plan! ❤️

Step 1

First up just get someone working ... install Husky and work out how to run linting. Linitng should should already be set up by default in Next.js if you followed the instructions earlier in the week. Have a look in package.json and you'll see an npm script for linting.✅

Ask chatgpt what would make eslint give you a warning or an error. Change the code to give you a warning/error.✅ Then git add the change and try to commit it. Can you see that linting ran? Did it give a warning or did it fully stop the commit? Use git log to see if the commit completed or was stopped.✅

If you want to try and make the linter more strict, change the npm script for linting so even warnings are not allowed!

Step 2

Now it's time to automate some formatting rules!!! This time you won't have anything configured or installed for you. You'll need to install prettier as a dependency and then create an npm script to run it.✅

Once you know that works, add the new npm script for formatting to the pre-commit hook.✅

Work out how
to test if it works, don't assume! ✅

Step 3

Wow, ok ... we've got linting and formatting done!!! Next up let's automate unit tests. ✅

As with formatting you don't have anything configured or installed for you, and actually you don't have any components to test. ✅

We would suggest starting by taking a part of the big default home page component (`/app/page.js`) and turning it into a standalone component. ✅

You will need to create a folder for components like last time - maybe at the top level of the project (`/src/components`). ✅ Then make a folder inside that for your new component. ✅ Pick something super easy like the `h2` element - create a `Title` component. Once you've made the new component import it into the home page component and check it all works as expected. Check and make sure.

To test your new component we would suggest install Jest and React Testing Library. These are the easiest to install and use quickly.

Make the most basic test you can and make sure it passes. Now try to edit the component with the goal of making the test fail. Run the tests again, do they fail? Yay!!!

OK now add the new npm test script to the pre-commit hook. Now check it works - can you commit code that breaks the test or does the test failing at pre-commit stop the commit happening?

If it stops the commit we have lift off!

Step 4

At this point we are just showing off 🏆 ... but let's do it anyway.

If you've not seen it already npm has a command called `audit` that will check all your decencies for dangerous packages that either need updating or removing.

Add npm audit to your pre-commit hook and learn more about npm audit.
