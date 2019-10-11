### Hanoi tower game using Zdog and React Hooks, deployed with Firebase Hosting.

> npm run build && rm -rf deploy/public/* && mv -rf build/* deploy/public/

This command will do 3 things, chained together with the && operator:

1. Create an optimized production build of the front end code. npm run build
2. Delete the contents of the public folder inside the Firebase app. rm -rf deploy/public/*
3. Move the freshly created react build into the Firebase project mv -rf build/* deploy/public/

In a way, it is like preparing a log for your fireplace 🔥.

Or, as we say in spanish:

> alias leña='npm run build && rm -rf deploy/public/* && mv -rf build/* deploy/public/' 
