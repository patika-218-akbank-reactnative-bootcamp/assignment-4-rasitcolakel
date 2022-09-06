[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8367124&assignment_repo_type=AssignmentRepo)


# Assignment 4


## **Introduction**
This project presents a mobile app with the movie db.

## Installing React Navigation
To install React Navigation, run the following command in the terminal:

```bash
npm install @react-navigation/native
```

Installing dependencies for a bare React Native app

```bash
npm install react-native-screens react-native-safe-area-context
```

**React Navigation configuration for Android** 

```java
//MainActivity.java
import android.os.Bundle;


@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```

## Installing React Navigation Stack    

```bash
npm install @react-navigation/stack

npm install react-native-gesture-handler
# it is needed for UIKit 
npm install @react-native-masked-view/masked-view
```
Then import the following in the App.tsx file:

```typescript
import 'react-native-gesture-handler';
```

## Installing Bottom Tab Navigator

```bash
npm install @react-navigation/bottom-tabs
```