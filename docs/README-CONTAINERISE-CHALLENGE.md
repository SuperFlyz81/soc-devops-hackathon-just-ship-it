# mustlovepets

## Containerise Challenge 📦

Thank goodness you're here 😰

We have some serious issues with our applications. After doing some "root cause analysis" we can see that our problems start in development. Some of our team work on Windows machines and some work on Macs - this means we quite frequently get problems were the code we deploy to production servers doesn't work as intended - it's the age old problem of "works on my machine". ✅

Looks like it's time to resolve some tech debt and invest in containerising our applications. ✅

First up - we need to create a "proof of concept" to show we can fully automate the deployment of an application. ✅
Objectives:
These are objectives are sequential, do them one after the other:

1. Create a new Next.js application and containerise the application for "development"

Here's some guidance to get started:

One team member creates a new empty repository and invites the others as collaborators. ✅
Someone clones the empty repo and creates a new Next.js application. ✅
You might want to try using something like: `npx create-next-app@latest ./` ✅
The Next.js installer will ask you some questions, give the following answers: Typescript - no, ESLint - yes, all other questions go with the default. ✅
Now see if you can install and run the application. ✅
Can you see it in the browser on http://localhost:3000? ✅

Now it's time to containerise the app using Docker, install the Docker VSCode Plugin, it will help with the basics. First up you'll need to create a Dockerfile in your application's folder at the top level. Here are a few tips for writing your Dockerfile:

What base image do you need? (maybe node:18) ✅
Have you copied in stuff like package.json and package-lock.json? ✅
Have installed your npm packages? ✅
Have you copied in the rest of your application files? ✅
Have you exposed the right port? ✅
Have you set up a default command to run the application when someone tries to start a running container? ✅

Once you feel you've got a solid Dockerfile and you want to try it - you'll need to run the `docker build` command from the same folder as the Dockerfile. You'll need to figure out the exact command to run.

Remember the docker build command creates an image. Thats all. It won't give you a running container you can see easily.

That being said you should see that the docker build command is successful and if you go to Docker Desktop you should see it in the "Images" with the name you've tagged it with.✅

If all of that has worked then try to "docker run" your container. You might need to think about "port forwarding" 👀✅

You will have succeeded if you can go to http://localhost:3000 and see you application running 🏆🙂✅

Do not move to the next objective until you've discussed what you've done so far. It would be good to have some understanding things like "layers" and "caching".

2. Be able to use `docker run` to start the app. The app should start using the `npm run dev` command. You should be able to edit a file on your computer and see the app refresh and show changes (like you're used to being able to in dev mode).✅

If you've just finished the last objective you now have a running application inside a Docker container.

Because you're using port forwarding you're able to run an the application inside the container on port 3000, then the container is exposing port 3000, then when you run the container you're forwarding your computers port 3000 to the containers port 3000 🤯 ... kind of mind blowing.✅

Now it's time to try something ... what happens if you make a change to component file like`/app/page.js` in VSCode. If you were working without using containers you'd expect that because the app is running using `npm run dev` that it would see the file change and rebuild the application. Does this happen?

> > Do not read any further until you've done some research. Try to work out what has changed? Why does the app not rebuild and show the change?

So, does it seem like maybe `npm run dev` can't see the file changes maybe?
That might explain it ... let's test that theory.

You can use Docker Desktop to `exec` into the container (this just means you get a live terminal in the container so you can have a dig about in that "computer").You can also Google how to `exec` into a container from your terminal if you'd like a harder challenge.

Once you have a terminal in the container, try to to change a file using a command line tool called Nano that lets you edit files directly in the terminal.

In the terminal you can try the following:

Use `pwd` and `ls` to see where you are in the docker containers folder structure.
Use `cd` to move into your applications 'app' folder that contains the Next.js layout file and the home page file (along with other files).
Try to use the terminal text editor "nano" to open the page.js file, you can write something like: `nano page.js`.
If you get an error like: 'bash: nano: command not found', install nano in your container (remember your container is like another computer) by using two commands: `apt-get update`, then `apt-get install -y nano`.
Now if you have the file open in nano, use your arrows to navigate down the file and change some text in the page component. Maybe just change some text like the word "Docs". Usually you just edit the line then type `ctr/command + x` and then `Y` to save changes. If you struggle to use Nano to edit the file have a Google and learn how to use it. If you think you successfully edited the file and saved it open it again in nano and check if the change has persisted.

Now if you have successfully edited the home page component please check the browser. Has the site rebuilt to show your change?

Amazing, we've just proved that `npm run dev` is watching for changes and rebuilding the site. Yay!!! But that still doesn't fix our problem does it? We can't work on our app like this can we?

Maybe it's because all the files get "copied" into the image during the docker build stage. So the files are not "live". They are the files as they were when somebody ran docker build 🤯

We need to make it so that when we run a container the files that will change while we develop the application will be live in the container so that "npm run dev" can see when the files change.

Luckily we have something just for this: "volumes".

No we know about volumes we need to stop and remove the current running container. Learn to use command line to do this (docker ps, stop, remove etc) or use Docker Desktop to do this.

Once you've stopped/removed the container - learn how to use the "volume" flag with the docker run command to run a container with the app folder being "volumed" in.

You will know you've been successful if: the container is running and you can access the site in the browser, then you make a file change to the home page (in VSCode on your machine), then the app rebuilds and shows your change.

3. Create a second Dockerfile for "production" called Dockerfile.prod.

We are going to leave this deliberately quite vague but we will give a few tips:

Do you want to install all the application dependencies for production?
Is there a different command to build and run the application for production use?

Success will mean you can run a container based on your new production image. You should be able to access the app as usual in the browser. You should be able to explain the differences in the Dockerfiles and the resulting images.
