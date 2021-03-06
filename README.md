### A game using Zdog and React Hooks, deployed with Firebase Hosting.

[PLAY HERE](http://hanoi-dog.firebaseapp.com)

## Nice to haves

• Accelerometer-based illo rotation to give a sense of depth https://www.npmjs.com/package/react-accelerometer  
• Proper global state management  
• Replace the alerts for better UX  
• An actual trompo de pastor https://codesandbox.io/s/immutable-wind-e1qgy  
• Randomly generated levels  
• Linear Regression based predictions of the moves a user will make (2n - 1 is the minimum number of moves, n being the size of the Hanoi Tower)

```
npm run build && rm -rf deploy/public/* && mv -rf build/* deploy/public/
```

That command will do 3 things, chained together with the `&&` operator:

1. Create an optimized production build of the front end code. `npm run build`
2. Delete the contents of the public folder inside the Firebase app. `rm -rf deploy/public/*`
3. Move the freshly created react build into the Firebase project `mv -rf build/* deploy/public/`

In a way, it is like preparing a log for your fireplace 🔥.

Or, as we say in spanish:

```
alias leña='npm run build && rm -rf deploy/public/* && cp -rf build/* deploy/public/' 
```