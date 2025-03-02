
# Simple Integration Guide for React + .NET Windows Forms

## Overview

This guide explains the simplest way to embed your React application inside a Windows Forms application using WebView2.

## Step 1: Build Your React App

When you want to update your .NET application with the latest React UI:

```bash
# In your React project folder
npm run build
```

This creates a `dist` folder with all the static files (HTML, CSS, JS).

## Step 2: Copy Files to Your .NET Project

1. Copy all files from the `dist` folder
2. Paste them into your .NET project's `WebResources` folder
3. In Visual Studio, set these files to have "Build Action: Embedded Resource"

![Set to Embedded Resource](https://docs.microsoft.com/en-us/dotnet/core/tutorials/media/publishing-with-visual-studio/embedded-resource.png)

## Step 3: Build and Run

Simply build and run your .NET application. The WebView2 control will automatically:
1. Load your React application from the embedded resources
2. Display it in the Windows Forms window
3. Enable communication between React and .NET

## Updating Your App

When you make changes to your React application:
1. Build the React app again (npm run build)
2. Copy the new files to your .NET project's WebResources folder
3. Build and run your .NET application

No code changes required in C# - just update the embedded resources!

## Troubleshooting

If your React app doesn't appear:
- Check that all files from `dist` were copied to `WebResources`
- Ensure all files have "Build Action: Embedded Resource"
- Make sure WebView2 Runtime is installed on your computer

## Communication between React and .NET

The React app and .NET communicate via messages:
- React sends messages using the InteropService
- .NET receives messages in the WebView_WebMessageReceived method
- .NET sends responses back to React using SendResponseToWebView

This is already set up for you - no need to modify the communication code.
