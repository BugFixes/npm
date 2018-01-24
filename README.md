# BugFix.es Node Module

This is the simplest way of using BugFix.es with Node

## Replace console.LOGLEVEL with the BugFix.es version
````javascript
    console.log("message");
    BugFixes.log("message");
````

Or you can do it with the object method
````javascript
    // Pure Object
    new BugFixes({
        message: "message",
        logLevel: bugFixes.LOG
    });

    // Mixed Object
    new BugFixes('message', bugFixes.LOG);
````

## If you have a BugFix.es API
You can either put the key and secret into your environment settings
````
    BUGFIXES_KEY = <key>
    BUGFIXES_SECRET = <secret>
````

Or you can do it in the function call (not recommended)
````javascript
    new BugFixes({
        message: <message>,
        logLevel: <logLevel>,
        key: <key>,
        secret: <secret>
    });
````

# Log Levels
````
    BugFixes.LOG = BugFixes.log() = console.log()
    BugFixes.INFO = BugFixes.info() = console.info();
    BugFixes.ERROR = BugFixes.error() = console.error();
````
