#Hanoi tower game using Zdog and React Hooks, deployed into Firebase.

npm run build && rm -rf deploy/public/* && mv -rf build/* deploy/public/

This command will do 3 things:

1. Create an optimized production build of the front end code.
2. Delete the contents of the public folder inside the Firebase app.
3. Move the freshly created react build into Firebase

In a way, it is like preparing a log for your fireplace 🔥.

alias leña='npm run build && rm -rf deploy/public/* && mv -rf build/* deploy/public/' 

